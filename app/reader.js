/* 瀏覽器端閱讀器。事件與地理資料的契約見專案 README.md。 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths = {
    book:'M3 4c3-1 6-1 9 1 3-2 6-2 9-1v15c-3-1-6-1-9 1-3-2-6-2-9-1z M12 5v15',
    info:'M12 10v6 M12 7h.01 M21 12a9 9 0 1 1-18 0 9 9 0 1 1 18 0',
    chapters:'M3 5h4v14H3z M9 5h4v14H9z M15 6l3-1 4 13-4 1z',
    map:'m2 6 7-3 6 3 7-3v15l-7 3-6-3-7 3z M9 3v15 M15 6v15',
    compare:'M3 4h18v16H3z M12 4v16 M6 8h3 M15 15h3',
    layers:'m3 8 9-5 9 5-9 5z M3 12l9 5 9-5 M3 16l9 5 9-5',
    globe:'M21 12a9 9 0 1 1-18 0 9 9 0 1 1 18 0 M3 12h18 M12 3c-5 5-5 13 0 18 5-5 5-13 0-18z',
    plus:'M5 12h14 M12 5v14',minus:'M5 12h14',center:'M3 9V4h5 M16 4h5v5 M21 15v5h-5 M8 20H3v-5 M15 12a3 3 0 1 1-6 0 3 3 0 1 1 6 0',
    play:'m7 4 13 8-13 8z',pause:'M8 5v14 M16 5v14',prev:'m14 5-8 7 8 7 M4 5v14',next:'m9 5 8 7-8 7 M20 5v14',
    close:'m6 6 12 12 M18 6 6 18',chevDown:'m5 9 7 7 7-7',chev:'m9 5 7 7-7 7',
    reset:'M3 4v6h6 M4 9a8 8 0 1 1 1 9',list:'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
    file:'M5 3h10l4 4v14H5z M15 3v5h4 M8 12h8 M8 16h6',
    timeline:'M2 12h5 M10 12h4 M17 12h5 M10 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0 M18 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0',
    pin:'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z M14 10a2 2 0 1 1-4 0 2 2 0 1 1 4 0',
    external:'M13 4h7v7 M20 4 10 14 M10 5H5v15h15v-6',branch:'M6 4v16 M6 12c8 0 12-2 12-8 M18 4l-3 3 M18 4l3 3',back:'M19 12H5 M10 7l-5 5 5 5'
  };
  $('symbols').innerHTML = Object.entries(paths).map(([id,d]) => '<symbol id="ic-'+id+'" viewBox="0 0 24 24"><path d="'+d+'"/></symbol>').join('');
  const icon = name => '<svg class="icon" aria-hidden="true"><use href="#ic-'+name+'"></use></svg>';
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML=icon(el.dataset.icon); });
  const edition=window.ATLAS_CONFIG;
  const {chapters,names,layers:layersMeta}=edition;
  const editorial=window.ATLAS_EDITION_VIEW||{};
  const types = {tension:'外交衝突',support:'外交支持',alliance:'締結協定',mobilize:'軍事動員',ultimatum:'最後通牒',declare:'正式宣戰',attack:'軍事行動',battle:'重要戰役',front:'主要戰線',territory:'領土變動',politics:'政治事件',peace:'外交與和議'};
  const verbs = {tension:'發生矛盾',support:'提供支持',alliance:'結成協定',mobilize:'啟動動員',ultimatum:'提出最後通牒',declare:'正式宣戰',attack:'展開軍事行動',battle:'交戰',front:'形成戰線',territory:'領土關係變動',politics:'政治互動',peace:'進行交涉'};
  const layers=Object.fromEntries(Object.keys(layersMeta).map(k=>[k,true]));
  const all=window.ATLAS_EVENTS.slice().sort((a,b)=>a.chapter-b.chapter || a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  if(!all.length){$('article').textContent='事件資料未載入。請解壓縮完整專案後，從時期目錄重新開啟。';return;}
  const byId=new Map(all.map(e=>[e.id,e]));
  const grouped=chapters.map((_,i)=>all.filter(e=>e.chapter===i+1));
  const baseline=byId.get(edition.baseline)||all[0];
  let current=byId.get(location.hash.slice(1))||byId.get(edition.initial)||all[0];
  let tier=0,country=null,timer=null,modal=null,view='region';
  const fmt=d=>d.replaceAll('-','.');
  const pad=n=>String(n).padStart(2,'0');
  const eventType=e=>edition.eventLabels?.[e.id]||types[e.type]||'歷史事件';
  const countryName=(code,e=current)=>names[code] || window.atlasCountry?.(code,e.date,code)?.name||code;
  const sourceLink=([label,url])=>/^https?:\/\//i.test(url)?'<a class="sourceLink" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+icon('external')+esc(label)+'</a>':'';
  const sub=(title,content)=>content?'<h3>'+esc(title)+'</h3><p>'+esc(content)+'</p>':'';
  const eventRow=e=>'<button class="listRow" data-event="'+esc(e.id)+'" aria-current="'+(e.id===current.id)+'"><time>'+fmt(e.date)+'</time><span>'+esc(e.title)+'</span>'+icon('chev')+'</button>';
  const eventOpts=selected=>grouped.map((g,i)=>'<optgroup label="'+esc(chapters[i][1])+'">'+g.map(e=>'<option value="'+esc(e.id)+'" '+(e.id===selected?'selected':'')+'>'+e.date+' · '+esc(e.title)+'</option>').join('')+'</optgroup>').join('');
  function connectEvents(root){
    root.querySelectorAll('[data-event]').forEach(b=>b.onclick=()=>{closeDialog();go(byId.get(b.dataset.event));});
  }
  function outsideRegion([lon,lat]){
    const [west,south,east,north]=edition.bounds;
    return lon<west || lon>east || lat<south || lat>north;
  }
  function go(e,automatic=false){
    if(!e)return;
    if(!automatic)stop();
    current=e;country=null;tier=0;
    if(e.point && view!=='world' && outsideRegion(e.point))view='focus';
    else if(view==='focus' && go.autoFocus)view='region';
    go.autoFocus = view==='focus' && e.point && outsideRegion(e.point);
    $('view').value=view;
    try{history.replaceState(null,'','#'+encodeURIComponent(e.id));}catch{}
    render();
  }
  function step(delta,auto=false){const n=all.indexOf(current)+delta;if(n<0||n>=all.length){stop();return;} go(all[n],auto);if(n===all.length-1)stop();}
  function playLabel(){const on=timer!==null;$('play').innerHTML=icon(on?'pause':'play')+(on?'暫停':'自動播放');$('play').setAttribute('aria-pressed',String(on));}
  function stop(){clearInterval(timer);timer=null;playLabel();}
  function start(){stop();if(current===all.at(-1))go(all[0]);timer=setInterval(()=>step(1,true),8000/Number($('speed').value));playLabel();}
  function renderMap(){
    if(!window.drawAtlasMap)return;
    window.drawAtlasMap($('map'),current,{layers,view,selectedCountry:country?.code,comparison:false,
      onCountry:(code,name)=>inspectCountry(code,name),onEvent:id=>{stop();if(byId.has(id)&&id!==current.id)go(byId.get(id));country=null;tier=1;renderReader();$('article').scrollTop=0;}});
  }
  function inspectCountry(code,name,redraw=true){stop();country={code,name};renderReader();if(redraw)renderMap();$('article').scrollTop=0;}
  function renderLegend(){
    $('legend').innerHTML=editorial.legend?.(current,layers) || '<span class="legItem"><i class="key event"></i>目前事件</span><span class="legItem">'+esc(edition.legend||'地點與自然陸地輪廓')+'</span>';
  }
  function renderNav(){
    $('chapters').innerHTML=chapters.map(([num,title,years],i)=>'<button data-ch="'+i+'" class="chapter '+(current.chapter===i+1?'active':'')+'" aria-current="'+(current.chapter===i+1)+'"><span class="roman">'+esc(num)+'</span><span><strong>'+esc(title)+'</strong><small>'+esc(years)+'</small></span></button>').join('');
    $('chapters').querySelectorAll('button').forEach(b=>b.onclick=()=>go(grouped[Number(b.dataset.ch)][0]));
    const g=grouped[current.chapter-1],i=g.indexOf(current);
    $('miniList').innerHTML=g.map(e=>'<button class="mini '+(e===current?'on':'')+'" title="'+esc(e.title)+'" data-event="'+esc(e.id)+'"><time>'+e.date.slice(5).replace('-','/')+'</time><span>'+esc(e.title)+'</span></button>').join('');
    connectEvents($('miniList'));
    const mini=$('miniList'),active=mini.querySelector('.on');if(active)mini.scrollTop=active.offsetTop-mini.firstElementChild.offsetTop-Math.floor(mini.clientHeight/3);
    $('readerList').textContent=pad(i+1)+' / '+pad(g.length);
    $('partLabel').textContent='第'+current.chapter+'章 · '+g.length+' 個事件';
    $('track').max=g.length-1;$('track').value=i;$('track').setAttribute('aria-valuetext',current.date+' '+current.title);
    $('track').style.setProperty('--progress',(100*i/Math.max(1,g.length-1))+'%');
    $('notches').innerHTML=g.map(()=>'<i></i>').join('');$('startDate').textContent=fmt(g[0].date);$('endDate').textContent=fmt(g.at(-1).date);$('timelineDate').textContent=i===0||i===g.length-1?'':fmt(current.date);
    $('prev').disabled=current===all[0];$('next').disabled=current===all.at(-1);playLabel();
  }
  function storyText(e){
    const parts=String(e.summary).match(/[^。！？]+[。！？]?/g)||[e.summary];
    const cut=parts.length>=4?2:parts.length;
    const archiveCard=editorial.archive?.(e,icon)||'';
    if(tier===0)return '<div class="prose"><p>'+esc(parts.slice(0,cut).join(''))+'</p>'+(cut<parts.length?'<p>'+esc(parts.slice(cut).join(''))+'</p>':'')+'</div>'+archiveCard;
    if(tier===1)return '<div class="prose">'+sub('背景',e.background)+sub('直接原因',e.trigger)+sub('各方如何盤算',e.motives)+sub('接下來的變化',e.impact)+'</div>';
    return '<div class="prose">'+sub('史家怎麼解讀',e.debate)+sub('決策者與史料',e.primary)+sub('如果當時另作選擇',e.counterfactual)+'</div><div class="readerBlock"><h3>查閱史料</h3>'+(e.sources||[]).map(sourceLink).join('')+'</div>';
  }
  function renderReader(){
    const e=current; $('readerCaption').textContent=country?'國家檔案':'事件檔案';
    if(country){
      const c=window.atlasCountry?.(country.code,e.date,country.name,e.id)||{};
      const relationText=Array.isArray(c.relations)?c.relations.join('。'):c.relations;
      const related=(e.actors||[]).includes(country.code);
      $('article').innerHTML='<section class="countryPanel"><button id="countryBack" class="countryBack">'+icon('back')+'返回事件</button><time>'+fmt(e.date)+'</time><h2>'+esc(c.name||country.name||countryName(country.code))+'</h2><div class="prose">'+sub('當時立場',c.stance||'此政區目前沒有獨立的立場條目。')+sub('外交關係',relationText||'可從地圖與同日事件對照當時的關係。')+ (related?sub('本事件中的角色',e.motives):'')+'</div><div class="readerBlock"><h3>相關事件</h3>'+all.slice(0,all.indexOf(e)).filter(x=>x.actors.includes(country.code)).slice(-4).reverse().map(x=>'<button class="causalCard" data-event="'+esc(x.id)+'"><time>'+fmt(x.date)+'</time><strong>'+esc(x.title)+'</strong></button>').join('')+'</div></section>';
      $('countryBack').onclick=()=>{country=null;renderReader();renderMap();};connectEvents($('article'));return;
    }
    const edges=(e.edges||[]).filter(x=>x.length>=3);
    $('article').innerHTML='<div class="dateLine"><time>'+fmt(e.date)+'</time><span class="typeChip">'+esc(eventType(e))+'</span></div><h2 class="eventTitle">'+esc(e.title)+'</h2><div class="placeLine">'+icon('pin')+'<span>'+esc(e.place)+'</span></div><div class="tiers" role="tablist" aria-label="解說深度">'+['白話入門','深入解釋','進階研究'].map((s,i)=>'<button role="tab" data-tier="'+i+'" aria-selected="'+(tier===i)+'">'+s+'</button>').join('')+'</div>'+storyText(e)+
      '<div class="readerBlock"><h3>相關國家</h3><div class="tags">'+e.actors.map(c=>'<button class="tag" data-country="'+esc(c)+'">'+esc(countryName(c))+'</button>').join('')+'</div></div>'+
      '<div class="readerBlock"><h3>這一步，地圖怎麼讀？</h3><p class="evidence">'+esc(e.mapNote)+'</p>'+edges.map(([a,b,t])=>'<p class="edgeRow">'+esc(countryName(a))+' <span>'+esc(verbs[t]||types[t]||t)+'</span> '+(a===b?'':esc(countryName(b)))+'</p>').join('')+'</div>'+
      '<button class="causalLink" id="causeOpen">'+icon('branch')+'追蹤前因與後果</button>';
    $('article').querySelectorAll('[data-tier]').forEach(b=>b.onclick=()=>{stop();tier=Number(b.dataset.tier);renderReader();$('article').scrollTop=0;});
    $('article').querySelectorAll('[data-country]').forEach(b=>b.onclick=()=>inspectCountry(b.dataset.country,countryName(b.dataset.country)));
    $('causeOpen').onclick=openCauses;
  }
  function render(){renderNav();renderMap();renderReader();renderLegend();const last=Object.keys(window.ATLAS_GEO||{}).filter(k=>k<=current.date).sort().at(-1);$('mapCredit').textContent=editorial.credit?.(current,last)||edition.credit||'自然地理參照';$('article').scrollTop=0;}
  function showDialog(kind,title,label,html){
    stop();$('layerPanel').hidden=true;$('layerOpen').setAttribute('aria-expanded','false');
    modal=kind;const dlg=$('dialog');dlg.classList.toggle('compareDialog',kind==='compare');
    $('dlgTitle').textContent=title;$('dlgLabel').textContent=label;$('dlgBody').innerHTML=html;
    if(!dlg.open)dlg.showModal();$('dlgBody').scrollTop=0;
  }
  function closeDialog(){if($('dialog').open)$('dialog').close();modal=null;}
  function openIndex(){
    showDialog('index','事件目錄','選擇閱讀位置','<label>歷史章節 <select id="chapterIndex" class="selectControl">'+chapters.map((c,i)=>'<option value="'+i+'" '+(current.chapter===i+1?'selected':'')+'>'+esc(c[0])+' · '+esc(c[1])+'</option>').join('')+'</select></label><div class="indexList" id="fullList"></div>');
    const update=()=>{$('fullList').innerHTML=grouped[Number($('chapterIndex').value)].map(eventRow).join('');connectEvents($('fullList'));};
    $('chapterIndex').onchange=update;update();
  }
  function openCauses(){
    const e=current,parents=(e.causes||[]).map(id=>byId.get(id)).filter(Boolean),children=all.filter(x=>x.causes?.includes(e.id));
    const cards=items=>items.map(x=>'<button class="causalCard" data-event="'+esc(x.id)+'"><time>'+fmt(x.date)+'</time><strong>'+esc(x.title)+'</strong><small>'+esc(x.impact)+'</small></button>').join('');
    showDialog('causes','前因與後果',e.date+' · '+e.title,'<section class="dialogSection"><h3>哪些事件改變了當時的選擇？</h3>'+(cards(parents)||'<p>本教材從這個節點開始追溯。背景可見本事件的深入解釋。</p>')+'</section><section class="dialogSection"><h3>'+esc(e.title)+'</h3><p class="evidence">'+esc(e.trigger)+' '+esc(e.impact)+'</p></section><section class="dialogSection"><h3>哪些後續事件受到影響？</h3>'+(cards(children)||'<p>'+esc(e.impact)+'</p>')+'</section>');connectEvents($('dlgBody'));
  }
  function openCompare(){
    const first=baseline.id===current.id?(byId.get(edition.compare)||all.at(-1)):baseline;
    const pane=(side,label,e)=>'<section class="cmpPane"><div class="cmpHeader"><label for="sel'+side+'">'+label+'</label><select class="selectControl" id="sel'+side+'" aria-label="'+label+'的日期與事件">'+eventOpts(e.id)+'</select></div><div class="cmpMap" id="cmp'+side+'"></div><div class="cmpText" id="note'+side+'"></div></section>';
    showDialog('compare','兩個時點的地圖','並列比較','<div class="cmpGrid">'+pane('A','A',first)+pane('B','B',current)+'</div><p class="compareNotes">兩圖使用相同的初始視野與圖層設定。選擇事件可比較國界、外交關係與軍事行動，拖曳可分別移動視野。</p>');
    const draw=side=>{
      const e=byId.get($('sel'+side).value),host=$('cmp'+side),note=$('note'+side);
      note.innerHTML='<strong>'+fmt(e.date)+'</strong>　'+esc(e.title)+'<br>'+esc(e.mapNote);
      window.drawAtlasMap?.(host,e,{layers,view,comparison:true,selectedCountry:null,
        onCountry:(code,name)=>{const c=window.atlasCountry?.(code,e.date,name,e.id);if(c)note.innerHTML='<strong>'+esc(c.name)+'</strong>　'+fmt(e.date)+'<br>'+esc(c.stance)+'。'+esc(c.relations);},
        onEvent:id=>{const selected=byId.get(id)||e;note.innerHTML='<strong>'+esc(selected.title)+'</strong><br>'+esc(selected.summary);}});
    };
    for(const s of ['A','B']){$('sel'+s).onchange=()=>draw(s);draw(s);}
  }
  function openMethod(){
    if(editorial.method) return editorial.method({current,fmt,esc,sourceLink,showDialog});
    const body='<section class="dialogSection"><h3>地圖範圍與限制</h3><p>'+esc(edition.mapNote)+'</p></section>'
      +'<section class="dialogSection"><h3>地理資料來源</h3>'+(edition.mapSources||[]).map(sourceLink).join('')+'</section>';
    showDialog('method','歷史國界怎麼讀？','製圖說明與授權',body);
  }
  function openSources(){
    showDialog('sources','史料索引','依章查閱','<div class="dialogSection"><label>選擇章節 <select class="selectControl" id="sourceCh">'+chapters.map((c,i)=>'<option value="'+i+'" '+(i===current.chapter-1?'selected':'')+'>'+esc(c[0])+' · '+esc(c[1])+'</option>').join('')+'</select></label><div id="sourceList"></div></div><button class="toolBtn" id="sourceMethod">'+icon('map')+'製圖說明與資料授權</button>');
    const update=()=>{const refs=new Map();for(const e of grouped[Number($('sourceCh').value)])for(const s of e.sources||[])refs.set(s[1],s);$('sourceList').innerHTML=Array.from(refs.values()).map(sourceLink).join('');};$('sourceCh').onchange=update;$('sourceMethod').onclick=openMethod;update();
  }
  function openHelp(){
    showDialog('help','使用指南','第一次閱讀','<section class="dialogSection"><h3>'+esc(edition.guideTitle||'閱讀本時期')+'</h3><p>'+esc(edition.guideText||edition.description)+'</p></section><section class="dialogSection"><h3>閱讀與操作</h3><p class="guideRow"><b>推進</b><span>按上一步、下一事件，或使用鍵盤左右鍵。拖曳時間軸依本章事件移動，刻度依事件等距排列。同日可有多個決策。</span></p><p class="guideRow"><b>播放</b><span>按自動播放或空白鍵切換暫停。1× 每 8 秒前進一步，讀細節時可調至 0.5×。</span></p><p class="guideRow"><b>讀圖</b><span>點擊國家查看當時立場。點事件標記或戰役可讀詳情。拖曳平移、用加減鍵縮放，亦可切換事件周邊或世界全圖。</span></p><p class="guideRow"><b>追溯</b><span>在事件檔案切換解說深度。「追蹤前因與後果」可直接跳到相關事件。「進階研究」附史料、學界討論，以及有條件的歷史假設。</span></p><p class="guideRow"><b>比較</b><span>按「時點比較」後分別選擇 A 與 B。可以比較同一日內不同的行動，或選擇本期首末兩個時點。</span></p></section><button class="toolBtn" id="helpReset">'+icon('reset') +esc(edition.reset)+'</button>');$('helpReset').onclick=()=>{closeDialog();go(baseline);};
  }
  $('layerItems').innerHTML=Object.entries(layersMeta).map(([key,[label,desc]])=>'<label class="layerRow"><input type="checkbox" checked data-layer="'+key+'"><span><strong>'+label+'</strong><small>'+desc+'</small></span></label>').join('');
  $('layerItems').querySelectorAll('input').forEach(input=>input.onchange=()=>{layers[input.dataset.layer]=input.checked;renderMap();renderLegend();});
  const layerToggle=open=>{$('layerPanel').hidden=!open;$('layerOpen').setAttribute('aria-expanded',String(open));if(open)stop();};
  $('layerOpen').onclick=()=>layerToggle($('layerPanel').hidden);$('layerClose').onclick=()=>layerToggle(false);
  $('track').oninput=()=>go(grouped[current.chapter-1][Number($('track').value)]);
  $('prev').onclick=()=>step(-1);$('next').onclick=()=>step(1);$('play').onclick=()=>timer?stop():start();$('speed').onchange=()=>{if(timer)start();};
  for(const id of ['eventListOpen','readerList','showTimeline'])$(id).onclick=openIndex;
  $('quickCause').onclick=openCauses; $('compareOpen').onclick=openCompare;$('helpOpen').onclick=openHelp;$('methodOpen').onclick=openMethod;$('sourceOpen').onclick=openSources;
  $('mapCredit').onclick=openMethod;
  $('baseline').onclick=()=>{view='region';go(baseline);window.atlasZoom?.($('map'),0);};
  $('dlgClose').onclick=closeDialog;$('dialog').addEventListener('close',()=>{modal=null;});$('dialog').onclick=e=>{if(e.target===$('dialog')){const r=$('dialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}};
  $('view').onchange=()=>{view=$('view').value;go.autoFocus=false;renderMap();};
  document.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>window.atlasZoom?.($('map'),Number(b.dataset.zoom)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){layerToggle(false);return;}if(modal||e.altKey||e.ctrlKey||e.metaKey||['SELECT','INPUT','TEXTAREA'].includes(e.target.tagName))return;
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1);}
    if(e.code==='Space'&&!['BUTTON','A'].includes(e.target.tagName)){e.preventDefault();timer?stop():start();}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  render();
})();
