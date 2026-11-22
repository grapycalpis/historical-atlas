# 新增歷史時期

以 `eras/german-reunification/` 為可運作的短篇範例。用 `npm run new-era -- <英文代號> "中文名稱"` 建立空白資料夾，編輯以下三個檔案。一般歷史時期可直接使用通用地圖；一戰較複雜的七月危機、戰線與陣營判斷採用該時期自己的地圖程式。

## 1. 定義教材

`edition.json` 管顯示名稱、年份、章節、參與方、圖例與閱讀起點。bounds 採西、南、東、北四個經緯度。chapters 的每一列依序為短章號、標題與時間文字。events 的 chapter 從 1 起算。

`initial` 是第一次開啟時的事件 ID，`baseline` 是重設事件，`compare` 是重設點的比較對照。沒有設定可填 null，閱讀器會使用第一筆事件或末筆作預設。事件分檔後，將相對檔名列入 eventFiles。空白稿在目錄顯示「編輯中」，不會出現其他時期的事件。完成後可移除 `"status": "draft"`。

## 2. 編寫時序與因果

`events.json` 使用 JSON 陣列。每筆記錄的可運作範例見 [柏林短篇](../eras/german-reunification/events.json)。

| 欄位 | 填法 |
| --- | --- |
| id、chapter、date、title | 本時期內唯一的英文代號、章節數字、西曆 YYYY-MM-DD、事件名稱 |
| place、point、actors、type | 地名、[經度, 緯度]、參與方代號、事件類型 |
| summary | 白話交代發生了什麼，讓初學者能辨認行動各方 |
| background、trigger、motives、impact | 背景、直接原因、決策者動機及後續影響 |
| debate、primary、counterfactual | 學界解讀、可對讀的原始資料，以及有條件的假設 |
| causes、edges、mapNote | 引用先前事件 ID；關係為 [起點, 終點, 類型]；用圖說交代位置與限制 |
| sources | 來源清單，每筆為 [顯示名稱, 原始網址] |

支援的類型為 politics、peace、territory、tension、support、alliance、mobilize、ultimatum、declare、attack、battle、front。政權變更或多方簽約可留空 edges。若史料能支持進攻方向或戰線，可另填 overlays，形如 `{"type":"front","points":[[經度,緯度],[經度,緯度]],"label":"具體戰區與時點","source":"史料網址"}`。在 edition.layers 加入 `"overlays": ["行動與戰線","圖例解說"]` 即可開關。

本版按章、日期、ID 排序。同日有先後的事件請用可排序的 ID，例如 d01、d02。causes 必須指向已發生的事件。同時在 sources 記下不同史家如何判讀爭議日期。只知道年份或月份時，不宜把推測的某日當作確證；現有日級時間軸面向西元紀年的近現代史，年代精度或曆法不同的教材應先擴充日期模型。

## 3. 填寫當時的地理

`geography.json` 的 actors 包含參與方點位、按日期排列的 states。每段起始日 from 包含當天，可選的 until 不包含結束當天。stance 與 relations 用於國家面板。可以用 color 表示有來源的政區配色；已消失的政權可保留解說並設 `"showLabel": false`。在 edition.names 提供顯示名稱。

boundaries 接受按有效起日排序的歷史截面，每筆有 from、可選 until、source、features。features 是 WGS84 GeoJSON Polygon 或 MultiPolygon，各有 properties.code。讀取器選用涵蓋事件日的最近截面。沒有合適資料時填空陣列，保留自然陸地輪廓與事件點，並在 edition.mapNote 說明缺口。有邊界時請把來源、改作與授權加入 mapSources，並在 edition.layers 加上 `"borders": ["歷史國界","來源年代與線型說明"]`。

通用圖層還有 names（參與方）、places（較早事件）與 relations（當次外交關係）。版面與操作來自 app。軍事占領面、具體作戰路線與法理疆界需要各自的史料。通用地圖以經緯度定位，尚未處理跨換日線的區域視野。進階教材可參考一戰自訂渲染器，其入口為 drawAtlasMap、atlasCountry、atlasZoom。

## 4. 驗證與閱讀

執行 `npm test`，打開 `site/index.html`，選新時期。至少試一次同日推進、事件因果跳轉、比較與回到基準。單獨交付教材可執行 `npm run export -- <英文代號>`。Git 提交時追蹤 eras 內的資料即可。

## 可貼給 Codex 的任務

> 請在這個 historical-atlas repo 新增「【時期名稱】」，代號為【英文代號】，範圍是【起訖年代與地區】。先讀 README.md、docs/NEW-ERA.md 和德國統一短篇的三個 JSON 檔，以 new-era 建立新教材。沿用現有閱讀器、三層解說、因果連結與雙時點比較。依可靠史料製作時間軸，查核關鍵日期、主體、疆界有效日及授權，每筆保留來源。缺乏歷史界線時用自然底圖和標明精度的點位。完成後執行 npm test、匯出單檔 HTML，列出資料限制與驗證結果。
