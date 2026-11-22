// Historical boundaries: CC BY-NC-SA 4.0. See GIS.md for attribution and date rules.
import { readFileSync, writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

const aliases = {
  'Germany (Prussia)': 'Germany', 'Russia (Soviet Union)': 'Russia',
  'Turkey (Ottoman Empire)': 'Ottoman Empire', 'Italy/Sardinia': 'Italy',
  'Rumania': 'Romania', 'Iran (Persia)': 'Persia', 'United States of America': 'United States'
};
const normalize = name => aliases[name] || name;
const dayAfter = date => new Date(Date.parse(date + 'T00:00:00Z') + 86400000).toISOString().slice(0,10);

// A closed ring is split into two chains before Douglas–Peucker simplification.
// Keep every small island and enclave as a ring, even when it is under tolerance.
function simplifyRing(points) {
  if (points.length < 5) return points.map(round);
  const insideEurope = points.some(([x,y]) => x >= -16 && x <= 50 && y >= 34 && y <= 70);
  const tolerance = insideEurope ? 0.016 : 0.075;
  let pivot = 1, farthest = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const sq = (points[i][0]-points[0][0])**2 + (points[i][1]-points[0][1])**2;
    if (sq > farthest) { farthest=sq; pivot=i; }
  }
  const kept = new Set([0,pivot,points.length-1]);
  const segments = [[0,pivot],[pivot,points.length-1]];
  while (segments.length) {
    const [start,end] = segments.pop(), [x,y]=points[start];
    const dx=points[end][0]-x, dy=points[end][1]-y, sq=dx*dx+dy*dy;
    let split=-1, max=tolerance*tolerance;
    for (let i=start+1;i<end;i++) {
      const xx=points[i][0]-x, yy=points[i][1]-y;
      const t=sq?Math.max(0,Math.min(1,(xx*dx+yy*dy)/sq)):0;
      const d=(xx-t*dx)**2+(yy-t*dy)**2;
      if(d>max) { split=i; max=d; }
    }
    if(split>=0) { kept.add(split); segments.push([start,split],[split,end]); }
  }
  const ring=kept.size>=4?[...kept].sort((a,b)=>a-b).map(i=>points[i]):points;
  return ring.map(round);
}
function round(p) { return p.map(n=>Math.round(n*10000)/10000); }
function simplify(g) {
  const p=g.type==='Polygon'?[g.coordinates]:g.coordinates;
  return {type:'MultiPolygon',coordinates:p.map(poly=>poly.map(simplifyRing))};
}

export function prepare(early, late, land) {
  const records = [], names = new Map(late.map(f=>[f.properties.cshapes_gwcode,normalize(f.properties.cshapes_name)]));
  const add=(f,first,last,properties)=>{
    records.push([first,last,{type:'Feature',properties,geometry:simplify(f.geometry)}]);
  };
  for(const f of early.features) {
    const p=f.properties, name=normalize(p.NAME);
    if(p.from>1885 || p.to<1871) continue;
    const owner=({Malta:'United Kingdom',Iceland:'Denmark'})[name] || null;
    const status=owner?'dependency':name==='Bulgaria'?'autonomous':'political-unit';
    add(f,Math.max(1871,p.from)+'-01-01',Math.min(1885,p.to)+'-12-31',
      {name,sourceName:p.NAME,status,owner,source:'CShapes-Europe',precision:'year'});
  }
  // CShapes 2.0 does not code these microstates; retain their source annual record.
  for(const f of early.features) {
    const p=f.properties;
    if(!['Monaco','Liechtenstein','Andorra','San Marino','Danzig'].includes(p.NAME)) continue;
    if(p.to<1886 || p.from>1919) continue;
    const first=p.NAME==='Danzig'?'1919-06-28':Math.max(1886,p.from)+'-01-01';
    add(f,first,Math.min(1919,p.to)+'-12-31',{name:p.NAME,sourceName:p.NAME,status:p.NAME==='Danzig'?'treaty-territory':'political-unit',owner:null,source:'CShapes-Europe',precision:'year'});
  }
  for(const f of late) {
    const p=f.properties,name=normalize(p.cshapes_name);
    let status=p.cshapes_status, owner=status==='independent'?null:(names.get(p.cshapes_owner)||null);
    if(status==='occupied'&&['Serbia','Montenegro'].includes(name)) {
      // The source assigns one occupier and overly early dates. Keep the legal outline
      // but leave control to the event layer; no single state controlled all of Serbia.
      status='wartime-control-unmapped'; owner=null;
    }
    add(f,p.cshapes_first_day,p.cshapes_last_day,{name,sourceName:p.cshapes_name,status,owner,
      gwcode:p.cshapes_gwcode,source:'CShapes 2.0',precision:'dataset-date',
      bordersDefined:p.cshapes_borders_defined});
  }
  const meta={source:'ETH Zürich · CShapes-Europe / CShapes 2.0',url:'https://icr.ethz.ch/data/cshapes/',
    license:'CC BY-NC-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    note:'1871–1885 為年度截面；1886 起依研究資料有效期切換。1919 按簽約日編碼，實施與實際控制可能較晚。海外選繪；無政治面處僅作陸地位置參考。'};
  const landCollection={type:'FeatureCollection',features:land.features.map(f=>({type:'Feature',properties:{},geometry:simplify(f.geometry)}))};
  return {records,meta,landCollection};
}

export function addEditorialLayers(data,early,clip) {
  const {records}=data;
  const annual=(name,year)=>{
    const feature=early.features.find(f=>f.properties.NAME===name && f.properties.from<=year && f.properties.to>=year);
    return feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;
  };
  const multi=coordinates=>({type:'MultiPolygon',coordinates});
  const region=(name,shape)=>({type:'Feature',properties:{name},geometry:simplify(multi(shape))});
  const alsace=clip.intersection(annual('France',1870),annual('Germany',1871));
  const bosnia=records.filter(r=>['Bosnia','Herzegovina'].includes(r[2].properties.name)).map(r=>r[2].geometry.coordinates);
  data.territories={alsace:region('Alsace-Lorraine',alsace),bosnia:region('Bosnia and Herzegovina',clip.union(...bosnia))};
  // Reuse the actual old Franco-German border until the definitive peace is signed.
  for(const name of ['France','Germany']) {
    const base=records.find(r=>r[0]==='1871-01-01' && r[2].properties.name===name);
    const earlier=name==='France'?clip.union(annual(name,1871),alsace):clip.difference(annual(name,1871),alsace);
    records.push(['1871-01-01','1871-05-09',{...base[2],geometry:simplify(multi(earlier))}]);
    base[0]='1871-05-10';
  }
  // CShapes has one transitional Hungary shape for November 1918, combining areas
  // whose political authorities had separated. Its known outline is kept, but it
  // is identified as a provisional dataset grouping rather than a sovereign claim.
  const provisional=records.find(r=>r[0]==='1918-11-03'&&r[2].properties.name==='Hungary');
  if(provisional) Object.assign(provisional[2].properties,{name:'Hungary and disputed successor territories',status:'transitional'});
  return data;
}

export function serialize({records,meta,landCollection,territories={}}) {
  return '/* CShapes historical data: Schvitz et al. (2022); Cederman et al. (2025). CC BY-NC-SA 4.0. See source/GIS.md. Physical land: Natural Earth, public domain. */\n' +
    '(() => {\nconst records=' + JSON.stringify(records) + ';\n' +
    'window.ATLAS_GEO_META='+JSON.stringify(meta)+';\nwindow.ATLAS_LAND='+JSON.stringify(landCollection)+';\nwindow.ATLAS_TERRITORIES='+JSON.stringify(territories)+';\n' +
    'const changes=new Set();\nfor (const [start,end] of records) { changes.add(start); if(end<"1919-12-31") changes.add(('+dayAfter.toString()+')(end)); }\n' +
    'window.ATLAS_GEO={}; for(const date of [...changes].sort()) { if(date<"1871"||date>="1920") continue; window.ATLAS_GEO[date]={type:"FeatureCollection",features:records.filter(([a,b])=>a<=date && date<=b).map(r=>r[2])}; }\n})();\n';
}

// Run: node geography.mjs EARLY.geojson.gz LATE_FEATURES.json LAND.geojson OUTPUT.js
if(process.argv[1] && pathToFileURL(process.argv[1]).href===import.meta.url) {
  const [earlyPath,latePath,landPath,out]=process.argv.slice(2);
  const unpack=p=>JSON.parse(p.endsWith('.gz')?gunzipSync(readFileSync(p)):readFileSync(p,'utf8'));
  const {default:clip}=await import('polygon-clipping');
  const initial=unpack(earlyPath);
  writeFileSync(out,serialize(addEditorialLayers(prepare(initial,unpack(latePath),unpack(landPath)),initial,clip)));
}
