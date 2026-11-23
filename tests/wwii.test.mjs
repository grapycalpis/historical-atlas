import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {editions,root,validate} from '../tools/editions.mjs';
const {compareEvents,filterEvents,longitudeNear,unwrapPoints,unwrapRing,extent}=globalThis.ATLAS_CORE;

test('global chronology interleaves chapters and keeps deterministic same-day order',()=>{
  const data=[{id:'z',chapter:1,date:'1944-06-15'},{id:'b',chapter:2,date:'1941-12-08'},{id:'a',chapter:3,date:'1941-12-08'},{id:'q',chapter:4,date:'1939-09-01'}];
  assert.deepEqual(data.sort(compareEvents).map(e=>e.id),['q','a','b','z']);
});
test('theater filtering preserves global order and includes multi-theater events once',()=>{
  const data=[{id:'one',theaters:['china']},{id:'two',theaters:['pacific','china']},{id:'three',theaters:['pacific']}];
  assert.deepEqual(filterEvents(data,'pacific').map(e=>e.id),['two','three']);
  assert.equal(filterEvents(data,'all'),data);assert.deepEqual(filterEvents(data,'north'),[]);
});
test('Pacific bounds and paths wrap across the date line without long-way segments',()=>{
  const area=extent([110,-48,-120,56]);assert.equal(area.width,130);assert.deepEqual(area.center,[175,4]);
  assert.equal(extent([-180,-65,180,85]).width,360);
  const route=[[-157.95,21.36],[162.3,11.35],[145.75,15.18]];
  const line=unwrapPoints(route,175);assert(Math.abs(line[0][0]-202.05)<1e-9);
  assert(Math.abs(line[1][0]-line[0][0])<40);assert(Math.abs(line[2][0]-line[1][0])<17);
  assert.deepEqual(unwrapPoints([[179,0],[-179,0],[178,1]],0),[[179,0],[181,0],[178,1]]);
  assert.deepEqual(unwrapPoints([[-179,0],[179,0],[-178,1]],0),[[-179,0],[-181,0],[-178,1]]);
  assert.equal(longitudeNear(-180,180),180);assert.equal(longitudeNear(180,-180),-180);
  for(const center of [-540,-180,0,175,540])for(const [x] of route)assert(Math.abs(longitudeNear(x,center)-center)<=180);
  const polar=unwrapRing([[0,-70],[90,-75],[180,-80],[180,-90],[-180,-90],[-180,-80],[-90,-75],[0,-70]],0);
  assert.deepEqual(polar[0],polar.at(-1));assert.equal(polar[4][0]-polar[3][0],-360);
  const ring=unwrapPoints([[170,10],[-170,10],[-170,20],[170,20],[170,10]],175);
  assert.deepEqual(ring[0],ring.at(-1));assert.equal(Math.max(...ring.map(p=>p[0]))-Math.min(...ring.map(p=>p[0])),20);
});
test('WWII chronology, causal evidence, identity changes and sourced route remain coherent',async()=>{
  const {c,events,geo}= (await editions()).find(x=>x.c.id==='world-war-ii');
  const e=id=>events.find(e=>e.id===id),state=(code,date)=>geo.actors[code].states.find(s=>s.from<=date&&(!s.until||date<s.until));
  assert.equal(c.chapters.length,10);assert.equal(events.length,139);
  assert.equal(events[0].date,'1931-09-18');assert.equal(events.at(-1).date,'1945-09-16');
  assert.equal(c.initial,'poland');assert.equal(c.baseline,'poland');assert.equal(c.compare,'japan-formal-surrender');
  for(const [id,date] of [['sexual-slavery','1938-03-04'],['munich','1938-09-30'],['pearl-harbor','1941-12-07'],['malaya','1941-12-08'],['italy-armistice-signed','1943-09-03'],['italy-armistice-announced','1943-09-08'],['bengal-famine-report','1943-08-28'],['reims-surrender','1945-05-07'],['ve-day','1945-05-08'],['soviet-war-declaration','1945-08-08'],['aug09a-soviet-offensive','1945-08-09'],['aug09b-nagasaki','1945-08-09'],['japan-final-decision','1945-08-14'],['japan-broadcast','1945-08-15'],['japan-formal-surrender','1945-09-02'],['china-surrender','1945-09-09']])assert.equal(e(id).date,date);
  assert(events.indexOf(e('aug09a-soviet-offensive'))<events.indexOf(e('aug09b-nagasaki')));
  assert(!e('malaya').causes.includes('pearl-harbor'));
  assert(!e('aug09a-soviet-offensive').causes.includes('aug09b-nagasaki'));
  assert.match(e('yalta').debate,/六個月.*二或三個月/);
  assert.match(e('hiroshima').debate,/1945 年底.*正負/);
  assert.match(e('japan-final-decision').debate,/分歧/);
  for(const event of events){
    assert.equal(event.causes.length,event.causalLinks.length);
    for(const l of event.causalLinks){assert(l.explanation.length>=12);assert(l.sources.every(u=>event.sources.some(s=>s[1]===u)));}
    assert.match(event.counterfactual,/假設.*限制/);
    assert(event.theaters.length&&event.theaters.every(t=>c.theaters[t]));
  }
  for(const t of Object.keys(c.theaters))assert(events.some(e=>e.theaters.includes(t)),t);
  assert.match(state('IT','1943-07-25').stance,/巴多格里奧/);
  assert.match(state('IT','1943-10-13').stance,/共同交戰國/);
  assert.match(state('CN','1940-03-30').stance,/重慶/);
  assert.match(state('WANG','1940-03-30').stance,/合作政權/);
  assert.match(state('FR','1944-08-25').name,/共和臨時政府/);
  assert.match(state('IT','1943-10-13').name,/共同交戰國/);
  assert(!state('PH','1931-09-18').stance.includes('自治邦'));
  assert(!state('VN','1931-09-18').name.includes('越盟'));
  assert.match(state('VN','1945-09-02').name,/民主共和國/);
  assert.match(state('SU','1941-06-22').relations,/日本仍未交戰/);
  assert.match(state('JP','1945-08-15').stance,/宣布/);
  assert.match(state('JP','1945-09-02').stance,/正式簽署/);
  for(const actor of Object.values(geo.actors))for(const s of actor.states)assert(s.sources?.length);
  assert.equal(geo.boundaries.length,0);
  assert.equal(events.flatMap(e=>e.overlays||[]).length,1);
  const route=e('saipan').overlays[0];assert(route.from<=e('saipan').date&&route.until>e('saipan').date);assert(route.license&&route.precision);
  const bad={...e('saipan'),overlays:[{...route,until:'1944-06-15'}]};
  assert.throws(()=>validate(c,events.map(e=>e.id===bad.id?bad:e),geo),/overlay validity/);
  assert.throws(()=>validate({...c,bounds:[180,-65,-180,85]},events,geo),/bounds/);
  assert.throws(()=>validate({...c,comparisonTasks:[{...c.comparisonTasks[0],b:'missing'}]},events,geo),/comparison task/);
  const refs=JSON.parse(await readFile(join(root,'eras/world-war-ii/sources.json'),'utf8'));
  for(const event of events)for(const [,url] of event.sources)assert(refs[url]?.events.includes(event.id),'reverse source index: '+event.id);
  assert((await readFile(join(root,'site/index.html'),'utf8')).includes('world-war-ii/index.html'));
});
