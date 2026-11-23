/* Shared chronological and WGS84 helpers; also exercised without a browser. */
(function(root){
  'use strict';
  const compareEvents=(a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id);
  const filterEvents=(events,theater)=>theater==='all'?events:events.filter(e=>e.theaters?.includes(theater));
  const longitudeNear=(longitude,center)=>center+((longitude-center+180)%360+360)%360-180;
  function unwrapPoints(points,center){
    let previous=center;
    return points.map(([x,y])=>{previous=longitudeNear(x,previous);return [previous,y];});
  }
  // Pole-closing edges are intentional 360-degree edges in Natural Earth rings.
  // Collapsing them to zero would close Antarctica across its coastline.
  function unwrapRing(points,center){
    let previous=center;
    return points.map(([x,y],i)=>{
      const prior=points[i-1];
      previous=prior&&Math.abs(y)===90&&Math.abs(prior[1])===90&&Math.abs(x-prior[0])>=359
        ?previous+x-prior[0]:longitudeNear(x,previous);
      return [previous,y];
    });
  }
  function extent(bounds){
    const [west,south,east,north]=bounds;
    const width=east>west?east-west:east+360-west;
    return {west,south,east:west+width,north,width,center:[west+width/2,(south+north)/2]};
  }
  root.ATLAS_CORE={compareEvents,filterEvents,longitudeNear,unwrapPoints,unwrapRing,extent};
})(typeof window==='undefined'?globalThis:window);
