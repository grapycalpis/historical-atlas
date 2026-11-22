import assert from 'node:assert/strict';
globalThis.window={};
await import('./geo.js');
const atlas=window.ATLAS_GEO, dates=Object.keys(atlas).sort();
function inside([x,y],ring) {
  let hit=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++) {
    const [ax,ay]=ring[i],[bx,by]=ring[j];
    if((ay>y)!==(by>y) && x<(bx-ax)*(y-ay)/(by-ay)+ax) hit=!hit;
  }
  return hit;
}
function namesAt(date,point) {
  const snapshot=atlas[dates.filter(d=>d<=date).at(-1)];
  return snapshot.features.filter(({geometry})=>geometry.coordinates.some(
    ([outer,...holes])=>inside(point,outer)&&!holes.some(h=>inside(point,h))
  )).map(f=>f.properties.name);
}
const cases=[
  ['1871-01-18',[7.75,48.58],'France'],['1871-05-10',[7.75,48.58],'Germany'],
  ['1871-05-10',[6.86,47.64],'France'],['1900-01-01',[18.41,43.86],'Bosnia'],
  ['1914-06-28',[18.41,43.86],'Austria-Hungary'],['1914-06-28',[20.46,44.81],'Serbia'],
  ['1914-08-04',[4.35,50.85],'Belgium'],['1914-06-28',[21.01,52.23],'Russia'],
  ['1914-06-28',[24.94,60.17],'Russia'],['1914-06-28',[18.65,54.35],'Germany'],
  ['1918-11-11',[24.94,60.17],'Finland'],['1919-06-28',[7.75,48.58],'France'],
  ['1919-06-28',[21.01,52.23],'Poland'],['1919-06-28',[18.41,43.86],'Yugoslavia'],
  ['1919-06-28',[18.65,54.35],'Danzig']
];
for(const [date,point,name] of cases) assert.deepEqual(namesAt(date,point),[name],date+' '+point);
const features=new Set(Object.values(atlas).flatMap(s=>s.features));
for(const f of features) {
  assert.equal(f.geometry.type,'MultiPolygon');
  for(const polygon of f.geometry.coordinates) for(const ring of polygon) {
    assert.ok(ring.length>=4,f.properties.name);
    assert.deepEqual(ring[0],ring.at(-1));
    for(const [lon,lat] of ring) assert.ok(Math.abs(lon)<=180 && Math.abs(lat)<=90);
  }
}
console.log(cases.length+' geographic checkpoints, '+features.size+' historical features, '+dates.length+' change dates');
