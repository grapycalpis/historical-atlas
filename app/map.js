// Default map for content packs. The optional custom renderer uses the same three functions.
(() => {
  'use strict';
  const edition = window.ATLAS_CONFIG;
  const geo = window.ATLAS_GEOGRAPHY;
  const events = window.ATLAS_EVENTS;
  const hosts = new WeakMap();
  const svgNS = 'http://www.w3.org/2000/svg';
  const colors = {support:'#316f68',tension:'#995644',alliance:'#507267',declare:'#aa4435',attack:'#ae4c3b',territory:'#977238',peace:'#486e62',politics:'#6b7160',mobilize:'#785889',ultimatum:'#a56c31',battle:'#984738',front:'#8f554a'};
  let number=0;

  function append(parent, tag, attrs, label) {
    const node=document.createElementNS(svgNS,tag);
    for(const [k,v] of Object.entries(attrs))node.setAttribute(k,v);
    if(label!==undefined)node.textContent=label;
    parent.append(node);
    return node;
  }
  function activate(node,handler){
    node.setAttribute('tabindex','0');node.setAttribute('role','button');
    node.addEventListener('click',handler);
    node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handler();}});
  }
  function resolveState(code,date){
    return geo.actors[code]?.states?.filter(s=>s.from<=date&&(!s.until||date<s.until)).at(-1);
  }
  window.atlasCountry=(code,date,fallback)=>{
    const state=resolveState(code,date);
    return {name:edition.names[code]||fallback||code,stance:state?.stance||'本期尚無此日立場記錄',relations:state?.relations||'可由當日事件查閱可確認的外交或政治關係。'};
  };
  function pathFor(geometry,project){
    const polygons=geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates;
    return polygons.map(polygon=>polygon.map(ring=>ring.map((p,i)=>(i?'L':'M')+project(p).map(n=>n.toFixed(1)).join(',')).join('')+'Z').join('')).join('');
  }
  function draw(s){
    const {el,event:e,options:o}=s, {width,height}=el.getBoundingClientRect();
    const w=Math.max(230,width),h=Math.max(180,height);
    const [west,south,east,north]=edition.bounds;
    const global=o.view==='world', localized=o.view==='focus';
    const mid=global?[0,10]:localized?e.point:[(west+east)/2,(south+north)/2];
    const aspect=Math.max(.2,Math.cos(mid[1]*Math.PI/180));
    const scale=Math.min(w/(global?360:(east-west)*(localized?.45:1)),h/(global?174:(north-south)*(localized?.45:1))*aspect)*s.zoom*.93;
    const project=([x,y])=>[(x-mid[0])*scale+w/2+s.x,(mid[1]-y)*scale/aspect+h/2+s.y];
    const svg=document.createElementNS(svgNS,'svg');svg.setAttribute('class','atlas-map-svg');svg.setAttribute('viewBox','0 0 '+w+' '+h);
    svg.setAttribute('aria-label',e.date+' '+e.title);svg.setAttribute('role','group');el.replaceChildren(svg);
    const defs=append(svg,'defs',{});
    for(const [key,color] of Object.entries(colors)){
      const m=append(defs,'marker',{id:s.id+key,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto'});
      append(m,'path',{d:'M0 0L10 5L0 10Z',fill:color});
    }
    append(svg,'rect',{width:w,height:h,fill:'#bad0ce'});
    for(const f of window.ATLAS_LAND.features)append(svg,'path',{d:pathFor(f.geometry,project),fill:'#e7e3d2',stroke:'#85998e','fill-rule':'evenodd','stroke-width':.8});
    const snapshot=geo.boundaries.filter(x=>x.from<=e.date&&(!x.until||e.date<x.until)).at(-1);
    if(snapshot&&o.layers.borders!==false){
      for(const f of snapshot.features){
        const code=f.properties.code;
        const p=append(svg,'path',{d:pathFor(f.geometry,project),fill:resolveState(code,e.date)?.color||'#e7e3d2',stroke:code===o.selectedCountry?'#a15137':'#7d8978','stroke-width':code===o.selectedCountry?2.3:1,'fill-rule':'evenodd','aria-label':edition.names[code]||code});
        activate(p,()=>o.onCountry?.(code,edition.names[code]));
      }
    }
    const spacing=global?30:10;
    const grid=append(svg,'g',{stroke:'#648278','stroke-width':.5,'stroke-dasharray':'2 4',opacity:.5,'pointer-events':'none'});
    for(let x=-180;x<=180;x+=spacing){const [a]=project([x,0]);append(grid,'line',{x1:a,x2:a,y1:0,y2:h});}
    for(let y=-80;y<=80;y+=spacing){const [,a]=project([0,y]);append(grid,'line',{x1:0,x2:w,y1:a,y2:a});}
    if(o.layers.relations!==false)for(const [a,b,t] of e.edges){
      const p=geo.actors[a]?.point,q=geo.actors[b]?.point;
      if(!p||!q||['attack','front','battle','territory'].includes(t))continue;
      const [x,y]=project(p),[xx,yy]=project(q);
      append(svg,'path',{d:'M'+x+' '+y+' Q'+(x+xx)/2+' '+((y+yy)/2-12)+' '+xx+' '+yy,fill:'none',stroke:colors[t]||colors.politics,'stroke-width':2,'stroke-dasharray':'5 3','marker-end':'url(#'+s.id+t+')'});
    }
    // Field operations use sourced coordinates rather than a line between governments.
    if(o.layers.overlays!==false)for(const route of e.overlays||[]){
      const d=route.points.map((p,i)=>(i?'L':'M')+project(p).join(' ')).join(' ');
      const path=append(svg,'path',{d,fill:'none',stroke:colors[route.type]||colors.front,'stroke-width':2.5,'stroke-dasharray':route.type==='front'?'6 3':'none','marker-end':route.type==='attack'?'url(#'+s.id+'attack)':'none'});
      append(path,'title',{},route.label);
    }
    if(o.layers.names!==false)for(const [code,data] of Object.entries(geo.actors)){
      const active=resolveState(code,e.date);
      if(!active||active.showLabel===false||!data.point)continue;
      const [x,y]=project(data.point);
      const g=append(svg,'g',{transform:'translate('+x+' '+y+')','aria-label':edition.names[code]||code});
      append(g,'circle',{r:3,fill:'#516f60'});
      append(g,'text',{x:5,y:17,class:'map-city'},edition.names[code]||code);
      activate(g,()=>o.onCountry?.(code,edition.names[code]));
    }
    if(o.layers.places!==false){
      const seen=new Set();const prior=events.slice(0,events.indexOf(e)).reverse();
      for(const past of prior){
        const key=past.point.join(',');
        if(seen.has(key)||key===e.point.join(','))continue;
        seen.add(key);
        const [x,y]=project(past.point),g=append(svg,'g',{'aria-label':past.title,transform:'translate('+x+' '+y+')'});
        append(g,'circle',{r:6,fill:'#f5ecd7',stroke:'#7d7157'});append(g,'title',{},past.title);activate(g,()=>o.onEvent?.(past.id));
      }
    }
    const [x,y]=project(e.point),label=e.place.split(/[，、／]/)[0].slice(0,16);
    const labelW=Math.min(w-10,Math.max(110,label.length*15+18));
    const bx=Math.min(w-labelW-4,Math.max(4,x+13)),by=Math.max(4,Math.min(h-48,y-55));
    const g=append(svg,'g',{class:'map-pin','aria-label':'展開事件：'+e.title});
    append(g,'line',{x1:x,y1:y,x2:bx+5,y2:by+38,stroke:'#98563d'});
    append(g,'circle',{cx:x,cy:y,r:8,fill:'#fcf8e8',stroke:'#a0543a','stroke-width':2});append(g,'circle',{cx:x,cy:y,r:3.5,fill:'#a0543a'});
    append(g,'rect',{x:bx,y:by,width:labelW,height:42,rx:3,fill:'#fcf8eb',stroke:'#ac8f6b'});
    append(g,'text',{x:bx+8,y:by+15,class:'map-pin-date'},e.date);append(g,'text',{x:bx+8,y:by+33,class:'map-pin-title'},label);
    activate(g,()=>o.onEvent?.(e.id));
    append(svg,'text',{x:w-6,y:h-7,'text-anchor':'end',class:'map-note'},snapshot?'歷史截面 · '+snapshot.from:'自然陸地輪廓 · 未繪歷史國界');
  }
  function controls(s){
    const el=s.el;let start=null,dragging=false;
    el.addEventListener('pointerdown',e=>{if(e.button===0){start=[e.clientX,e.clientY,s.x,s.y];dragging=false;}});
    el.addEventListener('pointermove',e=>{
      if(!start)return;
      const dx=e.clientX-start[0],dy=e.clientY-start[1];
      if(!dragging&&Math.hypot(dx,dy)<4)return;
      dragging=true;el.setPointerCapture(e.pointerId);s.x=start[2]+dx;s.y=start[3]+dy;draw(s);
    });
    const end=()=>{start=null;};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
    el.addEventListener('click',e=>{if(dragging){e.stopPropagation();dragging=false;}},true);
    if(window.ResizeObserver){
      const ro=new ResizeObserver(()=>{if(!el.isConnected){ro.disconnect();return;}draw(s);});ro.observe(el);
    }
  }
  window.drawAtlasMap=(el,event,options)=>{
    let s=hosts.get(el);
    if(!s){s={el,id:'pack-map-'+(++number)+'-',zoom:1,x:0,y:0};hosts.set(el,s);controls(s);}
    if(s.options?.view!==options.view || (options.view==='focus'&&s.event!==event)){s.zoom=1;s.x=s.y=0;}
    s.event=event;s.options=options;draw(s);
  };
  window.atlasZoom=(el,factor)=>{
    const s=hosts.get(el);if(!s)return;
    if(factor===0){s.zoom=1;s.x=s.y=0;}else{s.zoom=Math.min(10,Math.max(.45,s.zoom*factor));}draw(s);
  };
})();
