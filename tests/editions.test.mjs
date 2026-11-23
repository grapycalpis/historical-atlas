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
  assert(demo.events.length>=18&&demo.events.length<=24);assert.equal(demo.c.chapters.length,4);assert.equal(demo.c.mapEngine,'standard');
  const page=await readFile(join(root,'site',demo.c.id,'index.html'),'utf8');
  assert(page.includes('../app/map.js'));assert(!page.includes('1914'));assert(!page.includes('editorial.js'));
  assert.throws(()=>validate(demo.c,[{...demo.events[0],causes:['future']}],demo.geo),/precede/);
});

test('German chronology distinguishes announcements, signatures, implementation and accession',async()=>{
  const {c,events,geo}= (await editions()).find(x=>x.c.id==='german-reunification');
  const event=id=>events.find(e=>e.id===id);
  assert.equal(c.initial,'wall-open');assert.equal(c.baseline,'wall-open');assert.equal(c.compare,'unity');
  assert.equal(event('travel-announcement').date,event('wall-open').date);
  assert(events.indexOf(event('travel-announcement'))<events.indexOf(event('wall-open')));
  assert(event('wall-open').causes.includes('travel-announcement'));
  for(const [id,date] of [['hungary-open','1989-09-11'],['free-election','1990-03-18'],['monetary-treaty','1990-05-18'],['monetary-union','1990-07-01'],['unification-treaty','1990-08-31'],['two-plus-four','1990-09-12'],['four-power-declaration','1990-10-01'],['unity','1990-10-03']])assert.equal(event(id).date,date);
  assert.match(event('unification-treaty').impact,/9 月 29 日/);
  assert.match(event('two-plus-four').impact,/1991-03-15/);
  assert(event('unity').causes.includes('unification-treaty'));
  assert(event('unity').causes.includes('four-power-declaration'));
  for(const e of events){assert.match(e.counterfactual,/假設/);assert.match(e.counterfactual,/限制/);}
  const state=date=>geo.actors.GDR.states.find(s=>s.from<=date&&(!s.until||date<s.until));
  assert.match(state('1989-11-09').stance,/克倫茨/);
  assert.match(state('1990-04-12').stance,/民選/);
  assert.equal(state('1990-10-03').showLabel,false);
  assert.equal(geo.boundaries.length,0);
  assert(events.every(e=>!e.overlays?.length));
});

test('search and social metadata point to published canonical pages and a real PNG',async()=>{
  const config=JSON.parse(await readFile(join(root,'app/site.json'),'utf8'));
  const packs=await editions();
  const sitemap=await readFile(join(root,'site/sitemap.xml'),'utf8');
  const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  const paths=['',...packs.filter(p=>p.events.length&&p.c.status!=='draft').map(p=>p.c.id+'/')];
  assert.deepEqual(urls,paths.map(p=>new URL(p,config.url).href));
  assert.equal(new Set(urls).size,urls.length);
  for(const path of paths){
    const html=await readFile(join(root,'site',path,'index.html'),'utf8');
    const canonical=html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
    assert.equal(canonical,new URL(path,config.url).href);
    assert(!canonical.includes('index.html')&&!canonical.includes('#'));
    assert.equal(html.match(/property="og:url" content="([^"]+)"/)?.[1],canonical);
    assert.equal(html.match(/property="og:image" content="([^"]+)"/)?.[1],new URL(config.image,config.url).href);
    assert.match(html,/<meta name="description" content="[^"]+">/);
    assert.match(html,/<meta name="twitter:card" content="summary_large_image">/);
    assert(!html.includes('{{')&&!html.includes('noindex'));
  }
  const home=await readFile(join(root,'site/index.html'),'utf8');
  assert.match(home,/<title>時序地圖集｜第一次世界大戰、德國統一互動歷史地圖<\/title>/);
  if(config.googleSiteVerification)assert(home.includes('name="google-site-verification" content="'+config.googleSiteVerification+'"'));
  const png=await readFile(join(root,'site',config.image));
  assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
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
    assert.match(await readFile(entry,'utf8'),/name="robots" content="noindex, follow"/);
    assert(!(await readFile(join(work,'site/sitemap.xml'),'utf8')).includes('/test-period/'));
    assert.throws(()=>run('new-era.mjs','test-period','覆寫測試'));assert.throws(()=>run('new-era.mjs','../bad','測試'));
    await access(join(work,'eras/test-period/events.json'));
  }finally{await rm(work,{recursive:true,force:true});}
});
