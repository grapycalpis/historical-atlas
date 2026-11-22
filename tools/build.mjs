import {cp,mkdir,readFile,writeFile,rm,mkdtemp,rename} from 'node:fs/promises';
import {join} from 'node:path';
import {root,editions} from './editions.mjs';
import {site,escape,metadata,sitemap} from './seo.mjs';
const packs=await editions();
const output=join(root,'site'),stage=await mkdtemp(join(root,'.site-build-'));
const app=join(root,'app'),template=await readFile(join(app,'reader.html'),'utf8');
const base=(meta,body,css)=>'<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+metadata(meta)+'<link rel="stylesheet" href="'+css+'"></head><body><main class="catalog">'+body+'</main></body></html>';
try{
  const assets=join(stage,'app');await mkdir(assets);
  for(const f of ['reader.js','style.css','map.js','map.css','catalog.css','social-card.png'])await cp(join(app,f),join(assets,f));
  await writeFile(join(assets,'land.js'),'window.ATLAS_LAND='+await readFile(join(app,'land.json'),'utf8')+';\n');
  const cards=[];
  for(const {c,events,geo,dir} of packs){
    const dest=join(stage,c.id);await mkdir(dest);
    const meta={title:c.title+' · '+site.name,description:c.description,path:c.id+'/',draft:c.status==='draft'||!events.length};
    cards.push('<a class="card" href="'+c.id+'/index.html"><small>'+escape(c.subject)+' · '+escape(c.years)+'</small><h2>'+escape(c.title)+'</h2><p>'+escape(c.description)+'</p><b>'+(events.length?c.chapters.length+' 章 · '+events.length+' 個事件':'編輯中')+'</b></a>');
    if(!events.length){
      await writeFile(join(dest,'index.html'),base(meta,'<a href="../index.html">時期目錄</a><h1>'+escape(c.title)+'</h1><p>教材草稿。請在 eras/'+escape(c.id)+'/ 填寫第一筆事件後重新建置。</p>','../app/catalog.css'));continue;
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
    const html=template.replace(/\{\{(\w+)\}\}/g,(_,key)=>key==='metadata'?metadata(meta):key==='scripts'?scripts.map(s=>'<script src="'+s+'"></script>').join('\n  '):escape(c[key]));
    await writeFile(join(dest,'index.html'),html);
  }
  await writeFile(join(stage,'index.html'),base({title:site.title,description:site.description,verify:true},'<header><p>互動歷史地圖</p><h1>時序地圖集</h1><p class="intro">用繁體中文互動地圖與時間軸探索歷史。選擇主題，逐步觀察各國立場、事件因果與地理變化，對照附有史料來源的解說，適合自學與課堂探索。</p></header><div class="cards">'+cards.join('')+'</div>','app/catalog.css'));
  await writeFile(join(stage,'sitemap.xml'),sitemap(['',...packs.filter(p=>p.events.length&&p.c.status!=='draft').map(p=>p.c.id+'/')]));
  await rm(output,{recursive:true,force:true});await rename(stage,output);
  console.log(packs.map(p=>p.c.title+' · '+p.events.length+' 個事件').join('\n'));
}finally{await rm(stage,{recursive:true,force:true});}
