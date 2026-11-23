# 新增歷史時期

以 `eras/german-reunification/` 的 4 章、24 事件教材為通用地圖範例。用 `npm run new-era -- <英文代號> "中文名稱"` 建立空白資料夾，編輯以下三個檔案。一般歷史時期可直接使用通用地圖；一戰較複雜的七月危機、戰線與陣營判斷採用該時期自己的地圖程式。

## 1. 定義教材

`edition.json` 管顯示名稱、年份、章節、參與方、圖例與閱讀起點。bounds 採西、南、東、北四個經緯度。chapters 的每一列依序為短章號、標題與時間文字。events 的 chapter 從 1 起算。

`initial` 是第一次開啟時的事件 ID，`baseline` 是重設事件，`compare` 是重設點的比較對照。沒有設定可填 null，閱讀器會使用第一筆事件或末筆作預設。事件分檔後，將相對檔名列入 eventFiles。空白稿在目錄顯示「編輯中」，不會出現其他時期的事件。完成後可移除 `"status": "draft"`。

## 2. 編寫時序與因果

`events.json` 使用 JSON 陣列。每筆記錄的可運作範例見 [德國統一教材](../eras/german-reunification/events.json)。

| 欄位 | 填法 |
| --- | --- |
| id、chapter、date、title | 本時期內唯一的英文代號、章節數字、西曆 YYYY-MM-DD、事件名稱 |
| place、point、actors、type | 地名、[經度, 緯度]、參與方代號、事件類型 |
| summary | 白話交代發生了什麼，讓初學者能辨認行動各方 |
| background、trigger、motives、impact | 背景、直接原因、決策者動機及後續影響 |
| debate、primary、counterfactual | 學界解讀、可對讀的原始資料，以及有條件的假設 |
| causes、edges、mapNote | 引用先前事件 ID；外交關係為 [起點, 終點, 類型]；用圖說交代位置與限制 |
| theaters（選用） | edition.theaters 中一個或多個代號；跨戰區事件可同時出現在各組篩選中 |
| causalLinks（選用） | 每條 causes 對應 event、kind、explanation、sources；分類及來源格式見下文 |
| sources | 來源清單，每筆為 [顯示名稱, 原始網址] |

支援的類型為 politics、peace、territory、tension、support、alliance、mobilize、ultimatum、declare、attack、battle、front。政權變更或多方簽約可留空 edges。若史料能支持進攻方向或戰線，可另填 overlays，形如 `{"type":"front","points":[[經度,緯度],[經度,緯度]],"label":"具體戰區與時點","source":"史料網址"}`。在 edition.layers 加入 `"overlays": ["行動與戰線","圖例解說"]` 即可開關。

本版按全球日期、ID 排序，章節不優先於日期。上一／下一事件可跨章；同日順序用可排序的 ID，例如 d01、d02，不能視為跨時區的精確時刻順序。causes 必須指向排列在前、已發生的事件，不能只因相鄰便宣稱因果。同時在 sources 記下不同史家如何判讀爭議日期。只知道年份或月份時，不宜把推測的某日當作確證；現有日級時間軸面向西元紀年的近現代史，年代精度或曆法不同的教材應先擴充日期模型。

需要明示證據時，加入 `"causalLinks": [{"event":"前因 ID","kind":"enabling","explanation":"如何改變當時選擇，以及限制","sources":["同筆 sources 內的網址"]}]`。kind 為 direct（直接原因）、enabling（促成條件）、context（共同背景）、consequence（後續影響）。使用此欄位時須完整涵蓋 causes，閱讀器在前因與後果視窗顯示分類、解釋及來源。

## 3. 填寫當時的地理

`geography.json` 的 actors 包含參與方點位、按日期排列的 states。每段起始日 from 包含當天，可選的 until 不包含結束當天。stance 與 relations 用於國家面板。可選 name 覆寫該日顯示名稱；sources 保存身分證據。可以用 color 表示有來源的政區配色；已消失的政權可保留解說並設 `"showLabel": false`。在 edition.names 提供預設名稱。固定的檔案入口點不等於各日首都或部隊位置，應在製圖說明交代。

boundaries 接受按有效起日排序的歷史截面，每筆有 from、可選 until、source、features。features 是 WGS84 GeoJSON Polygon 或 MultiPolygon，各有 properties.code。讀取器選用涵蓋事件日的最近截面。沒有合適資料時填空陣列，保留自然陸地輪廓與事件點，並在 edition.mapNote 說明缺口。有邊界時請把來源、改作與授權加入 mapSources，並在 edition.layers 加上 `"borders": ["歷史國界","來源年代與線型說明"]`。

通用圖層還有 names（參與方）、places（較早事件）與 relations（當次外交關係）。外交關係畫虛線；具體行動使用 overlays 座標實線，不能把首都連線當成作戰路線。軍事占領面、具體作戰路線與法理疆界需要各自的史料。全球教材的 overlays 另須 from、until（右界不含）、precision、license，且 source 必須列於當筆 sources。例見二戰塞班事件；其路線只是有文獻依據的基地間運送方向，未宣稱精確航跡。

共用 `app/atlas-core.js` 處理日期、篩選和經度展開。通用地圖支援跨換日線的區域視野：bounds 的西界大於東界時跨越 180°，例如 `[110,-48,-120,56]` 是寬 130° 的太平洋範圍。點位使用 WGS84 正負 180°；路線按相鄰節點展開，避免夏威夷到西太平洋繞過整張世界圖。自然陸塊也處理極區封閉接縫。這是經緯投影，不能量測精確距離或面積。一戰自訂渲染器仍使用 drawAtlasMap、atlasCountry、atlasZoom。

在 edition 新增 `theaters: {"pacific":{"label":"太平洋","bounds":[110,-48,-120,56]}}`，即可啟用戰區篩選、返回完整時間軸、事件戰區標示及視野選單。篩選保留全球順序；因果或地圖跳到篩選外事件時自動回完整時間軸。可選 defaultView 為 world、region、focus、theater 或 theater:代號。`initialLayers: {"names":false}` 可避免首次開啟時大量名稱遮住地圖。

`defaultComparison: true` 可令預設 A 使用 baseline、基準點的 B 使用 compare。`comparisonTasks: [{"title":"任務","prompt":"比較問題","a":"事件 ID","b":"事件 ID"}]` 在使用指南提供直接比較按鈕；事件可用 comparison 補上該時點的跨戰區摘要。比較圖仍須誠實交代缺少哪些歷史邊界或控制資料。

## 4. 驗證與閱讀

執行 `npm test`，打開 `site/index.html`，選新時期。至少試一次同日推進、事件因果跳轉、比較與回到基準。單獨交付教材可執行 `npm run export -- <英文代號>`。Git 追蹤教材、必要閱讀器修改、測試及查核文件；site/、exports/ 為可重建產物。

有本機 Playwright／Chrome 時可執行 `node tests/browser-qa.mjs`，或設定 ATLAS_PLAYWRIGHT_PATH、ATLAS_CHROME_PATH 指向既有安裝；不需要新增 npm 依賴。這個選用的真實瀏覽器檢查涵蓋二戰三種寬度、其他六套教材與斷網單檔，不取代人工史料判讀。

## 可貼給 Codex 的任務

> 請在這個 historical-atlas repo 新增「【時期名稱】」，代號為【英文代號】，範圍是【起訖年代與地區】。先讀 README.md、docs/NEW-ERA.md 和德國統一教材的三個 JSON 檔，以 new-era 建立新教材。沿用現有閱讀器、三層解說、因果連結與雙時點比較。依可靠史料製作時間軸，查核關鍵日期、主體、疆界有效日及授權，每筆保留來源。缺乏歷史界線時用自然底圖和標明精度的點位。完成後執行 npm test、匯出單檔 HTML，列出資料限制與驗證結果。
