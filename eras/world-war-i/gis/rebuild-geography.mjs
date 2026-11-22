// Optional developer utility. Node 20+, network access; run from any working directory.
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import { addEditorialLayers, prepare, serialize } from './geography.mjs';
import clip from 'polygon-clipping';

const manifest=JSON.parse(await readFile(new URL('./gis-inputs.json',import.meta.url),'utf8'));
async function get({repo,ref,path,blob}) {
  const url='https://raw.githubusercontent.com/'+[repo,ref,path].join('/');
  const response=await fetch(url);
  if(!response.ok) throw Error(response.status+' '+path);
  const bytes=Buffer.from(await response.arrayBuffer());
  const hash=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
  if(hash!==blob) throw Error('Git blob verification failed for '+path);
  return bytes;
}
const [earlyBytes,landBytes]=await Promise.all([get(manifest.early),get(manifest.land)]);
const early=JSON.parse(gunzipSync(earlyBytes)),land=JSON.parse(landBytes),late=[];
// Modest batch size bounds concurrent I/O; inserting each batch in manifest order
// keeps records and the resulting file reproducible.
for(let i=0;i<manifest.late.files.length;i+=5) {
  const files=manifest.late.files.slice(i,i+5);
  const chunk=await Promise.all(files.map(async ([file,blob])=>JSON.parse(await get({
    ...manifest.late,path:manifest.late.directory+'/'+file,blob
  }))));
  late.push(...chunk);
}
const atlas=addEditorialLayers(prepare(early,late,land),early,clip);
await writeFile(new URL('./geo.js',import.meta.url),serialize(atlas));
