// Run: node source/smoke.mjs. Uses the actual shipped HTML, controller, map,
// and datasets. This fixture exercises DOM events and SVG output, not CSS layout.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createContext, runInContext} from 'node:vm';

const voidTags = new Set(['meta','link','input','img','br','hr','source','use']);
const descendants = function* (node) {
  for (const child of node.children) { yield child; yield* descendants(child); }
};

class Element {
  constructor(tag, boxes) {
    this.tagName=tag.toUpperCase();
    this.boxes=boxes;
    this.children=[];
    this.attributes={};
    this.dataset={};
    this.listeners={};
    this.style={setProperty:(key,val)=>{this.style[key]=val;}};
    const classes=()=>new Set((this.attributes.class||'').split(/\s+/).filter(Boolean));
    const change=(name,on)=>{const s=classes();if(on)s.add(name);else s.delete(name);this.attributes.class=[...s].join(' ');};
    this.classList={contains:c=>classes().has(c),add:c=>change(c,true),remove:c=>change(c,false),toggle:(c,on)=>change(c,on??!classes().has(c))};
    this.ownText='';
    this.offsetTop=0; this.clientHeight=215;
  }
  setAttribute(name,value){
    this.attributes[name]=String(value);
    if(name.startsWith('data-'))this.dataset[name.slice(5)]=String(value);
    if(name==='id')this.id=String(value);
    if(name==='checked'||name==='hidden')this[name]=true;
  }
  getAttribute(name){return this.attributes[name];}
  matches(sel){
    if(sel.startsWith('.'))return this.classList.contains(sel.slice(1));
    if(sel.startsWith('#'))return this.id===sel.slice(1);
    if(sel.startsWith('[')){
      const [,key,val]=sel.match(/^\[([\w-]+)(?:="([^"]*)")?\]$/);
      return val===undefined ? Object.hasOwn(this.attributes,key) : this.attributes[key]===val;
    }
    return this.tagName===sel.toUpperCase();
  }
  querySelectorAll(sel){return [...descendants(this)].filter(n=>n.matches(sel));}
  querySelector(sel){for(const node of descendants(this)){if(node.matches(sel))return node;}return null;}
  append(n){
    if(n.parent){const i=n.parent.children.indexOf(n);if(i>=0)n.parent.children.splice(i,1);}
    n.parent=this;this.children.push(n);
  }
  replaceChildren(...nodes){for(const n of this.children)n.parent=null;this.children=[];this.ownText='';nodes.forEach(n=>this.append(n));}
  get firstElementChild(){return this.children[0];}
  set innerHTML(s){this.replaceChildren();parse(s,this);}
  get textContent(){return this.ownText+this.children.map(n=>n.textContent).join('');}
  set textContent(s){this.replaceChildren();this.ownText=String(s);}
  get value(){
    if(this._value!==undefined)return this._value;
    if(this.tagName==='SELECT'){
      const opts=this.querySelectorAll('option');
      return (opts.find(o=>o.getAttribute('selected')!==undefined)||opts[0])?.value||'';
    }
    return this.getAttribute('value')||'';
  }
  set value(v){this._value=String(v);}
  addEventListener(type,cb){(this.listeners[type]??=[]).push(cb);}
  dispatchEvent(e){
    if(!e.target)e.target=this;
    if(!e.preventDefault)e.preventDefault=()=>{};
    this['on'+e.type]?.(e);
    for(const cb of this.listeners[e.type]||[]) cb(e);
  }
  fire(type,extra={}){if(!this.disabled)this.dispatchEvent({type,...extra});}
  showModal(){this.open=true;}
  close(){this.open=false;this.fire('close');}
  getBoundingClientRect(){
    const [width,height]=this.boxes[this.id]||[700,460];
    return {width,height,left:0,right:width,top:0,bottom:height};
  }
}
function parse(html,parent){
  const stack=[parent];
  for(const [token] of html.matchAll(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g)){
    const top=stack.at(-1);
    if(token.startsWith('<!'))continue;
    if(!token.startsWith('<')){top.ownText+=token;continue;}
    if(token.startsWith('</')){
      const tag=token.slice(2,-1).trim().toUpperCase();
      const i=stack.findLastIndex(n=>n.tagName===tag);
      if(i>0)stack.length=i;
      continue;
    }
    const [,tag,attrs]=token.match(/^<([\w-]+)\b([^>]*)>/)||[];
    if(!tag)continue;
    const node=new Element(tag,parent.boxes);
    for(const match of attrs.matchAll(/([\w:-]+)(?:\s*=\s*"([^"]*)")?/g))node.setAttribute(match[1],match[2]??'');
    top.append(node);
    if(!voidTags.has(tag)&&!token.endsWith('/>'))stack.push(node);
  }
}
function exercise(width,edition='world-war-i'){
  const asset=file=>readFileSync(new URL('../site/'+edition+'/'+file,import.meta.url),'utf8');
  const boxes={map:[width,455],cmpA:[width/2,310],cmpB:[width/2,310]};
  const doc=new Element('document',boxes);
  doc.getElementById=id=>doc.querySelector('#'+id);
  doc.createElementNS=(_,tag)=>new Element(tag,boxes);
  const html=process.argv[2] ? readFileSync(process.argv[2],'utf8') : asset('index.html');
  parse(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''),doc);
  let tick=0;
  const intervals=new Map();
  const loc={hash:''};
  const realm={document:doc,location:loc,history:{replaceState:(_a,_b,hash)=>loc.hash=hash},console,
    setInterval:(fn,delay)=>{intervals.set(++tick,{fn,delay});return tick;},
    clearInterval:id=>intervals.delete(id),setTimeout:fn=>fn(),requestAnimationFrame:fn=>{fn();return 0;},
    Event:class {constructor(type){this.type=type;}}};
  realm.window=realm;
  const ctx=createContext(realm);
  for(const [,tag,init] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
    const src=tag.match(/src="([^"]+)"/)?.[1];
    runInContext(src?asset(src):init,ctx,{filename:src||'inline-init'});
  }
  const $=id=>assertNode(doc.getElementById(id),id);
  function assertNode(n,flag){assert.ok(n,'missing '+flag);return n;}
  const click=id=>$(id).fire('click');
  const node=(parent,sel)=>assertNode(parent.querySelector(sel),sel);
  const evt=id=>realm.ATLAS_EVENTS.find(e=>e.id===id);
  function now(id){
    const e=evt(id);
    assert.equal(node($('article'),'.eventTitle').textContent,e.title);
    assert.equal($('track').getAttribute('aria-valuetext'),e.date+' '+e.title);
    assert.equal(node($('map'),'svg').getAttribute('aria-label'),e.date+' '+e.title+' 歷史互動地圖');
  }
  function chapter(n){node($('chapters'),'[data-ch="'+(n-1)+'"]').fire('click');}
  function setSelect(id,value){$(id).value=value;$(id).fire('change');}
  function range(i){$('track').value=i;$('track').fire('input');}
  const nowLayer=(k,on)=>{const n=node($('layerItems'),'[data-layer="'+k+'"]');n.checked=on;n.fire('change');};
  if(edition==='german-reunification'){
    const title=()=>node($('article'),'.eventTitle').textContent;
    assert.equal(title(),evt('wall-open').title);click('next');assert.equal(title(),evt('two-plus-four').title);
    click('quickCause');node($('dlgBody'),'[data-event="wall-open"]').fire('click');assert.equal(title(),evt('wall-open').title);
    click('compareOpen');setSelect('selB','unity');assert.ok($('noteB').textContent.includes('1990.10.03'));click('dlgClose');
    node($('map'),'[aria-label="東德"]').fire('click');assert.ok($('article').textContent.includes('德意志民主共和國'));click('countryBack');
    click('helpOpen');click('helpReset');assert.equal(title(),evt('wall-open').title);
    click('methodOpen');assert.ok($('dlgBody').textContent.includes('未繪兩德國界'));click('dlgClose');
    console.log('PASS — template edition timeline, causes, comparison, actor, help and geography notes');return;
  }
  const jul=realm.ATLAS_EVENTS.filter(e=>e.chapter===2);
  const base=realm.ATLAS_EVENTS.find(e=>e.date==='1914-01-01');
  now('j01');click('next');now('j02');click('prev');now('j01');
  for(let n=1;n<=6;n++){chapter(n);now(realm.ATLAS_EVENTS.filter(e=>e.chapter===n).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id))[0].id);}
  chapter(2);now('j01');assert.equal(Number($('track').max),jul.length-1);
  range(10);now('j11');click('next');now('j12');assert.equal(evt('j11').date,evt('j12').date);
  node($('article'),'[data-tier="1"]').fire('click');assert.ok($('article').textContent.includes(evt('j12').trigger));
  node($('article'),'[data-tier="2"]').fire('click');assert.ok($('article').textContent.includes(evt('j12').counterfactual));
  assert.equal($('article').querySelectorAll('.sourceLink').length,evt('j12').sources.length);
  node($('article'),'[data-tier="0"]').fire('click');assert.ok($('article').textContent.includes(evt('j12').summary.slice(0,10)));
  click('causeOpen');assert.ok($('dialog').open);node($('dlgBody'),'[data-event="j10"]').fire('click');now('j10');assert.ok(!$('dialog').open);
  const p=node($('map'),'[data-code="AH"]');p.fire('click');assert.ok($('article').textContent.includes('當時立場'));assert.ok($('article').textContent.includes('外交關係'));
  click('countryBack');now('j10');
  assert.ok(node($('map'),'.map-labels').children.length);assert.ok(node($('map'),'.map-edges').children.length);
  click('layerOpen');assert.equal($('layerPanel').hidden,false);
  nowLayer('names',false);assert.equal(node($('map'),'.map-labels').children.length,0);
  nowLayer('war',false);assert.equal(node($('map'),'.map-edges').children.length,0);
  nowLayer('names',true);nowLayer('war',true);assert.ok(node($('map'),'.map-edges').children.length);
  for(const input of $('layerItems').querySelectorAll('input')){
    const k=input.dataset.layer;
    nowLayer(k,false);now('j10');nowLayer(k,true);now('j10');
  }
  nowLayer('alliances',false);assert.ok(!$('legend').textContent.includes('同盟國方'));nowLayer('alliances',true);
  click('layerClose');assert.ok($('layerPanel').hidden);
  click('play');assert.equal(intervals.size,1);assert.equal([...intervals.values()][0].delay,8000);
  setSelect('speed','4');assert.equal(intervals.size,1);assert.equal([...intervals.values()][0].delay,2000);
  [...intervals.values()][0].fn();now('j11');assert.equal($('play').getAttribute('aria-pressed'),'true');
  click('play');assert.equal(intervals.size,0);assert.equal($('play').getAttribute('aria-pressed'),'false');
  range(18);now('j19');click('next');now('j20');node($('map'),'.map-pin').fire('click');
  if(node($('article'),'[data-tier="1"]').getAttribute('aria-selected')==='false'){
    // An off-screen marker positions the map on the event; a second click opens it.
    node($('map'),'.map-pin').fire('click');
  }
  assert.equal(node($('article'),'[data-tier="1"]').getAttribute('aria-selected'),'true');
  click('compareOpen');assert.ok($('dialog').open);
  assert.equal($('selA').value,base.id);assert.equal($('selB').value,'j20');
  setSelect('selA','j20');setSelect('selB','j21');
  for(const [side,id] of [['A','j20'],['B','j21']]){
    assert.ok(node($('cmp'+side),'svg').getAttribute('aria-label').includes(evt(id).title));
    assert.ok($('note'+side).textContent.includes(evt(id).mapNote));
  }
  const aTitle=node($('cmpA'),'svg').getAttribute('aria-label');
  node($('cmpB'),'[data-code="BE"]').fire('click');assert.ok($('noteB').textContent.includes('比利時'));
  setSelect('selB','j19');assert.equal(node($('cmpA'),'svg').getAttribute('aria-label'),aTitle);
  click('dlgClose');now('j20');
  doc.fire('keydown',{key:'ArrowRight',target:doc});now('j21');
  doc.fire('keydown',{key:'ArrowLeft',target:doc});now('j20');
  click('play');doc.hidden=true;doc.fire('visibilitychange');assert.equal(intervals.size,0);doc.hidden=false;
  click('sourceOpen');assert.ok($('sourceList').querySelectorAll('a').length>0);click('sourceMethod');assert.ok($('dlgBody').textContent.includes('CShapes'));click('dlgClose');
  click('baseline');now(base.id);assert.equal($('view').value,'region');
  click('showTimeline');setSelect('chapterIndex','1');node($('fullList'),'[data-event="j21"]').fire('click');now('j21');
  click('helpOpen');click('helpReset');now(base.id);
  chapter(1);assert.equal($('prev').disabled,true);
  chapter(6);range(Number($('track').max));assert.equal($('next').disabled,true);
  const svg=node($('map'),'svg');assert.equal(svg.getAttribute('viewBox'),'0 0 '+width+' 455');
  assert.ok(!svg.querySelectorAll('path').some(n=>/NaN|Infinity/.test(n.getAttribute('d')||'')));
  assert.equal($('layerItems').querySelectorAll('input').length,9);
  console.log('PASS — map width '+width+' px, controls, timeline, layers, sources, map clicks, dialogs, playback and comparison');
}
for(const width of [780,540,375])exercise(width);

if(!process.argv[2])exercise(780,'german-reunification');
