import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,cp,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {root,editions,validate} from '../tools/editions.mjs';

test('published editions have independent maps and chronological sources',async()=>{
  const packs=await editions(),war=packs.find(x=>x.c.id==='world-war-i'),demo=packs.find(x=>x.c.id==='german-reunification');
  assert.ok(war.events.length>=79);assert.ok(war.events.filter(e=>e.chapter===2).length>=22);
  assert(demo.events.length>=3);assert.equal(demo.c.mapEngine,'standard');
  const page=await readFile(join(root,'site',demo.c.id,'index.html'),'utf8');
  assert(page.includes('../app/map.js'));assert(!page.includes('1914'));assert(!page.includes('editorial.js'));
  assert.throws(()=>validate(demo.c,[{...demo.events[0],causes:['future']}],demo.geo),/precede/);
});
test('scaffold, validate and build a third era without touching the reader',async()=>{
  const work=await mkdtemp(join(tmpdir(),'atlas-test-'));
  try{
    for(const dir of ['app','templates','tools'])await cp(join(root,dir),join(work,dir),{recursive:true});
    await cp(join(root,'eras','german-reunification'),join(work,'eras','german-reunification'),{recursive:true});
    const run=(script,...args)=>execFileSync(process.execPath,[join(work,'tools',script),...args],{stdio:'pipe'});
    run('new-era.mjs','test-period','測試時期');run('build.mjs');
    const entry=join(work,'site','test-period','index.html');
    assert.match(await readFile(entry,'utf8'),/教材草稿/);
    assert.throws(()=>run('new-era.mjs','test-period','覆寫測試'));assert.throws(()=>run('new-era.mjs','../bad','測試'));
    await access(join(work,'eras/test-period/events.json'));
  }finally{await rm(work,{recursive:true,force:true});}
});
