// Export one compiled edition for offline reading. Run build first (npm run export does this).
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {root,slugOK} from './editions.mjs';
const [slug,...extra]=process.argv.slice(2);
if(!slugOK(slug)||extra.length)throw Error('用法：npm run export -- world-war-i');
const dir=join(root,'site',slug);
let html=await readFile(join(dir,'index.html'),'utf8');
for(const [tag,file] of [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]){
  const css=await readFile(resolve(dir,file),'utf8');html=html.replace(tag,()=>'<style>'+css+'</style>');
}
for(const [tag,file] of [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]){
  const js=await readFile(resolve(dir,file),'utf8');html=html.replace(tag,()=>'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>');
}
html=html.replace(/<a[^>]*href="\.\.\/index\.html"[^>]*>時期目錄<\/a>/g,'');
await mkdir(join(root,'exports'),{recursive:true});
await writeFile(join(root,'exports',slug+'.html'),html);
console.log('已匯出 exports/'+slug+'.html');
