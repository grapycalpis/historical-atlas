# 美國獨立革命教材查核記錄

查核日期：2026-11-23。範圍為 1773–1783 年，5 章、30 個事件。先讀 README、NEW-ERA 及德國統一三個 JSON，確認通用閱讀器後，以 `npm run new-era -- american-revolution "美國獨立革命：從殖民地抗爭到國際承認"` 建立；未修改其他時期教材或共用閱讀器。

## 教學結構

| 章 | 核心問題 | 事件數 |
| --- | --- | ---: |
| 波士頓衝突與殖民地合作 | 地方衝突如何變成跨殖民地合作？ | 4 |
| 戰爭爆發與獨立決策 | 戰爭先爆發，為何一年多後才決定獨立？ | 9 |
| 戰局逆轉與法國結盟 | 軍事存活與信用如何轉成結盟？ | 5 |
| 南方戰事及約克鎮 | 占領與戰場勝利為何未能恢復統治？ | 7 |
| 巴黎和約與獨立的限制 | 國家獨立後，誰仍缺乏自由或土地保障？ | 5 |

起讀與重設：`tea-party`（1773-12-16）；預設比較：`treaty-paris`（1783-09-03）。比較的是英屬殖民地地位與正式和約的獨立承認。獨立自我主張、外國結盟、敵軍投降、宗主國承認及批准程序各有節點。閱讀器預設在 A 顯示對照時點、B 顯示目前時點，可用下拉選單互換。巴黎超出北美預設視野，導讀提示比較前可先切世界全圖；北美視野適合比較兩時點的美方身分，不能把貼在圖框邊的巴黎地名框當成北美地點。

## 來源與取得程度

本次實際搜尋並開啟來源，事件 `sources` 都連到具體資料頁、原文或專題研究，不使用搜尋結果網址。原始資料、後世整理與館藏目錄在 `primary` 分別註明。

- [美國國家檔案館：李氏決議與投票原件](https://www.archives.gov/milestone-documents/lee-resolution)、[宣言全文](https://www.archives.gov/founding-docs/declaration-transcript)、[邦聯條例](https://www.archives.gov/milestone-documents/articles-of-confederation)、[巴黎和約原件與全文](https://www.archives.gov/milestone-documents/treaty-of-paris)。
- [英國國家檔案館茶葉事件教材](https://cdn.nationalarchives.gov.uk/documents/education/boston-tea-party.pdf)附軍官信、報紙、法案與公司帳單；依其具體檔號區分材料。
- [耶魯大學波士頓港法](https://avalon.law.yale.edu/18th_century/boston_port_act.asp)、[法美同盟](https://avalon.law.yale.edu/18th_century/fr1788-2.asp)、[初步條款](https://avalon.law.yale.edu/18th_century/prel1782.asp)與[日期、批准及公告考證](https://avalon.law.yale.edu/18th_century/pre782n.asp)，用原文區分法律節點。
- [維吉尼亞圖書館鄧莫爾公告](https://www.lva.virginia.gov/collections/educator-resources/oc-api/uploads/1643821335434_dunmoresproclamation-transcription.pdf)、[密西根大學《常識》版本史](https://clements.umich.edu/exhibit/revolutionary-paine/going-viral-in-1776/)、[俄亥俄州立大學華盛頓戰報轉錄](https://hti.osu.edu/sites/hti.osu.edu/files/washington_to_continental_congress_dec_1776.pdf)。
- [史密森尼德拉瓦條約](https://americanindian.si.edu/nationtonation/pdf/Treaty-with-the-Delawares-1778.pdf)、[豪德諾索尼戰爭紀事](https://americanindian.si.edu/nk360/haudenosaunee-lands/the-american-revolution/pdf/transcripts/Haudenosaunee-%28Iroquois%29-Lands-and-the-American-Revolution-During.pdf)與[奧奈達民族自身的歷史說明](https://www.oneidaindiannation.org/the-oneidas-americas-first-allies)相互對讀，避免單一原住民陣營。
- [國家公園署吉爾福德教材](https://www.nps.gov/articles/000/upload/TwHP-Lessons_32guilford.pdf)包含兩位將領報告，[約克鎮投降全文](https://www.nps.gov/common/uploads/teachers/lessonplans/Articles%20of%20Capitulation%2C%20Yorktown.pdf)界定投降對象；其他戰役使用相應公園研究及參戰者節錄。
- [新斯科細亞檔案館黑人名冊](https://archives.novascotia.ca/africanns/book-of-negroes/)同時記錄離境與遣返，並說明英美兩版本；不以難民登記概括所有黑人處境。[馬里蘭州檔案館辭職演說](https://msa.maryland.gov/msa/mdstatehouse/pdf/gwspeech.pdf)用於文官與軍權問題。

薩凡納羅伯特・豪 1778-12-30 書信只取得 [GHS 0400 的館藏目錄](https://7063.sydneyplus.com/archive/final/Portal/Default.aspx?component=AABC&record=cc033655-6be3-40ec-9329-8a54785d29e6)，未取得該信全文；不宣稱已逐句核讀。日期以國家公園署及喬治亞歷史學會專頁交叉核對。邦克山等條目會指出未附完整戰報，改用來源明載的當時地圖或引述，避免虛構原始證據。

國會圖書館部分一般網頁與原件瀏覽器本次回傳 403；不以其未讀內容作唯一依據。可開啟的研究指南用於指向批准、公告與軍令日期，並用 Avalon 原文交叉查核。國務院 Milestones 已停止更新，僅作歷史背景，條約日期與內容依原文核對。

## 日期及容易混淆的節點

全部事件使用西曆日級日期。本期英國與北美殖民地均已使用格里曆，沒有儒略曆、舊曆或革命曆換算。只知年月的背景、累積過程及跨月難民移動不虛設日級事件。本版 30 個日期各異，無同日先後衝突；資料仍沿用章、日期、ID 排序規則，所有因果引用均指向較早事件。

| 問題 | 本教材採法與交叉核對 |
| --- | --- |
| 港法立法與施行 | 1774-03-31 採 Avalon 法案標題；1774-06-01 為條文施行日。部分 NPS 紀年列 3 月 30 日程序，未照搬為施行日。 |
| 請願通過與簽署 | 1775-07-05 文字通過，7 月 8 日簽署。NPS 同頁首段與詳細段不一，採詳細段，另對檔案館 8 日原件與全文。 |
| 潘恩小冊 | 1776-01-10 採大學館藏版本研究；廣告、增訂、重印不當成首版同日事件，不採精確總銷量。 |
| 獨立決定、宣言及簽名 | 1776-07-02 通過獨立部分，12 地贊成，紐約待授權；7 月 4 日通過宣言文字，多數羊皮紙簽名在 8 月 2 日。依 NARA 原件、全文與文件史。 |
| 渡河與特倫頓 | 1776-12-25 夜渡河，26 日作戰；27 日戰報明稱昨日行動。 |
| 薩拉托加 | 1777-09-19、10-07 為兩次主要戰鬥，本筆 10-17 為依公約投降；與戰役紀年及目擊節錄對照。 |
| 邦聯條例 | 1777-11-15 文本通過；1781-03-01 完成全州批准並生效。未將二者或 1778 年簽名混同。 |
| 法美同盟 | 1778-02-06 簽署兩份條約；大陸會議 5 月 4 日另批准，援軍到達又不同。 |
| 約克鎮 | 1781-10-18 議條件，19 日簽署交械；考彭斯 NPS 頁註解曾簡寫 18 日，採投降全文及圍城紀年校正。 |
| 初步條款 | 1782-11-30 採原文與亞當斯日記考證；LOC 某展覽導言為 20 日、同頁藏品為 30 日，依原件而非導言。 |
| 停戰公告 | 1783-04-11 公告，15 日批准初步條款，18 日華盛頓軍令、19 日軍中慶祝；依原件考證，未採 12 日公告簡寫。 |
| 正式和約 | 1783-09-03 簽署；美國國會於 1784-01-14 批准，超出本期時間軸。NPS 約克鎮後紀年誤以「批准」稱 9 月 3 日，依和約及 LOC 指南區分；本文不把簽署宣稱為全部程序完成。 |
| 紐約撤離 | 1783-11-25 城市交接；黑人名冊跨四至十一月，非同日同船離境，更非所有西部據點已撤。 |

## 因果、身分與排除

`causes` 只作有解釋的連結：封港促成合作；交火迫使代表共同處理軍事；請願失效與公共論戰使分離更可主張；獨立決議需要公開宣言；薩拉托加提高結盟可信度；法國參戰改變英國戰略及聯軍海軍條件；南方追擊消耗、海軍協同與圍城才連到約克鎮；投降提高議和壓力，並不直接等於和平。

特倫頓與薩拉托加的連結是軍隊存續及動員的條件，不是假定前次勝利決定後次戰術；國王山對考彭斯也只是地方動員與戰略條件。邦聯條例沒有因時間靠近而連到薩拉托加。每筆 `trigger`、`background`、`impact` 交代機制；反事實明列「假設」與「限制」，不當作已證實的另一段歷史。

八組參與方按有效日期更新。分時面板兼有國家、代表及分析用社群，不能套成八個民族國家。起始 `from` 是教材截面而非成立日；1777-10-17 的原住民族身分也是本時點已可確認的情況，不虛設全族正式結盟日。效忠派對《常識》的後續反駁，不倒填成首版當天已出版。

- 鄧莫爾公告的對象及持械條件，不是普遍廢奴；服務英方、美方、求生或無法逃離皆可能。
- 豪德諾索尼內部與村落選擇有異；奧奈達部分支持美軍，其他社群多傾向英方，也有中立嘗試。德拉瓦條約不能代表所有原住民族。
- 第五條是國會對各州的財產建議安排，不能改寫成效忠者自動取回財產；第七條財產語言須與逃亡者自由對讀。
- 原住民族未共同簽署英美和約，英美相互認可邊界不證割地同意或實際控制。婦女消費抗爭的參與也不等於取得投票權。

## 地圖資料與授權

沿用 `app/land.json` 的 Natural Earth 1:110m 自然陸塊，來源與[公共領域條款](https://www.naturalearthdata.com/about/terms-of-use/)列於製圖說明。它是概化現代自然底圖，不是本期海岸線；波士頓填海尤其限制歷史定位。

事件點是編者依史料所列地名近似設定，無歷史測量精度。城市／建築約城市或街區，戰場約公里級，海戰僅灣口外海域、誤差可數十公里。未複製外部地圖、圖像或其線段，因此不把外部網站授權視作可任意改製的向量授權。

`boundaries: []`，不設 `overlays`：沒有同時完成來源、有效日期及授權核對的殖民地界、條約界、部族疆域、占領面、戰線、行軍、航海或逃亡路線。這些概念在文字分開解釋，不能從海岸、點位或外交虛線推算。外交虛線只代表本次締約／議和，與軍隊動向不同。費城參與方點也不是整段時期不變的政府會址。

豪德諾索尼總括標籤為避免與奧奈達重疊而不另顯示；事件參與方按鈕仍可讀該聯盟面板。比較中若先前事件圈與參與方點重合，可以鍵盤聚焦參與方並按 Enter 查看身分；本文介面檢查同時涵蓋這個可及操作。

## 驗證與匯出

- `npm test` 通過：建置、15 個地理檢查點、既有一戰及德國教材三種寬度互動回歸，以及 6 項 Node 測試。新增本題日期、關鍵因果、1773／1776／1783 身分及排除群體檢查。
- `npm run export -- american-revolution` 完成，單檔在 `exports/american-revolution.html`；完整網站入口 `site/index.html`，教材 `site/american-revolution/index.html`。
- 實際使用本機 Chrome 157.0.8103.79、離線 `file://` 模式，在 1440×1000、375×1000 各走完 30 個事件及三層解說，查驗來源連結數、首頁入口、前後推進、因果跳轉、雙時點、分時面板、指南重設、巴黎自動切周邊及回北美。窄版使用可見的事件目錄與指南，不操作隱藏側欄。
- 1440 與 375 像素均無整頁或閱讀區水平溢出、無 JavaScript 頁面錯誤；已實際開啟並目視檢查桌面及窄版閱讀、巴黎視野與比較截圖。比較視窗窄版採上下排列。
- 單檔 HTML 另以實際 Chrome 離線開啟，確認起點及比較地圖可用。外部史料需連線；本次網路查核與本機離線介面驗證分開進行。
- 機器結果及截圖：`exports/american-revolution-qa/results.json`、`reader-1440.png`、`reader-375.png`、`compare-1440.png`、`compare-375.png`、`paris-1440.png`、`paris-375.png`。建置與匯出均依原 repo 規則被 Git 忽略，需重建或直接取用目前本機產物。
- 未驗證：實體觸控裝置、Safari／Firefox，以及遠端 GitHub Pages 部署；本次沒有發布或推送。來源的全部下游館藏瀏覽器不保證可達，前述 403 與薩凡納僅目錄的限制保留。

環境起初沒有 PATH 可見的 npm。使用 app 內建 Node 24 與下載到 `/private/tmp` 的官方 npm 10.9.4 執行原有指令，沒有新增專案相依套件。

## 逐筆日期與來源入口

| 日期 | 事件 | 直接來源入口 |
| --- | --- | --- |
| 1773-12-16 | 波士頓茶葉事件：誰有權向殖民地課稅？ | [英國國家檔案館｜茶葉事件教材、軍官信與報紙原件](https://cdn.nationalarchives.gov.uk/documents/education/boston-tea-party.pdf) |
| 1774-03-31 | 波士頓港法立法：懲罰能否恢復服從？ | [耶魯大學 Avalon｜1774-03-31 波士頓港法全文](https://avalon.law.yale.edu/18th_century/boston_port_act.asp) |
| 1774-09-05 | 第一次大陸會議：共同抗爭仍可效忠國王？ | [美國國家檔案館博物館｜大陸會議與聯合協約原件](https://visit.archives.gov/whats-on/explore-exhibits/first-continental-congress) |
| 1774-10-20 | 大陸聯合協約：抵制如何改變地方權力？ | [美國國家檔案館博物館｜大陸會議與聯合協約原件](https://visit.archives.gov/whats-on/explore-exhibits/first-continental-congress) |
| 1775-04-19 | 列星頓與康科德交火：戰爭先於獨立 | [美國國家公園署｜1775-04-19 時序、英軍日記與民兵證詞](https://www.nps.gov/mima/learn/historyculture/april-19-1775.htm) |
| 1775-05-10 | 第二次大陸會議：誰負責共同戰爭？ | [美國眾議院史料室｜大陸及邦聯會議會期](https://history.house.gov/People/Continental-Congress/Session-Dates/) |
| 1775-06-14 | 建立大陸軍：地方戰事如何共同承擔？ | [美國陸軍｜1775-06-14 建軍決議節錄](https://www.army.mil/1775/timeline.html?from=hp_spotlight) |
| 1775-06-17 | 邦克山戰役：占領高地就等於勝利？ | [美國國家公園署｜邦克山戰役與布里茲山](https://www.nps.gov/articles/000/the-battle-of-bunker-hill.htm) |
| 1775-07-05 | 通過橄欖枝請願：持械仍想和解 | [美國國家公園署｜橄欖枝請願：通過與簽署](https://www.nps.gov/articles/000/the-olive-branch-petition.htm) |
| 1775-11-07 | 鄧莫爾公告：誰能藉戰爭尋求自由？ | [維吉尼亞圖書館｜1775-11-07 鄧莫爾公告全文轉錄](https://www.lva.virginia.gov/collections/educator-resources/oc-api/uploads/1643821335434_dunmoresproclamation-transcription.pdf) |
| 1776-01-10 | 《常識》問世：為何放棄君主統治？ | [密西根大學克萊門茨圖書館｜《常識》首版與版本史](https://clements.umich.edu/exhibit/revolutionary-paine/going-viral-in-1776/) |
| 1776-07-02 | 通過獨立決議：先決定分離 | [美國國家檔案館｜1776-07-02 李氏決議及表決原件](https://www.archives.gov/milestone-documents/lee-resolution) |
| 1776-07-04 | 通過《獨立宣言》：向誰說明自由？ | [美國國家檔案館｜《獨立宣言》全文](https://www.archives.gov/founding-docs/declaration-transcript) |
| 1776-12-26 | 特倫頓突襲：怎樣讓戰爭繼續？ | [賓夕法尼亞州歷史公園｜渡河與特倫頓戰役](https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/washington-crossing-historic-park/history) |
| 1777-10-17 | 薩拉托加投降：軍事信用如何影響外交？ | [美國國家公園署｜薩拉托加戰役時序](https://home.nps.gov/sara/learn/historyculture/campaign-timeline.htm) |
| 1777-11-15 | 通過《邦聯條例》：獨立各邦如何聯合？ | [美國國家檔案館｜《邦聯條例》原件、全文與批准歷程](https://www.archives.gov/milestone-documents/articles-of-confederation) |
| 1778-02-06 | 法美簽約：外援變成有條件同盟 | [耶魯大學 Avalon｜1778-02-06 法美同盟條約全文](https://avalon.law.yale.edu/18th_century/fr1788-2.asp) |
| 1778-09-17 | 皮特堡條約：原住民族不是單一陣營 | [史密森尼美洲原住民博物館｜1778-09-17 德拉瓦條約全文](https://americanindian.si.edu/nationtonation/pdf/Treaty-with-the-Delawares-1778.pdf) |
| 1778-12-29 | 英軍攻占薩凡納：為何轉向南方？ | [美國國家公園署｜薩凡納陷落與查爾斯頓圍城](https://www.nps.gov/articles/siege-of-charleston-1780.htm) |
| 1780-05-12 | 查爾斯頓投降：占領如何激起抵抗？ | [美國國家公園署｜薩凡納陷落與查爾斯頓圍城](https://www.nps.gov/articles/siege-of-charleston-1780.htm) |
| 1780-10-07 | 國王山戰役：鄰人為何分站兩邊？ | [美國戰場保護信託｜國王山戰役與雙方回憶節錄](https://www.battlefields.org/learn/revolutionary-war/battles/kings-mountain) |
| 1781-01-17 | 考彭斯：正規兵與民兵如何協同？ | [美國國家公園署｜考彭斯戰役與南方內戰](https://www.nps.gov/cowp/learn/historyculture/the-battle-of-cowpens.htm) |
| 1781-03-15 | 吉爾福德法院：贏得戰場為何仍撤走？ | [美國國家公園署｜吉爾福德法院戰役與雙方將領報告](https://www.nps.gov/articles/000/upload/TwHP-Lessons_32guilford.pdf) |
| 1781-09-05 | 切薩皮克海戰：陸上包圍為何要海軍？ | [美國國家公園署｜切薩皮克海戰與協同時序](https://www.nps.gov/york/learn/historyculture/eventstoyorktown.htm) |
| 1781-10-19 | 約克鎮投降：軍隊投降不是英國簽和約 | [美國國家公園署｜1781-10-19 約克鎮投降條款全文](https://www.nps.gov/common/uploads/teachers/lessonplans/Articles%20of%20Capitulation%2C%20Yorktown.pdf) |
| 1782-11-30 | 初步和平條款：承認如何寫進談判？ | [耶魯大學 Avalon｜1782-11-30 初步和平條款全文](https://avalon.law.yale.edu/18th_century/prel1782.asp) |
| 1783-04-11 | 停戰公告：消息與和平為何不同步？ | [耶魯大學 Avalon｜初步條款考證與 1783-04-11 停戰公告全文](https://avalon.law.yale.edu/18th_century/pre782n.asp) |
| 1783-09-03 | 巴黎和約：獨立獲承認，平等仍有限制 | [美國國家檔案館｜1783-09-03 巴黎和約原件及全文](https://www.archives.gov/milestone-documents/treaty-of-paris) |
| 1783-11-25 | 英軍撤出紐約：同日有慶祝，也有流亡 | [美國國家公園署｜紐約 1783-11-25 撤軍與多方處境](https://www.nps.gov/resources/event.htm?eventID=474F977E-1DD8-B71B-0B9ED433852837D7) |
| 1783-12-23 | 華盛頓交還軍權：獨立後誰來統治？ | [馬里蘭州檔案館｜1783-12-23 華盛頓辭職演說與手稿](https://msa.maryland.gov/msa/mdstatehouse/pdf/gwspeech.pdf) |
