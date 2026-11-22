# 搜尋與分享設定

正式網址為 https://grapycalpis.github.io/historical-atlas/ 。網站首頁與兩套已發布教材都有獨立標題、摘要、canonical、Open Graph 與大型分享卡片標記。它們在建置時直接寫入 HTML，不依賴瀏覽器執行 JavaScript。

## 修改設定

- `app/site.json`：正式網址、網站名稱、首頁搜尋標題與摘要、分享圖片位置、圖片替代文字、Google 驗證標記。
- `eras/<時期>/edition.json`：各教材的標題與摘要；建置時自動產生該頁的分享資訊與標準網址。
- `app/social-card.png`：1200 × 630 PNG 分享封面，沿用本站配色及 Natural Earth 公共領域自然陸地資料。封面不是歷史疆界圖。
- `tools/render-social-card.swift`：分享封面的可編輯來源。在 macOS 的專案根目錄執行 `swift tools/render-social-card.swift` 可重新產圖。PNG 已納入 Git，日常建置與 GitHub Actions 不需要 Swift。

`npm run build` 會自動產生 `site/sitemap.xml`，列入首頁與已發布教材的標準網址，排除空白稿及標記為 `draft` 的教材。草稿另有 `noindex, follow`。sitemap 不包含互動事件的 `#` 網址；可被搜尋的事件導讀頁屬後續內容工作。

`/index.html` 與各教材的 `/index.html` 仍可直接開啟，以保留離線閱讀。canonical 與 sitemap 統一指向對應的尾斜線網址。

## Google Search Console

使用 **網址前置字元**資源：`https://grapycalpis.github.io/historical-atlas/`。不要嘗試驗證不屬於本站的整個 `github.io` 網域。

1. 開啟 [Search Console](https://search.google.com/search-console)，登入管理這個網站的 Google 帳號。
2. 新增上述網址前置字元，選擇「HTML 標記」驗證方式。
3. 將 Google 提供的 `content` 值放入 `app/site.json` 的 `googleSiteVerification`，提交並推送到 `main`。保留此值以維持所有權驗證。
4. 確認部署完成，回到 Search Console 按「驗證」。
5. 在「Sitemap」提交 `https://grapycalpis.github.io/historical-atlas/sitemap.xml`。
6. 使用「網址審查」檢查首頁與教材，之後觀察「成效」中的曝光、點擊與搜尋字詞，以及「網頁」中的索引狀態。

驗證標記是 Google 要求公開在網頁上的識別值，不是登入憑證。複製此專案到其他網址時，請更換正式網址、移除原驗證標記並使用自己的 Google 驗證值；也請同步更新分享封面底部的網址。

GitHub Pages 專案的 `robots.txt` 必須位於主機根目錄才有效，放在 `/historical-atlas/robots.txt` 不會控制爬取。本專案透過 Search Console 直接提交 sitemap，沒有加入無效的子目錄 robots 檔案。

設定完成不表示已被 Google 收錄；以 Search Console 顯示的抓取與索引結果為準。分享平台可能快取舊預覽，部署後仍需等待平台重新抓取。

參考：[Google canonical 說明](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[建立與提交 sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)、[所有權驗證](https://support.google.com/webmasters/answer/9008080)、[Open Graph](https://ogp.me/)。
