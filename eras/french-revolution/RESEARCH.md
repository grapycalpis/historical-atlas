# 法國大革命教材查核記錄

查核日期：2026-11-23。教材涵蓋 1789–1799 年，以三級會議開幕至霧月政變為時間軸，6 章、36 個事件。先讀 README、docs/NEW-ERA.md 及德國統一教材的 edition、events、geography 三個 JSON，再以 `npm run new-era -- french-revolution "法國大革命：從三級會議到霧月政變"` 建立。沿用共用閱讀器，沒有改動其他時期教材、共用程式或版面。

## 教學結構與比較

| 章 | 核心問題 | 事件數 |
| --- | --- | ---: |
| 財政危機與三級會議 | 徵稅與借款問題，為何轉成國民代表權問題？ | 3 |
| 國民議會與革命擴散 | 議會改革為何需要城市與農村行動？ | 5 |
| 君主立憲的危機 | 憲法為何未能恢復國王、議員與民眾間的信任？ | 5 |
| 共和建立與對外戰爭 | 對外戰爭如何加深內部猜疑，共和為何未終結暴力？ | 7 |
| 恐怖統治及熱月轉折 | 緊急授權如何擴張，軍事勝利為何未立刻結束鎮壓？ | 10 |
| 督政府與霧月政變 | 分權制度為何依靠軍隊，最後又被軍人推翻？ | 6 |

`initial` 與 `baseline` 都是 `estates-open`（1789-05-05），`compare` 為 `brumaire-19`（1799-11-10）。導讀要求比較代表權、稅收授權、軍隊控制、女性與殖民地居民的權利。閱讀器在基準點開比較時，A 預設是 1799 年、B 是 1789 年，可用選單互換；點選「中央代表機關」讀兩日的制度身分。

1799 年的比較點是**三名臨時執政與立法委員會**，不能倒填 12 月 13 日憲法確立的第一執政權力，更不能稱當日已成立帝國。1789 年的三級會議也不是普遍選舉產生的民主議會。

女性的教育與生計請願、十月進軍、糧價訴求、俱樂部遭禁及 1795 年抗議，納入事件及分時身分。農民負擔、大恐慌、宗教與徵兵、種植園奴役、自由有色人平權與廢奴則分開解釋。群體不是紀律政黨；雅各賓網絡、山岳派、吉倫特派、無套褲漢、國民自衛軍與正規軍也不合併為同一行為者。

## 實際開啟的主要來源

本次以搜尋工具尋找並開啟機構頁面，再逐頁 HTTP 開啟教材使用的來源。事件連結指向具體條目、文本、館藏或研究，未使用搜尋結果網址。每筆 `primary` 說明材料種類、作者位置與取得程度；沒有把機構導讀、回憶錄或書目誤稱當日手稿。

- [凡爾賽宮：三級會議](https://www.chateauversailles.fr/decouvrir/histoire/grandes-dates/ouverture-etats-generaux)、[網球廳誓詞](https://www.chateauversailles.fr/decouvrir/histoire/les-grandes-dates/serment-jeu-paume)、[十月王室遷居](https://www.chateauversailles.fr/decouvrir/histoire/les-grandes-dates/grand-depart-roi)，核對場所及前後日期。
- [法國國民議會的革命辯論原文](https://www2.assemblee-nationale.fr/decouvrir-l-assemblee/histoire/les-grands-discours-parlementaires/revolution-francaise)、[人權宣言表決](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/la-declaration-des-droits-de-l-homme-et-du-citoyen)、[廢除王權](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/la-convention-nationale-et-la-fin-de-la-royaute)、[共和三年憲法](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/constitution-de-l-an-iii-le-directoire)與[霧月兩日政變](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/le-coup-d-etat-des-18-et-19-brumaire-an-viii)。
- [法國總統府的 1791 年憲法全文](https://www.elysee.fr/la-presidence/la-constitution-du-3-septembre-1791)，核對選舉條件、行政與暫緩否決權及殖民地適用問題。
- 喬治梅森大學與紐約市立大學合作的原始資料庫：巴士底獄[攻方](https://revolution.chnm.org/d/382/)與[守方](https://revolution.chnm.org/d/383/)、[八月法令成文文本](https://revolution.chnm.org/d/551/)、[女性證詞](https://revolution.chnm.org/d/474/)、[九月屠殺外交報告](https://revolution.chnm.org/d/393/)、[嫌疑犯法令](https://revolution.chnm.org/d/417/)、[最高限價](https://revolution.chnm.org/d/415/)、[牧月法令](https://revolution.chnm.org/d/439/)、[熱月當晚俱樂部記錄](https://revolution.chnm.org/d/396/)、[波拿巴政變公告](https://revolution.chnm.org/d/502/)。這些多是依近代出版的法文文獻所作英譯或節錄，並非本教材重新校勘的手稿。
- [福坦大學全民動員法令](https://sourcebooks.fordham.edu/mod/1793levee.asp)，讀國家如何分配戰爭勞動；[里昂市檔案館](https://www.archives-lyon.fr/vuln%C3%A9rabilit%C3%A9s/risques-militaires/Lyon-n%27est-plus)附懲罰命令與地方材料；[瓦爾密歷史中心](https://www.valmy1792.com/centre-historique-valmy-1792/la-bataille/)及[昂熱工兵博物館](https://www.musee-du-genie-angers.fr/fpdb/20204458-11-dioramaduballonlentreprenant-batailledefleurus.pdf)提供戰役、部隊及氣球軍官引述。
- 殖民地議題對讀[杜費 1794-02-04 報告](https://www2.assemblee-nationale.fr/14/evenements/2016/abolition-de-l-esclavage-1794-et-1848/1794-la-premiere-abolition/discours-de-louis-pierre-dufay-16-pluviose-an-ii)、[議會第一次廢奴紀事](https://www2.assemblee-nationale.fr/15/evenements/2021/abolition-de-l-esclavage-1794-et-1848/1794-la-premiere-abolition)、[聯合國教科文組織的跨夜日期](https://www.unesco.org/en/days/slave-trade-remembrance)及[奴隸制記憶基金會教材](https://memoire-esclavage.org/sites/default/files/inline-files/20210701_Dossier_pedagogique_Enseigner_le_retablissement_de_lesclavage_en_1802.pdf)。[雷恩斯福德的起事記述](https://revolution.chnm.org/d/607/)出版於 1805 年，不是拉克魯瓦著作或 1791 年當夜日誌；不能把作者的種族與殖民偏見當作起事者自述。
- 旺代的日期用[國家圖書館馬什庫勒權威紀錄](https://catalogue.bnf.fr/ark:/12148/cb155985942)，方法與分類再對讀 [Jean-Clément Martin 的死亡人口研究](https://www.persee.fr/doc/rhmc_0048-8003_1991_num_38_1_1580)及 [Peter McPhee 的劍橋專章公開摘要](https://www.cambridge.org/core/books/abs/cambridge-world-history-of-genocide/vicious-civil-war-in-the-french-revolution/576E50A9A665BB2501A8BFE71302302C)。本次沒有取得劍橋章節完整付費內文，也沒有重建全部死亡登記。
- [拿破崙基金會巴拉斯傳記](https://www.napoleon.org/histoire-des-2-empires/biographies/barras-paul-francois-jean-nicolas-vicomte-de-1755-1829-homme-politique/)交叉核對 1797 年春季選舉及果月政變；[政變過程研究](https://www.napoleon.org/en/history-of-the-two-empires/articles/18-brumaire-the-context-and-course-of-a-coup-detat/)與自我辯護公告對讀。[普法巴塞爾和約原文轉錄](https://documentsdedroitinternational.fr/1795-5-avril-traite-de-bale/)用於參與方身分，特別保留批准條件。

## 日期、爭議與因果取捨

全篇 `date` 皆採西曆。革命曆附於事件圖說；依[共和曆說明](https://www.napoleon.org/histoire-des-2-empires/calendrier-republicain)及原文所載換算，不以不同年度同月同日固定對應同一西曆日期。

| 日期問題 | 本教材的處理 |
| --- | --- |
| 三級會議 5 月 4／5 日 | 4 日為宗教遊行，正式開幕取 5 日。 |
| 八月之夜與法令文字 | 事件取 8 月 4 日夜開始，5 日清晨延續；8 月 11 日成文條款仍區分無償取消與贖買。 |
| 人權宣言 | 8 月 26 日完成表決，10 月國王接受；不是同一法律／政治節點。 |
| 十月事件 | 5 日進軍與施壓、6 日闖宮及王室遷居分成兩筆，因果按日期排列。 |
| 教士宣誓 | 7 月 12 日組織法與 11 月 27 日另行宣誓決議分開；[檔案館研究所引原件](https://cliothemis.com/Legalite-et-integrite-de-la-loi-le.html)並核對國王於 12 月 26 日才認可。 |
| 瓦雷訥 | 20 日深夜出發，21 日深夜攔截，身分確認與留置跨至 22 日。德魯埃英譯正文的日期印誤不可直接沿用。 |
| 戰神廣場 | 大學條目導言誤寫 7 月 15 日；依羅浮宮館藏及時序取 17 日。不同記述的傷亡不硬湊精確總數。 |
| 聖多明各起事 | 議會記 8 月 22 日，教科文組織記 22–23 日夜並於 23 日紀念。採起始夜的 22 日並明說跨夜。 |
| 1791 年憲法 | 9 月 3 日議會通過，國王接受及 14 日宣誓在其後。 |
| 1792 年國王身分 | 8 月 10 日停職，9 月 21 日正式廢君，1793 年 1 月 21 日處刑；三者不同。 |
| 九月屠殺 | 9 月 3 日英國外交報告的「昨日」支持 2 日起點，不能把報告寫作日或雷蒂夫所見第二日當起點。 |
| 瓦爾密與共和 | 9 月 20 日戰役不等於隔天公會收到戰報才決定廢君；未查核消息傳抵時點，故不設該直接因果。 |
| 共和紀年與新月份 | 9 月 22 日成為後來共和曆元年起點，1793 年才正式採新曆法。不能將 1792 年的共和紀年與完整新曆混寫。 |
| 旺代與里昂 | 馬什庫勒取可核對的 3 月 11 日地方節點；全區起事沒有共同日。里昂 5 月 29 日的行動早於 6 月 2 日排除吉倫特派，因果僅寫後續衝突升高。 |
| 救國委員會／嫌疑犯法令 | 4 月 6 日最初九人，7 月擴為十二人；羅伯斯比爾不是首日起的獨掌者。革命法庭 3 月已成立，不能照抄嫌疑犯法令導言所混入的創設敘事。 |
| 里昂投降 | 10 月 9 日投降，12 日懲罰命令，其後鎮壓；地方檔案頁概稱圍城三個月但列 8 月 8 日至 10 月 9 日，本教材用具體日期。 |
| 廢奴 | 地方解放在先，1794 年 2 月 4 日全殖民地法令在後；英占地與殖民者抵制使執行不一，不等於海地已獨立。 |
| 牧月與熱月 | 牧月二十二日為 1794-06-10；穫月八日為 06-26；熱月九日為 07-27，處刑為翌日熱月十日。 |
| 熱月原始信件誤述 | 29 日信可核對「昨日」處刑，卻錯把勒巴列為遭斷頭者；[勒巴傳記書評](https://www.persee.fr/doc/rhmc_0996-2743_1901_num_3_1_4388_t1_0057_0000_2)記其熱月十日自殺。原始資料也會犯錯。 |
| 國家檔案館機構沿革的誤植 | 其頁將弗勒呂斯寫成「果月八日／6 月 26 日」，月份應為穫月；又一處把共和三年憲法與 1793 年 6 月 24 日混寫，須以憲法及戰役專頁校正。 |
| 三年憲法、葡月與督政府 | 果月五日＝1795-08-22；葡月十三日＝10-05；霧月十一日＝11-02。憲法通過不等於行政已就任。 |
| 果月政變 | 五年果月十八日＝1797-09-04；公告為 09-09，不能拿公告日當政變日。大學導言誤稱秋季選舉，依傳記採春季。 |
| 霧月政變 | 八年霧月十八日＝1799-11-09，在巴黎部署及移會；十九日＝11-10，在聖克盧武力清場及建立臨時執政。 |

《女性與女公民權利宣言》僅以可核對的 1791 年 9 月出現於背景及史料對讀，不虛設出版日。大恐慌、各地動員與 1795 年春季生活經驗也不硬編為同一天。36 筆事件沒有需要以 ID 裁決先後的同日獨立節點；跨夜事件均在解說中註明。所有 `causes` 指向更早事件，`trigger` 說明它如何改變當時選項；不以先後本身證明因果。

旺代分類與死亡總數、路易十六刑罰投票的計票分類、誰先開火、九月暴力的組織責任、熱月責任及霧月「持匕首襲擊」等，不以單一當事人的說法下定論。反事實每筆均明示「假設」與「限制」，不斷言沒有某事件就一定沒有革命。

## 地圖、身分與授權

底圖只使用專案既有 [Natural Earth 1:110m Land](https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/)，依[公共領域使用條款](https://www.naturalearthdata.com/about/terms-of-use/)；沒有複製史料圖片或外部歷史地圖的線段。

`boundaries: []`，事件無 `overlays`。未取得同時具幾何來源、有效日期與可用授權的歷史疆界、軍事占領面、當日戰線及行動路線，故不畫。政治疆界是法理範圍、占領是軍事控制、戰線是特定時點配置，三者與事件點分開敘述。宣戰虛線只表示關係，不表示巴黎至維也納的行軍。

城市、決策地、戰場與北部平原皆為編者近似定位；約城市 1–10 公里、鄉間／戰區 10–30 公里，未作歷史測量。馬什庫勒不是旺代省首府；「軍事旺代」超過行政省界。弗勒呂斯事件點也不是氣球實際升空的朱梅磨坊。法蘭西角附近的點只概括聖多明各北部起事，自動切換周邊，世界全圖可看跨洋距離。

13 個參與方、89 段分時身分，均附來源。多個巴黎群體實際重疊，部分標籤隱藏，可從事件按鈕查看，未把社群挪到虛構領土。王室在停職、廢君與處刑分別更新；普魯士 1795 年和約保留批准條件；1799 年不是第二次反法同盟參戰方。比較應閱讀制度與權利文字，不能從相同自然陸塊推斷政治未變。

## 來源可達性與取得限制

逐頁檢查 72 個教材及身分來源網址，70 個直接 HTTP 成功。兩個直接連線限制保留在來源標籤與本記錄：

- 哥倫比亞大學最高限價頁可由搜尋／開頁工具讀取，直接 HTTP 遇 403。事件優先連到可直接取得的 CHNM 第 415 號完整節錄，哥大作備援。
- 國家檔案館舊主機的 `PV4.pdf` 可由開頁工具讀取其導言（第 3 頁），直接連線則 DNS 失敗。另附可取得的 BnF 原始公文集目錄與數位本入口，沒有聲稱已逐頁閱讀全部公文集。

教科文組織頁初次直接連線重設，重試成功。另有搜索途中遇到挑戰頁或逾時的候選資料，沒有當成已讀全文使用。機構網頁、英譯節錄、館藏圖錄與後世回憶的證據能力不同；救國委員會成立日、葡月作戰及督政府首日議程等，未取得全部原始命令／會議原件掃描，已逐筆說明。

機器可達性結果為 `exports/french-revolution-qa/sources.json`，含原網址、最終網址、狀態、大小及雜湊；HTTP 200 只表示取得內容，不能取代歷史查核。

## 驗證及匯出

- `npm test` 通過：全部教材建置、15 個一戰地理檢查點、既有閱讀器三種寬度互動回歸，以及 7 項 Node 測試。新增法國教材的關鍵日期、前因、王室與行政身分、殖民地狀態及比較點回歸。
- `npm run export -- french-revolution` 成功，單檔為 `exports/french-revolution.html`；入口 `site/index.html`，教材 `site/french-revolution/index.html`。
- 實際 Chrome 157.0.8103.79，以離線 `file://` 在 1440×1000、768×1000、375×1000 各走完 36 個事件。檢查首頁入口、前後推進、章節／事件目錄、三層解說、來源數與六章史料索引、因果跳轉、圖層、雙時點選單、分時機關身分、按鈕及指南重設、聖多明各自動切周邊與返回區域。
- 三種寬度均無 JavaScript 頁面錯誤、整頁或閱讀區水平溢出；375 像素比較面板上下排列。已實際開啟並目視檢查桌面閱讀、手機閱讀、手機比較與聖多明各視野截圖；保留原有網站風格。
- 單檔離線開啟另驗證事件推進、重設及兩幅比較地圖。QA 結果：`exports/french-revolution-qa/results.json`；截圖同目錄，含 `reader-*`、`sources-*`、`compare-*`、`saint-domingue-*`、`fleurus-*`。這些產物依原專案規則被 Git 忽略，可以從目前工作區取用或重新建置。
- 未驗證：實體觸控裝置、Safari／Firefox、遠端 GitHub Pages 部署及所有下游館藏瀏覽器。外部史料仍需連線；本次沒有推送或發布。

環境起初沒有 PATH 可見的 npm，使用既有 Node 24 與官方 npm 10.9.2 暫存工具執行指定指令，未新增專案相依套件。

## 逐筆日期與來源入口

| 西曆日期 | 事件 | 直接來源 |
| --- | --- | --- |
| 1789-05-05 | 三級會議開幕：先談稅，還是先決定誰代表國民？ | [凡爾賽宮｜1789 年 5 月 4–5 日與三級會議開幕](https://www.chateauversailles.fr/decouvrir/histoire/grandes-dates/ouverture-etats-generaux) |
| 1789-06-17 | 第三等級代表宣布組成國民議會 | [法國國民議會｜1789 年 6 月 15–17 日辯論及西耶斯動議](https://www2.assemblee-nationale.fr/decouvrir-l-assemblee/histoire/les-grands-discours-parlementaires/revolution-francaise) |
| 1789-06-20 | 網球廳宣誓：沒有憲法就不解散 | [凡爾賽宮｜1789-06-20 網球廳宣誓](https://www.chateauversailles.fr/decouvrir/histoire/les-grandes-dates/serment-jeu-paume) |
| 1789-07-14 | 攻占巴士底獄：武器與王權恐懼交會 | [喬治梅森大學／紐約市立大學｜巴士底獄攻打者的記述](https://revolution.chnm.org/d/382/) |
| 1789-08-04 | 八月之夜：廢特權，哪些負擔仍須贖買？ | [喬治梅森大學／紐約市立大學｜八月法令（1789-08-04 夜的決議）](https://revolution.chnm.org/d/366/) |
| 1789-08-26 | 人權宣言：普遍權利與參政排除 | [法國國民議會｜人權宣言逐條表決與國王接受](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/la-declaration-des-droits-de-l-homme-et-du-citoyen) |
| 1789-10-05 | 女性進軍凡爾賽：麵包如何成為政治要求？ | [喬治梅森大學／紐約市立大學｜馬亞爾對十月婦女進軍的證詞](https://revolution.chnm.org/d/473/) |
| 1789-10-06 | 王室遷居巴黎：首都靠近了權力中心 | [凡爾賽宮｜1789-10-06 王室離開](https://www.chateauversailles.fr/decouvrir/histoire/les-grandes-dates/grand-depart-roi) |
| 1790-07-12 | 教士公民組織法：行政改革引出宗教分裂 | [法國國民議會｜教會改革歷史節點及原法令入口](https://www.assemblee-nationale.fr/dyn/histoire/separation-des-eglises-et-de-l-etat/les-jalons-historiques) |
| 1791-06-21 | 瓦雷訥攔截：國王還能被信任嗎？ | [喬治梅森大學／紐約市立大學｜國王出走時留下的聲明（1791-06-20）](https://revolution.chnm.org/d/312/) |
| 1791-07-17 | 戰神廣場流血：立憲派與街頭運動分裂 | [羅浮宮｜1791-07-17 戰神廣場戒嚴圖，RF 6220](https://collections.louvre.fr/ark:/53355/cl020020531) |
| 1791-08-22 | 聖多明各北部起事：自由由誰爭取？ | [聯合國教科文組織｜1791 年 8 月 22 日夜至 23 日起事（部分連線重設；議會頁可交叉核對）](https://www.unesco.org/en/days/slave-trade-remembrance) |
| 1791-09-03 | 1791 年憲法通過：有限參政的君主立憲 | [法國總統府｜1791-09-03 憲法全文](https://www.elysee.fr/la-presidence/la-constitution-du-3-septembre-1791) |
| 1792-04-20 | 對奧宣戰：不同派別押上不同賭注 | [瓦爾密歷史中心｜1792-09-20 戰役及交戰背景](https://www.valmy1792.com/centre-historique-valmy-1792/la-bataille/) |
| 1792-08-10 | 杜伊勒里宮遭攻擊，國王被停職 | [喬治梅森大學／紐約市立大學｜阿澤馬 1792-08-10 當晚來信](https://revolution.chnm.org/d/319/) |
| 1792-09-02 | 九月屠殺開始：恐懼不能證明囚犯有罪 | [喬治梅森大學／紐約市立大學｜雷蒂夫對九月屠殺的記述](https://revolution.chnm.org/d/392/) |
| 1792-09-20 | 瓦爾密：法軍守住，入侵未能直取巴黎 | [瓦爾密歷史中心｜1792-09-20 戰役及交戰背景](https://www.valmy1792.com/centre-historique-valmy-1792/la-bataille/) |
| 1792-09-21 | 國民公會廢除王權，開始建立共和 | [法國國民議會｜1792-09-21 廢除王權與翌日共和紀年](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/la-convention-nationale-et-la-fin-de-la-royaute) |
| 1793-01-21 | 路易十六被處死：共和與君主和解的空間縮小 | [喬治梅森大學／紐約市立大學｜皮內爾描述 1793-01-21 國王被處死](https://revolution.chnm.org/d/327/) |
| 1793-03-11 | 馬什庫勒起事與殺戮：旺代戰爭的地方節點 | [法國國家圖書館｜馬什庫勒屠殺主題權威紀錄](https://catalogue.bnf.fr/ark:/12148/cb155985942) |
| 1793-04-06 | 救國委員會成立：緊急權力如何取得授權？ | [法國國家檔案館｜國民公會機構沿革（日期須與條文對讀）](https://rdf.archives-nationales.culture.gouv.fr/garance/entities/agent/051694/) |
| 1793-06-02 | 公會遭包圍，吉倫特派代表被排除 | [喬治梅森大學／紐約市立大學｜《巴黎革命報》對吉倫特派遭排除的敘述](https://revolution.chnm.org/d/429/) |
| 1793-08-23 | 全民動員法令：戰爭進入日常生活 | [福坦大學｜1793-08-23 全民動員法令英譯](https://sourcebooks.fordham.edu/mod/1793levee.asp) |
| 1793-09-17 | 嫌疑犯法令：政治不忠如何成為拘押理由？ | [喬治梅森大學／紐約市立大學｜1793-09-17 嫌疑犯法令節錄](https://revolution.chnm.org/d/417/) |
| 1793-09-29 | 普遍最高限價：保障麵包，也限制工資 | [喬治梅森大學／紐約市立大學｜1793-09-29 最高限價法令節錄](https://revolution.chnm.org/d/415/) |
| 1793-10-09 | 里昂投降：地方反對與中央懲罰 | [里昂市檔案館｜圍城、投降與鎮壓命令原件](https://www.archives-lyon.fr/vuln%C3%A9rabilit%C3%A9s/risques-militaires/Lyon-n%27est-plus) |
| 1794-02-04 | 公會廢奴：殖民地鬥爭改變共和公民資格 | [法國國民議會｜1794-02-04 杜費報告及廢奴辯論原文](https://www2.assemblee-nationale.fr/14/evenements/2016/abolition-de-l-esclavage-1794-et-1848/1794-la-premiere-abolition/discours-de-louis-pierre-dufay-16-pluviose-an-ii) |
| 1794-06-10 | 牧月二十二日法令：被告辯護空間再縮小 | [喬治梅森大學／紐約市立大學｜1794-06-10 牧月二十二日法令節錄](https://revolution.chnm.org/d/439/) |
| 1794-06-26 | 弗勒呂斯勝利：外患減輕，恐怖卻仍延續 | [昂熱工兵博物館｜1794-06-26 弗勒呂斯戰役及觀測氣球](https://www.musee-du-genie-angers.fr/fpdb/20204458-11-dioramaduballonlentreprenant-batailledefleurus.pdf) |
| 1794-07-27 | 熱月九日：羅伯斯比爾被捕，翌日遭處死 | [喬治梅森大學／紐約市立大學｜杜朗德馬亞訥回憶熱月九日會議](https://revolution.chnm.org/d/441/) |
| 1795-08-22 | 共和三年憲法：用兩院與五人行政防止獨裁 | [法國國民議會｜1795-08-22 共和三年憲法](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/constitution-de-l-an-iii-le-directoire) |
| 1795-10-05 | 葡月十三日鎮壓：保衛共和愈來愈倚賴軍隊 | [拿破崙基金會｜1795 年葡月鎮壓、義大利及埃及戰役紀事](https://www.napoleon.org/en/enseignants/documents/avec-le-coup-detat-du-18-brumaire-la-revolution-est-elle-terminee-le-travail-de-lhistorien-lecture-dun-document/) |
| 1795-11-02 | 督政府開始開會：分權制度下的戰爭與財政 | [法國國家檔案館｜督政府會議紀錄導言，第 3 頁（舊主機直接連線受限，另附 BnF 目錄）](https://www.archivesnationales.culture.gouv.fr/chan/chan/pdf/sm/PV4.pdf#page=3) |
| 1797-09-04 | 果月十八日政變：以軍隊取消選舉成果 | [喬治梅森大學／紐約市立大學｜1797-09-09 督政府為果月政變辯護的公告](https://revolution.chnm.org/d/457/) |
| 1799-11-09 | 霧月十八日：移會與接管首都軍權 | [法國國民議會｜1799-11-09／10 兩日政變](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/le-coup-d-etat-des-18-et-19-brumaire-an-viii) |
| 1799-11-10 | 霧月十九日：軍隊驅散議員，三名臨時執政掌權 | [法國國民議會｜1799-11-09／10 兩日政變](https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/le-coup-d-etat-des-18-et-19-brumaire-an-viii) |
