import {cp,mkdir,readFile,writeFile,rm,mkdtemp,rename} from 'node:fs/promises';
import {join} from 'node:path';
import {root,editions} from './editions.mjs';
const escape=v=>String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const packs=await editions();
const output=join(root,'site'),stage=await mkdtemp(join(root,'.site-build-'));
const app=join(root,'app'),template=await readFile(join(app,'reader.html'),'utf8');
const base=(title,body,css)=>'<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title)+'</title><link rel="stylesheet" href="'+css+'"><main class="catalog">'+body+'</main></html>';
try{
  const assets=join(stage,'app');await mkdir(assets);
  for(const f of ['reader.js','style.css','map.js','map.css','catalog.css'])await cp(join(app,f),join(assets,f));
  await writeFile(join(assets,'land.js'),'window.ATLAS_LAND='+await readFile(join(app,'land.json'),'utf8')+';\n');
  const cards=[];
  for(const {c,events,geo,dir} of packs){
    const dest=join(stage,c.id);await mkdir(dest);
    cards.push('<a class="card" href="'+c.id+'/index.html"><small>'+escape(c.subject)+' · '+escape(c.years)+'</small><h2>'+escape(c.title)+'</h2><p>'+escape(c.description)+'</p><b>'+(events.length?c.chapters.length+' 章 · '+events.length+' 個事件':'編輯中')+'</b></a>');
    if(!events.length){
      await writeFile(join(dest,'index.html'),base(c.title,'<a href="../index.html">時期目錄</a><h1>'+escape(c.title)+'</h1><p>教材草稿。請在 eras/'+escape(c.id)+'/ 填寫第一筆事件後重新建置。</p>','../app/catalog.css'));continue;
    }
    const scripts=['edition.js'];
    await writeFile(join(dest,'edition.js'),'window.ATLAS_CONFIG='+JSON.stringify(c)+';\nwindow.ATLAS_EVENTS='+JSON.stringify(events)+';\n');
    if(c.mapEngine==='custom'){
      for(const [src,target] of [['gis/geo.js','geo.js'],['map.js','map.js'],['reader.js','editorial.js']]){
        await cp(join(dir,src),join(dest,target));scripts.push(target);
      }
    }else{
      await writeFile(join(dest,'geography.js'),'window.ATLAS_GEOGRAPHY='+JSON.stringify(geo)+';\n');
      scripts.push('../app/land.js','geography.js','../app/map.js');
    }
    scripts.push('../app/reader.js');
    const html=template.replace(/\{\{(\w+)\}\}/g,(_,key)=>key==='scripts'?scripts.map(s=>'<script src="'+s+'"></script>').join('\n  '):escape(c[key]));
    await writeFile(join(dest,'index.html'),html);
  }
  await writeFile(join(stage,'index.html'),base('歷史地圖集','<header><p>互動歷史地圖</p><h1>時序地圖集</h1></header><div class="cards">'+cards.join('')+'</div>','app/catalog.css'));
  await rm(output,{recursive:true,force:true});await rename(stage,output);
  console.log(packs.map(p=>p.c.title+' · '+p.events.length+' 個事件').join('\n'));
}finally{await rm(stage,{recursive:true,force:true});}
