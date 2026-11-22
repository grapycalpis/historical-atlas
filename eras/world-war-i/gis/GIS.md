# 歷史地理資料與版本

1871–1919 年的政治面取自 ETH Zürich 的 CShapes 系列。目前包含 202 筆有效期間紀錄，合成 81 個可供事件查詢的變更日期。某次更新可能只影響遙遠的屬地。相鄰日期若使用相同的國界，資料庫仍可在兩日間顯示不同的事件、決策及軍事箭頭。

| 資料 | 在地圖上的用途 | 時間精度 |
| --- | --- | --- |
| CShapes-Europe | 1871–1885 年的歐洲政區、少數微型國和但澤的補充面 | 年度截面。某些獨立或領土變動在隔年的截面才可見 |
| CShapes 2.0，Gleditsch–Ward 編碼 | 1886–1919 年的主要政區、屬地，以及可查明的依附類別 | 來源所記錄的有效首日與末日。部分日期只確定到月或年，原作者以月初或元旦代表 |
| Natural Earth 1:110m Land | 全球陸塊、海岸方向及缺少政治面時的地理定位 | 現代概化陸地輪廓，沒有國界。港灣、河口及小島的歷史海岸線可能不同 |

## 學術來源與使用權

- Schvitz, G., Rüegger, S., Girardin, L., Cederman, L.-E., Weidmann, N., & Gleditsch, K. S. (2022). *Mapping the International System, 1886–2017: The CShapes 2.0 Dataset*. Journal of Conflict Resolution, 66(1), 144–161. [作者資料與下載](https://icr.ethz.ch/data/cshapes/) · [美國國會圖書館典藏記錄](https://www.loc.gov/item/2023592015/) · [編碼說明](https://beta.icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf)
- Cederman, L.-E., Girardin, L., Müller-Crepon, C., & Pengl, Y. (2025). *Nationalism and the Transformation of the State: Border Change and Political Violence in the Modern World.* Cambridge University Press. [CShapes-Europe 研究團隊與下載](https://icr.ethz.ch/data/cshapes/)
- CShapes 兩套資料及本專案由其衍生的政治多邊形均依 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 提供。本站選擇歷史版本、轉換國家名稱、簡化座標、計算兩個歷史領土面的交集或聯集，並保留來源欄位。地理資料僅供非商業使用，散布衍生資料須保留署名及同樣授權。
- Natural Earth 的自然陸塊為公共領域資料。[陸地圖層](https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/) · [使用條款](https://www.naturalearthdata.com/about/terms-of-use/)

## 編輯判斷與局限

- **1871 年的德法邊界**。年度圖已含割讓結果。本專案取 1870 年法國與 1871 年德國歷史面的交集，取得亞爾薩斯－洛林割讓區。初始事件將此面留給法國，自 5 月 10 日法蘭克福最終和約簽署起切換。2 月 26 日的預備和約、5 月的批准及 6 月的德國國內併入程序是分開的法律步驟。貝爾福在兩張圖皆屬法國。這個大陸尺度的交集可辨識割讓區的大形狀。[兩份和約的法律史](https://www.cambridge.org/core/books/abs/peace-treaties-and-international-law-in-european-history/1871-peace-treaty-between-france-and-germany-and-the-1919-peace-treaty-of-versailles/A9DB264EBC904ECA6E1A8A47E7A012A6)
- **波士尼亞與赫塞哥維納**。1878 年柏林會議後，名義主權仍在鄂圖曼，奧匈負責占領與行政。1886 年起兩個研究單元在資料中另列，1908 年併吞後併入奧匈。新聞發表或君主宣告日期和 GIS 生效日可有一天差異。教學可在事件層強調這兩個單元的聯集。[波士尼亞與赫塞哥維納國會](https://www.parlament.ba/Content/Read/179?lang=en&title=Periodaustrougarskevladavine)
- **塞爾維亞與蒙特內哥羅**。來源把兩地在 1915 年各以單一國家名義編為占領區，與多國分區占領和蒙特內哥羅於 1916 年失守的過程不完全相符。本圖保留當時政區外框，將這兩筆的控制方留空。不以原始資料的一個日期推算逐日控制線。[《1914–1918 Online》東南歐占領史](https://encyclopedia.1914-1918-online.net/article/occupation-during-and-after-the-war-south-east-europe/?format=pdf)
- **1918 年帝國解體**。政治宣告、地方委員會成立、軍隊撤退及正式訂界先後交錯。11 月來源有一筆標為匈牙利的臨時面涵蓋塞拉耶佛等前哈布斯堡南斯拉夫地區，本專案特標為匈牙利與南部過渡地區。塞、克、斯王國年底才建立，當時王國與 1929 年起採用的正式國名須分讀。[聯合國前南斯拉夫國際刑事法庭典藏史料](https://icr.icty.org/LegalRef/CMSDocStore/Public/English/Submission/NotIndexable/IT-04-74/MSC6978R0000257036.pdf?mobile-app=true&theme=dark)
- **1919 年與條約效力**。以簽約日編入的重新分界屬條約快照。6 月 28 日出現的但澤輪廓，表示條約規劃的地區；自由市在 1920 年才成立。亞爾薩斯－洛林在條約快照歸法，凡爾賽條約第 51 條將歸還追溯至 1918 年 11 月 11 日停戰之日。1918 年 11 月至 1919 年 6 月的底圖仍顯示研究資料編碼。[凡爾賽條約第 51 條及外交檔案註解](https://history.state.gov/historicaldocuments/frus1919Parisv13/ch12subch5)
- **選繪與空白處**。重點為歐洲，世界視圖只收錄選定的政區與屬地。部分聯合王國、自治領或受宗主國控制的地區在來源中合為一個面；原始狀態並不等於一份憲政分類。CShapes 2.0 通常省略小於一萬平方公里或後來完全撤回的領土異動，青島租借地及比利時境內的逐日佔領線等無法單靠主權面辨識。摩洛哥在 1904–1912 年部分紀錄缺少政治地位欄，採用的工作副本將其留白。英國控制下的埃及在 1914 年底以前仍涉及鄂圖曼的名義主權；資料的管理者欄無法完整表達這層關係。
- **幾何精度**。多邊形以經緯度儲存，每條外環與內環分別簡化。歐洲範圍使用 0.016 度容差，其他區域使用 0.075 度，座標四捨五入至小數四位。小國、小島及相鄰多邊形可能顯示細微接縫。放大畫面不會提高原始資料精度。

## 重建與驗證

網站已內建全部所需底圖與地理圖層。修改國界資料時可用 Node.js 20 以上版本重建。此步驟才需要網路，平常使用網站可離線操作。

```sh
cd eras/world-war-i/gis
npm install --no-save --package-lock=false polygon-clipping@0.15.7
node rebuild-geography.mjs
node check-geography.mjs
```

來源快照鎖定於 `gis-inputs.json` 所列 Git 提交，可逐檔驗證 Git blob SHA。年度資料來自 [Geostoria 的 CShapes-Europe 處理檔](https://github.com/VitoPalumboPodcast/Geostoria/tree/0507bd2a3e722357255b917db46ebde4b40f1d13/data)。日級有效期與幾何來自 [CShapes 2.0 分國工作副本及匯入說明](https://github.com/ulanch/chronoatlas/tree/4df9d52a523d0140815959902db25170844ed01f/data/imports/cshapes-2-0)；該版本列出原始 ETH 檔的 SHA-256 與其簡化方法。陸塊採用 [Natural Earth 的 GeoJSON](https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_110m_land.geojson)。

`check-geography.mjs` 檢查多邊形閉合、經緯度範圍及 15 個「城市 × 日期」測點，包含 1871 年史特拉斯堡、貝爾福，1914 年塞拉耶佛、華沙、赫爾辛基和 1919 年但澤。
