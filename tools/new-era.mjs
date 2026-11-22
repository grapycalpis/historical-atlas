import {mkdir,cp,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {root,json,slugOK} from './editions.mjs';
const [slug,title,...other]=process.argv.slice(2);
if(!slugOK(slug)||!title?.trim()||other.length){console.error('用法：npm run new-era -- meiji-restoration "明治維新"');process.exit(1);}
const dest=join(root,'eras',slug),source=join(root,'templates/era');
try{await mkdir(dest);}catch(e){if(e.code==='EEXIST'){console.error('該時期資料夾已存在：'+slug);process.exit(1);}throw e;}
try{
  await cp(source,dest,{recursive:true});
  const c=await json(join(dest,'edition.json'));c.id=slug;c.title=title;
  await writeFile(join(dest,'edition.json'),JSON.stringify(c,null,2)+'\n');
}catch(e){await rm(dest,{recursive:true,force:true});throw e;}
console.log('已建立 eras/'+slug+'。編輯 edition.json、events.json、geography.json 後執行 npm run build。');
