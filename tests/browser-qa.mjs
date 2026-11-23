// Optional real-browser QA. Supply a local Playwright module and Chrome binary when not installed.
// ATLAS_PLAYWRIGHT_PATH=/absolute/path/to/playwright/index.mjs ATLAS_CHROME_PATH=/path/to/chrome node tests/browser-qa.mjs
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const modulePath=process.env.ATLAS_PLAYWRIGHT_PATH;
const {chromium}=await import(modulePath?pathToFileURL(modulePath).href:'playwright');
const browser=await chromium.launch({headless:true,...(process.env.ATLAS_CHROME_PATH?{executablePath:process.env.ATLAS_CHROME_PATH}:{})});
const root=process.cwd(),output=process.env.ATLAS_QA_OUTPUT||join(tmpdir(),'historical-atlas-qa');
await mkdir(output,{recursive:true});
const url=path=>pathToFileURL(join(root,path)).href;
const errors=[];
try{
  for(const width of [1440,540,375]){
    const page=await browser.newPage({viewport:{width,height:1000}});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(url('site/index.html'));
    await page.locator('a[href="world-war-ii/index.html"]').click();
    await page.locator('.eventTitle').waitFor();
    assert.equal(await page.locator('#theaterControls').isVisible(),true);
    assert.equal(await page.locator('#view').inputValue(),'world');
    assert(await page.locator('.eventTitle').innerText().then(t=>t.includes('波蘭')));
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow');
    await page.screenshot({path:join(output,`world-${width}.png`),fullPage:true});
    // Direct chapter navigation, including scrollable chapters 9 and 10.
    for(let ch=0;ch<10;ch++){
      await page.locator(`[data-ch="${ch}"]`).click();
      assert.equal(await page.locator('#chapters .active').getAttribute('data-ch'),String(ch));
    }
    // Same-day ordering at the critical surrender sequence.
    await page.goto(url('site/world-war-ii/index.html')+'#aug09a-soviet-offensive');
    await page.locator('#next').click();assert(await page.locator('.eventTitle').innerText().then(t=>t.includes('長崎')));
    await page.locator('#prev').click();assert(await page.locator('.eventTitle').innerText().then(t=>t.includes('滿洲')));
    // A cross-theater causal jump must clear the incompatible filter.
    await page.goto(url('site/world-war-ii/index.html')+'#germany-us');
    await page.selectOption('#theater','west');await page.locator('#quickCause').click();
    assert((await page.locator('#dlgBody').innerText()).includes('促成條件'));
    await page.locator('#dlgBody [data-event="pearl-harbor"]').click();
    assert.equal(await page.locator('#theater').inputValue(),'all');
    assert(await page.locator('.eventTitle').innerText().then(t=>t.includes('珍珠港')));
    await page.selectOption('#theater','pacific');await page.locator('#next').click();
    assert(await page.locator('.eventTitle').innerText().then(t=>t.includes('菲律賓')));
    await page.locator('#clearTheater').click();assert.equal(await page.locator('#theater').inputValue(),'all');
    // Date-line route, explicit theater view, resize, actual zoom and pointer pan.
    await page.goto(url('site/world-war-ii/index.html')+'#saipan');await page.selectOption('#view','theater:pacific');
    const route=await page.locator('#map .map-operation').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('d')));
    assert.equal(route.length,3);
    for(const d of route){const n=d.match(/-?\d+(?:\.\d+)?/g).map(Number);const mw=await page.locator('#map').evaluate(e=>e.clientWidth);assert(Math.abs(n[2]-n[0])<mw*.5);}
    await page.screenshot({path:join(output,`pacific-${width}.png`),fullPage:true});
    const before=await page.locator('#map .map-operation').nth(1).getAttribute('d');
    await page.locator('[data-zoom="1.35"]').click();assert.notEqual(await page.locator('#map .map-operation').nth(1).getAttribute('d'),before);
    await page.locator('[data-zoom="0"]').click();assert.equal(await page.locator('#map .map-operation').nth(1).getAttribute('d'),before);
    const box=await page.locator('#map').boundingBox();
    await page.mouse.move(box.x+box.width*.4,box.y+box.height*.7);await page.mouse.down();await page.mouse.move(box.x+box.width*.4+35,box.y+box.height*.7+20,{steps:5});await page.mouse.up();
    assert.notEqual(await page.locator('#map .map-operation').nth(1).getAttribute('d'),before);
    await page.locator('[data-zoom="0"]').click();
    for(const view of ['world','theater','focus','theater:africa'])await page.selectOption('#view',view);
    assert((await page.locator('#map').innerText()).includes('目前事件在此視野外'));
    assert.equal(await page.locator('#map path').evaluateAll(p=>p.some(n=>/NaN|Infinity/.test(n.getAttribute('d')||''))),false);
    // Reset is available through help on mobile, where the rail reset is intentionally hidden.
    await page.locator('#helpOpen').click();await page.locator('#helpReset').click();
    assert.equal(await page.locator('#view').inputValue(),'world');
    await page.locator('#compareOpen').click();
    assert.equal(await page.locator('#selA').inputValue(),'poland');assert.equal(await page.locator('#selB').inputValue(),'japan-formal-surrender');
    assert(await page.locator('#noteB').innerText().then(t=>t.includes('9 日')));
    await page.screenshot({path:join(output,`compare-${width}.png`),fullPage:true});
    await page.selectOption('#selA','ve-day');assert(await page.locator('#noteA').innerText().then(t=>t.includes('沖繩')));await page.locator('#dlgClose').click();
    await page.locator('#helpOpen').click();await page.locator('[data-compare="2"]').click();
    assert.equal(await page.locator('#selA').inputValue(),'midway');assert.equal(await page.locator('#selB').inputValue(),'leyte');await page.locator('#dlgClose').click();
    await page.locator('#sourceOpen').click();await page.selectOption('#sourceCh','9');assert(await page.locator('#sourceList a').count()>10);await page.locator('#dlgClose').click();
    await page.close();console.log(`PASS Chrome ${width}px: catalog, chapters, same-day, filters, causal jump, date line, pan, zoom, presets, compare and reset`);
  }
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const era of ['world-war-i','german-reunification','french-revolution','american-revolution','cuban-missile-crisis','korean-war']){
    await page.goto(url(`site/${era}/index.html`));await page.locator('.eventTitle').waitFor();const before=await page.locator('.eventTitle').innerText();
    await page.locator('#next').click();assert.notEqual(await page.locator('.eventTitle').innerText(),before);
    await page.locator('#compareOpen').click();assert.equal(await page.locator('.cmpMap svg').count(),2);await page.locator('#dlgClose').click();
  }
  console.log('PASS Chrome: all six existing editions advance and compare');
  await page.context().setOffline(true);await page.goto(url('exports/world-war-ii.html'));
  await page.locator('.eventTitle').waitFor();assert.equal(await page.locator('script[src],link[rel="stylesheet"]').count(),0);
  await page.selectOption('#view','theater:pacific');await page.locator('#compareOpen').click();assert.equal(await page.locator('.cmpMap svg').count(),2);
  console.log('PASS Chrome: standalone export opens and compares with network offline');
  assert.deepEqual(errors,[]);console.log('No browser JavaScript errors. Screenshots: '+output);
}finally{await browser.close();}
