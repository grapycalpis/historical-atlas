import {readFile} from 'node:fs/promises';

export const site=JSON.parse(await readFile(new URL('../app/site.json',import.meta.url),'utf8'));
const base=new URL(site.url);
if(base.protocol!=='https:'||base.search||base.hash||!base.pathname.endsWith('/')){
  throw Error('app/site.json url must be an absolute HTTPS URL ending in / without a query or fragment');
}
export const escape=v=>String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export const canonical=(path='')=>new URL(path,base).href;

export function metadata({title,description,path='',draft=false,verify=false}){
  const meta=(key,value,property=false)=>'<meta '+(property?'property':'name')+'="'+key+'" content="'+escape(value)+'">';
  return [
    '<title>'+escape(title)+'</title>',
    meta('description',description),
    meta('theme-color','#173f3c'),
    '<link rel="canonical" href="'+escape(canonical(path))+'">',
    ...(draft?[meta('robots','noindex, follow')]:[]),
    ...(verify&&site.googleSiteVerification?[meta('google-site-verification',site.googleSiteVerification)]:[]),
    ...Object.entries({type:'website',site_name:site.name,locale:'zh_TW',title,description,url:canonical(path),image:canonical(site.image),'image:type':'image/png','image:width':'1200','image:height':'630','image:alt':site.imageAlt}).map(([key,value])=>meta('og:'+key,value,true)),
    ...Object.entries({card:'summary_large_image',title,description,image:canonical(site.image),'image:alt':site.imageAlt}).map(([key,value])=>meta('twitter:'+key,value))
  ].join('\n  ');
}

export function sitemap(paths){
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+paths.map(path=>'  <url><loc>'+escape(canonical(path))+'</loc></url>').join('\n')+'\n</urlset>\n';
}
