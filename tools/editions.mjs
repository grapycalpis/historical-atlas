import '../app/atlas-core.js';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
export const root=fileURLToPath(new URL('../',import.meta.url));
export const json=async p=>JSON.parse(await readFile(p,'utf8'));
export const slugOK=s=>typeof s==='string'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const fields=['id','date','title','place','summary','background','trigger','motives','impact','mapNote','debate','primary','counterfactual'];
const types=new Set(['politics','territory','support','alliance','mobilize','ultimatum','declare','attack','battle','front','tension','peace']);
const point=p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90;
function dateOK(d){
  if(typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d))return false;
  const iso=new Date(d+'T00:00:00Z');
  return !Number.isNaN(iso.valueOf())&&iso.toISOString().slice(0,10)===d;
}
export function validate(c,events,geo){
  assert(slugOK(c.id),'invalid edition id');
  for(const k of ['title','description','region','reset','years','subject','subtitle'])assert(typeof c[k]==='string'&&c[k].trim(),c.id+' '+k);
  assert(Array.isArray(c.chapters)&&c.chapters.length&&c.chapters.every(x=>x.length===3&&x.every(v=>typeof v==='string')),c.id+' chapters');
  assert(['standard','custom'].includes(c.mapEngine),c.id+' renderer');
  const [west,south,east,north]=c.bounds;
  assert(point([west,south])&&point([east,north])&&west!==east&&globalThis.ATLAS_CORE.extent(c.bounds).width>0&&south<north,c.id+' bounds');
  if(c.mapEngine==='standard'){
    assert(geo?.actors&&Array.isArray(geo.boundaries),'geography.json');
    for(const [code,a] of Object.entries(geo.actors)){
      assert(c.names[code]&&point(a.point)&&Array.isArray(a.states),code+' actor');
      let prev=null;
      for(const s of a.states){
        assert(dateOK(s.from)&&(!s.until||dateOK(s.until)&&s.from<s.until)&&(!prev||prev.until&&prev.until<=s.from)&&s.stance&&s.relations,code+' state intervals'); prev=s;
      }
    }
    let prev=null;
    for(const b of geo.boundaries){
      assert(dateOK(b.from)&&(!prev||prev<b.from)&&(!b.until||dateOK(b.until)&&b.from<b.until)&&b.source&&Array.isArray(b.features),'boundary dates and source');prev=b.from;
      for(const f of b.features){
        assert(f.type==='Feature'&&f.properties?.code&&['Polygon','MultiPolygon'].includes(f.geometry?.type),'historical feature');
        const polygons=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
        for(const p of polygons)for(const ring of p)assert(ring.length>=4&&ring.every(point)&&ring[0][0]===ring.at(-1)[0]&&ring[0][1]===ring.at(-1)[1],'closed WGS84 ring');
      }
    }
  }
  if(c.theaters){
    for(const [id,t] of Object.entries(c.theaters)){
      assert(slugOK(id)&&t.label&&t.bounds?.length===4,c.id+' theater');
      const [w,s,e,n]=t.bounds;assert(point([w,s])&&point([e,n])&&w!==e&&globalThis.ATLAS_CORE.extent(t.bounds).width>0&&s<n,c.id+' theater bounds');
    }
  }
  if(!events.length){assert.equal(c.status,'draft',c.id+' missing events');return;}
  const seen=new Set(),used=new Set();let lastDate='';
  for(const e of events){
    const at=c.id+'/'+e.id;
    for(const k of fields)assert(typeof e[k]==='string'&&e[k].trim(),at+' '+k);
    assert(slugOK(e.id)&&!seen.has(e.id)&&dateOK(e.date)&&e.date>=lastDate,at+' date or id');
    assert(Number.isInteger(e.chapter)&&e.chapter>0&&e.chapter<=c.chapters.length&&types.has(e.type)&&point(e.point),at+' chapter/type/point');
    assert(Array.isArray(e.actors)&&e.actors.every(a=>c.names[a]),at+' actors');
    if(c.theaters)assert(e.theaters?.length&&e.theaters.every(t=>c.theaters[t]),at+' theaters');
    if(e.causalLinks){
      assert(e.causalLinks.length===e.causes.length&&new Set(e.causalLinks.map(l=>l.event)).size===e.causes.length,at+' causal completeness');
      for(const l of e.causalLinks)assert(e.causes.includes(l.event)&&['direct','enabling','context','consequence'].includes(l.kind)&&l.explanation&&l.sources?.length&&l.sources.every(u=>e.sources.some(s=>s[1]===u)),at+' causal evidence');
    }
    assert(Array.isArray(e.edges)&&e.edges.every(([a,b,t])=>e.actors.includes(a)&&e.actors.includes(b)&&types.has(t)),at+' edges');
    assert(Array.isArray(e.causes)&&e.causes.every(id=>seen.has(id)),at+' causes must precede event');
    assert(e.sources?.length&&e.sources.every(([t,u])=>t&&/^https?:$/.test(new URL(u).protocol)),at+' sources');
    for(const line of e.overlays||[])assert(types.has(line.type)&&line.label&&line.points?.length>=2&&line.points.every(point)&&line.source,at+' sourced overlay');
    if(c.theaters)for(const line of e.overlays||[])assert(dateOK(line.from)&&dateOK(line.until)&&line.from<=e.date&&e.date<line.until&&line.precision&&line.license&&e.sources.some(s=>s[1]===line.source),at+' overlay validity');
    seen.add(e.id);used.add(e.chapter);lastDate=e.date;
  }
  for(const k of ['initial','baseline','compare'])assert(!c[k]||seen.has(c[k]),c.id+' '+k);
  for(const task of c.comparisonTasks||[])assert(seen.has(task.a)&&seen.has(task.b)&&task.title&&task.prompt,c.id+' comparison task');
  assert(used.size===c.chapters.length,c.id+' empty chapter');
}
export async function editions(){
  const folders=await readdir(join(root,'eras'),{withFileTypes:true});
  const out=[];
  for(const f of folders.filter(f=>f.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name))){
    const dir=join(root,'eras',f.name),c=await json(join(dir,'edition.json'));
    assert(c.id===f.name&&slugOK(c.id),'folder and id mismatch');
    const events=[];
    for(const fn of c.eventFiles){
      assert(/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*\.json$/.test(fn),'relative JSON path required');
      events.push(...await json(join(dir,fn)));
    }
    events.sort((a,b)=>globalThis.ATLAS_CORE.compareEvents(a,b));
    const geo=c.mapEngine==='standard'?await json(join(dir,'geography.json')):null;
    validate(c,events,geo);out.push({c,events,geo,dir});
  }
  return out.sort((a,b)=>(b.c.featured===true)-(a.c.featured===true)||a.c.title.localeCompare(b.c.title,'zh-Hant'));
}
