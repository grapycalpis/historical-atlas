import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,cp,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {root,editions,validate} from '../tools/editions.mjs';

test('Korean war distinguishes intervention, four Seoul changes, POW terms and military armistice',async()=>{
  const {c,events,geo}=(await editions()).find(x=>x.c.id==='korean-war');
  const event=id=>events.find(e=>e.id===id);
  const state=(code,date)=>geo.actors[code].states.find(s=>s.from<=date&&(!s.until||date<s.until));
  assert.equal(c.chapters.length,5);assert(events.length>=28&&events.length<=36);
  assert.equal(c.initial,'d0625a-invasion');assert.equal(c.baseline,c.initial);assert.equal(c.compare,'d0727-armistice');
  assert.equal(events[0].date,'1950-06-25');assert.equal(events.at(-1).date,'1953-07-27');
  assert.equal(events[0].id,'d0625a-invasion');assert.equal(events[1].id,'d0625b-un82');
  assert(event('d0625b-un82').causes.includes('d0625a-invasion'));
  assert(!event('d1001-cross38').causes.includes('d1007-unga'));
  for(const [id,date] of [['d0628-seoul-falls','1950-06-28'],['d0928-seoul-retaken','1950-09-28'],['d1019-china-crosses','1950-10-19'],['d1025-first-offensive','1950-10-25'],['d1121-yalu','1950-11-21'],['d1125-chongchon','1950-11-25'],['d1127-chosin','1950-11-27'],['d1224-hungnam','1950-12-24'],['d0104-seoul-again','1951-01-04'],['d0314-seoul-final','1951-03-14'],['d0710-kaesong','1951-07-10'],['d1025-panmunjom','1951-10-25'],['d0507-koje','1952-05-07'],['d0420-little-switch','1953-04-20'],['d0608-pow-agreement','1953-06-08'],['d0618-rhee-release','1953-06-18']])assert.equal(event(id).date,date);
  assert.match(event('d0314-seoul-final').summary,/14 日夜至 15 日/);
  assert.match(event('d0727-armistice').summary,/22 時/);
  assert.match(event('d0727-armistice').summary,/南韓沒有簽署/);
  assert.match(event('d0727-armistice').debate,/三八線.*戰線.*軍事分界線.*非軍事區.*和平條約/);
  assert.match(event('d0727-armistice').impact,/72 小時/);
  assert.match(event('d0608-pow-agreement').debate,/遣返委員會.*監察委員會/);
  assert.match(event('d0726-no-gun-ri').debate,/分歧/);
  for(let ch=1;ch<=5;ch++)assert.match(events.find(e=>e.chapter===ch).background,/本章核心問題/);
  for(const e of events){assert.match(e.counterfactual,/假設/);assert.match(e.counterfactual,/限制/);}
  assert.match(state('CN','1950-10-19').stance,/越江/);
  assert.match(state('CN','1950-10-25').stance,/交戰/);
  assert.match(state('UN','1952-05-12').stance,/克拉克/);
  assert.match(state('KR','1953-07-27').stance,/未簽署/);
  assert.equal(state('CIV','1950-07-26').showLabel,false);
  for(const actor of Object.values(geo.actors))for(const s of actor.states)assert(s.sources?.length);
  assert.equal(geo.boundaries.length,0);assert(events.every(e=>!e.overlays?.length));
  assert((await readFile(join(root,'site/index.html'),'utf8')).includes('korean-war/index.html'));
});

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

test('Cuban crisis separates intelligence, public commitments, secret bargaining and implementation',async()=>{
  const {c,events,geo}=(await editions()).find(x=>x.c.id==='cuban-missile-crisis');
  const event=id=>events.find(e=>e.id===id);
  assert.equal(c.chapters.length,4);assert(events.length>=18&&events.length<=24);
  assert.equal(events[0].date,'1962-10-14');assert.equal(events.at(-1).date,'1962-11-20');
  for(const [id,date] of [['d14-photo','1962-10-14'],['d15-identify','1962-10-15'],['d16a-president','1962-10-16'],['d22a-excomm','1962-10-22'],['d22b-address','1962-10-22'],['d23-proclamation','1962-10-23'],['d24a-quarantine','1962-10-24'],['d27b-u2-down','1962-10-27'],['d28a-deescalation','1962-10-28']])assert.equal(event(id).date,date);
  assert.equal(c.initial,'d14-photo');assert.equal(c.baseline,'d24a-quarantine');assert.equal(c.compare,'d28a-deescalation');
  assert(event('d15-identify').causes.includes('d14-photo'));
  assert(event('d16a-president').causes.includes('d15-identify'));
  assert(!event('d27b-u2-down').causes.includes('d26b-castro-letter'));
  assert(!event('d27d-public-reply').causes.includes('d27c-secret-channel'));
  assert.match(event('d27c-secret-channel').debate,/刪去/);
  assert.match(event('d26b-castro-letter').debate,/跨夜/);
  assert.match(event('n10-missile-count').debate,/不是聲稱/);
  assert.match(event('n20-quarantine-lifted').impact,/1963年4月/);
  for(const e of events){assert.match(e.primary,/資訊狀態/);assert.match(e.counterfactual,/假設/);assert.match(e.counterfactual,/限制/);}
  const state=(code,date)=>geo.actors[code].states.find(s=>s.from<=date&&(!s.until||date<s.until));
  assert.match(state('US','1962-10-15').stance,/總統尚未獲報/);
  assert.match(state('US','1962-10-24').stance,/隔離生效/);
  assert.match(state('USSR','1962-10-28').stance,/承諾/);
  assert.match(state('CU','1962-10-28').relations,/未同意/);
  assert.equal(geo.boundaries.length,0);assert(events.every(e=>!e.overlays?.length));
  assert((await readFile(join(root,'site/index.html'),'utf8')).includes('cuban-missile-crisis/index.html'));
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
  assert(home.includes('<title>'+config.title+'</title>'));
  if(config.googleSiteVerification)assert(home.includes('name="google-site-verification" content="'+config.googleSiteVerification+'"'));
  const png=await readFile(join(root,'site',config.image));
  assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
});

test('American revolution preserves distinct decisions, recognition, and excluded perspectives',async()=>{
  const {c,events,geo}=(await editions()).find(x=>x.c.id==='american-revolution');
  const event=id=>events.find(e=>e.id===id);
  assert.equal(c.chapters.length,5);assert(events.length>=24&&events.length<=30);
  assert.equal(c.initial,'tea-party');assert.equal(c.baseline,'tea-party');assert.equal(c.compare,'treaty-paris');
  for(const [id,date] of [['tea-party','1773-12-16'],['port-act','1774-03-31'],['first-congress','1774-09-05'],['lexington-concord','1775-04-19'],['dunmore-proclamation','1775-11-07'],['independence-resolution','1776-07-02'],['declaration-adopted','1776-07-04'],['saratoga-surrender','1777-10-17'],['french-alliance','1778-02-06'],['fort-pitt-treaty','1778-09-17'],['yorktown-surrender','1781-10-19'],['preliminary-peace','1782-11-30'],['cessation-proclamation','1783-04-11'],['treaty-paris','1783-09-03']])assert.equal(event(id).date,date);
  assert(event('declaration-adopted').causes.includes('independence-resolution'));
  assert(event('french-alliance').causes.includes('saratoga-surrender'));
  assert(event('yorktown-surrender').causes.includes('chesapeake'));
  assert(!event('articles-adopted').causes.includes('saratoga-surrender'));
  assert.match(event('treaty-paris').impact,/1784 年 1 月 14 日/);
  assert.match(event('dunmore-proclamation').debate,/不解放/);
  assert.match(event('fort-pitt-treaty').impact,/未因此建州/);
  for(let ch=1;ch<=5;ch++)assert.match(events.find(e=>e.chapter===ch).background,/本章核心問題/);
  for(const e of events){assert.match(e.counterfactual,/假設/);assert.match(e.counterfactual,/限制/);}
  const state=(code,date)=>geo.actors[code].states.find(s=>s.from<=date&&(!s.until||date<s.until));
  assert.match(state('AM','1773-12-16').stance,/英屬殖民地/);
  assert.match(state('AM','1776-07-02').relations,/英國未承認/);
  assert.match(state('AM','1783-09-03').stance,/正式和約承認/);
  for(const code of ['LOY','BLACK','DEL','ONE','HAUD'])assert(geo.actors[code].states.length>=3);
  for(const a of Object.values(geo.actors))for(const s of a.states)assert(s.sources?.length);
  assert.equal(geo.boundaries.length,0);assert(events.every(e=>!e.overlays?.length));
  assert((await readFile(join(root,'site/index.html'),'utf8')).includes('american-revolution/index.html'));
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

test('French revolution separates legal change, coercion, colonial freedom and the two-day coup',async()=>{
  const {c,events,geo}=(await editions()).find(x=>x.c.id==='french-revolution');
  const event=id=>events.find(e=>e.id===id);
  const state=(code,date)=>geo.actors[code].states.find(s=>s.from<=date&&(!s.until||date<s.until));
  assert.equal(c.chapters.length,6);assert(events.length>=30&&events.length<=36);
  assert.equal(c.initial,'estates-open');assert.equal(c.baseline,'estates-open');assert.equal(c.compare,'brumaire-19');
  for(const [id,date] of [['estates-open','1789-05-05'],['national-assembly','1789-06-17'],['tennis-oath','1789-06-20'],['october-march','1789-10-05'],['royal-return','1789-10-06'],['varennes-stop','1791-06-21'],['champ-mars','1791-07-17'],['saint-domingue-uprising','1791-08-22'],['constitution-1791','1791-09-03'],['war-austria','1792-04-20'],['tuileries-attack','1792-08-10'],['monarchy-abolished','1792-09-21'],['louis-executed','1793-01-21'],['slavery-abolished','1794-02-04'],['prairial-law','1794-06-10'],['fleurus','1794-06-26'],['thermidor','1794-07-27'],['constitution-1795','1795-08-22'],['directory-begins','1795-11-02'],['fructidor-coup','1797-09-04'],['brumaire-18','1799-11-09'],['brumaire-19','1799-11-10']])assert.equal(event(id).date,date);
  assert(event('royal-return').causes.includes('october-march'));
  assert(event('monarchy-abolished').causes.includes('tuileries-attack'));
  assert(!event('monarchy-abolished').causes.includes('valmy'),'a battle is not an automatically received instruction to abolish the monarchy');
  assert(event('slavery-abolished').causes.includes('saint-domingue-uprising'));
  assert(event('brumaire-19').causes.includes('brumaire-18'));
  assert.match(event('august-decrees').impact,/贖買/);
  assert.match(event('slavery-abolished').impact,/未普遍/);
  assert.match(event('thermidor').summary,/28 日/);
  assert.match(event('brumaire-19').impact,/12 月 13 日/);
  assert.match(state('CROWN','1792-08-10').stance,/停職/);
  assert.match(state('CROWN','1792-09-21').stance,/前國王/);
  assert.match(state('FR','1799-11-09').stance,/瓦解中/);
  assert.match(state('FR','1799-11-10').stance,/臨時執政/);
  assert.match(state('SD','1799-11-10').relations,/尚非獨立/);
  assert.match(state('PR','1795-04-05').relations,/批准/);
  for(let ch=1;ch<=6;ch++)assert.match(events.find(e=>e.chapter===ch).background,/本章核心問題/);
  for(const e of events){assert.match(e.counterfactual,/假設/);assert.match(e.counterfactual,/限制/);}
  for(const a of Object.values(geo.actors))for(const s of a.states)assert(s.sources?.length);
  assert.equal(geo.boundaries.length,0);assert(events.every(e=>!e.overlays?.length));
  assert((await readFile(join(root,'site/index.html'),'utf8')).includes('french-revolution/index.html'));
});
