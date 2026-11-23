# 時序地圖集 · Historical Atlas

在同一張地圖上前進一個事件，觀察地點、國家立場與解說一起改變。每個歷史時期由獨立教材提供，共用時間軸、章節導覽、三層解說、史料索引、因果跳轉與雙時點比較。

| 目前可讀 | 時間範圍 | 內容 |
| --- | --- | --- |
| 法國大革命：從三級會議到霧月政變 | 1789–1799 | 6 章、36 個事件。從代表權、糧食與地方反應，追到共和、恐怖統治與軍事政變；對照 1789 年改革訴求與 1799 年權力結構。 |
| 美國獨立革命：從殖民地抗爭到國際承認 | 1773–1783 | 5 章、30 個事件。區分獨立決議、宣言、軍隊投降與和約承認，納入效忠派、原住民族及被奴役者。 |
| 第一次世界大戰 | 1871–1919 | 6 章、79 個事件。從塞拉耶佛暗殺開始，七月危機可逐步閱讀 22 個決策。 |
| 古巴飛彈危機 | 1962.10.14–11.20 | 4 章、24 個事件。分辨拍照、情報確認與總統獲報，比較隔離生效與撤彈承諾，追蹤古巴安全及土耳其秘密安排。 |
| 從柏林圍牆到德國統一 | 1989–1990 | 4 章、24 個事件。串連出走與抗議、自由選舉、兩德協商及國際條件，對照關卡開放與統一生效。 |

## 線上閱讀與自動部署

網站入口：**[時序地圖集](https://grapycalpis.github.io/historical-atlas/)**。從首頁選擇歷史時期，再進入互動地圖與時間軸；閱讀器上方的「時期目錄」可回到首頁。

本專案透過 GitHub Actions 部署到 GitHub Pages：每次推送到 `main`，先執行 `npm test` 建置並檢查教材，再將 `site/` 產物發布。測試失敗時不會部署；其他分支與 pull request 只執行檢查。新增時期也會在建置時自動加入首頁。

首次設定或複製此 repo 時：

1. 在儲存庫 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
2. 推送到 `main`，或在 **Actions → 教材檢查與 GitHub Pages 部署 → Run workflow** 選擇 `main` 手動執行。
3. 等待「建置與測試」及「發布 GitHub Pages」成功，從部署結果開啟網站。

GitHub Free 可對公開 repo 使用 Pages；私有 repo 需要支援 Pages 的付費方案。複製到其他帳號或改名後，請同步修改本 README 的網站入口；頁面與資源使用相對路徑，可沿用 `https://OWNER.github.io/REPO/` 的專案網址。

首頁與教材已加入搜尋摘要、標準網址及社群分享卡片；[sitemap](https://grapycalpis.github.io/historical-atlas/sitemap.xml) 隨建置自動更新。正式網址及 Google 驗證標記統一放在 `app/site.json`；換帳號或 repo 名稱時請一起更新。[搜尋設定、分享封面與 Search Console 操作](docs/SEO.md)。

## 直接開啟

下載 ZIP 後請先**完整解壓縮**，雙擊 [site/index.html](site/index.html) 選擇時期。五套教材與底圖可離線操作，點擊外部史料才需要連線。ZIP 另附可單獨攜帶的 `exports/world-war-i.html`。

若從 GitHub 複製原始碼，在專案根目錄執行 `npm run build` 即可產生相同的入口。一般建置與測試只需要 Node.js 20 以上及 npm，沒有需要安裝的 npm 依賴。

## 把這個專案放上 GitHub

下載包內含已初始化的 Git 專案與第一筆提交，分支為 `main`。解壓後在 Terminal 切換到含有本 README 的資料夾。若使用 GitHub CLI，可先用 `gh auth status` 確認登入，再執行：

```sh
gh repo create historical-atlas --private --source=. --remote=origin --push
```

此指令會在目前登入的帳號下建立**私有**儲存庫並推送。若該帳號已使用這個名稱，可替換第一個參數。若你已在 GitHub 網頁建立一個空 repo，改用以下兩行，將 OWNER 換成自己的帳號：

```sh
git remote add origin https://github.com/OWNER/historical-atlas.git
git push -u origin main
```

`site/` 與 `exports/` 是可重建的產物，已列入 .gitignore。Git 追蹤教材、地圖資料、模板、測試與建置工具。每次 push 或 pull request 都會觸發 GitHub Actions 執行測試，推送到 `main` 時另會自動發布網站，不需要提交建置產物。

## 下一個時期

例如要製作「明治維新」：

```sh
npm run new-era -- meiji-restoration "明治維新"
```

這會建立 `eras/meiji-restoration/`。填寫章節、事件與地理資料後執行 `npm test`，即可在時期目錄中進入新教材。資料夾若已存在，指令會停止以保留現有內容。完整的欄位範例與給 Codex 的任務文字見 [新增時期指南](docs/NEW-ERA.md)。

## 日常指令

| 指令 | 用途 |
| --- | --- |
| `npm run build` | 掃描 eras、驗證資料並重建離線網站 |
| `npm test` | 建置、歷史地理核對、互動及新增時期回歸測試 |
| `npm run export -- world-war-i` | 匯出單檔 HTML 至 exports/，可自行替換時期 ID |

## 修改的位置

| 位置 | 負責內容 |
| --- | --- |
| app/ | 共用版面、按鈕、播放器、解說與通用地圖 |
| eras/world-war-i/ | 一戰的分章 JSON、已查核的 GIS、專用地圖與外交規則 |
| eras/cuban-missile-crisis/ | 4 章、24 事件教材，區分公開與秘密資訊，使用自然底圖及近似點位 |
| eras/german-reunification/ | 4 章、24 事件教材，使用通用地圖與分時參與方身分 |
| eras/american-revolution/ | 5 章、30 事件教材；1773／1783 身分比較、近似點位與分時參與方 |
| eras/french-revolution/ | 6 章、36 事件教材；女性、農民、糧食與殖民地，1789／1799 權力比較 |
| templates/era/ | 空白教材骨架，供 new-era 複製 |
| tools/、tests/ | 編譯、單檔匯出、資料規則與回歸測試 |

## 史料與授權

一戰地理資料使用 CShapes-Europe、CShapes 2.0 及 Natural Earth。[完整出處、修改與精度說明](eras/world-war-i/gis/GIS.md)。一戰的衍生政治邊界維持 CC BY-NC-SA 4.0。共用自然陸塊 `app/land.json` 為 Natural Earth 1:110m Land 的簡化資料，屬公共領域。[Natural Earth 使用條款](https://www.naturalearthdata.com/about/terms-of-use/)。

德國統一教材用近似地點表示事件，並在地圖上明示缺少當時的政治邊界；其史料包含博物館、檔案文件、大學及兩德／兩加四條約原文；查核差異與地圖限制見 [教材查核記錄](eras/german-reunification/RESEARCH.md)。每一筆事件都保留可點擊來源。新增其他時期時應在教材內填寫其獨立的來源、地圖年代與授權。專案未為自撰程式另選開源授權。

古巴飛彈危機教材以公開演說、總統公告、解密會議及美蘇古信件對讀，日期差異、資訊層次與製圖限制見 [教材查核記錄](eras/cuban-missile-crisis/RESEARCH.md)。未繪缺乏可靠座標及授權的隔離線、艦位、航線或歷史政治疆界。

美國獨立革命教材使用檔案館原件、大學及博物館史料，分開獨立決議、宣言文字通過、軍隊投降、和約簽署與批准。日期差異、原始資料取得程度、地圖限制與驗證結果見 [教材查核記錄](eras/american-revolution/RESEARCH.md)。未繪未完成來源、有效日期及授權查核的殖民地疆界、占領面或行軍航線。

法國大革命教材以法國國民議會、凡爾賽宮、里昂檔案館、大學原始文件與殖民地研究對讀，區分改革、政治派別與暴力事件，革命曆換算為西曆並附原日期。[教材查核記錄](eras/french-revolution/RESEARCH.md)交代爭議與來源取得程度；地圖只用自然底圖和近似點位，未繪歷史疆界、占領面、戰線或行動路線。
