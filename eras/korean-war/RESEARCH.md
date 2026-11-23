# 韓戰教材查核記錄

查核與實測日期：2026-11-23。主時間軸 1950-06-25 至 1953-07-27，共 5 章、34 筆事件。使用 `npm run new-era -- korean-war "韓戰：從全面進攻到停戰分界"` 建立，沿用共用閱讀器，未改其他時期教材或共用操作程式。

## 教學結構與起點

| 章 | 核心問題 | 事件數 |
| --- | --- | --- |
| 一、戰爭爆發與聯合國介入 | 半島衝突如何引來聯合國及美軍？ | 6 |
| 二、釜山防禦及仁川登陸 | 為何守住一個港口能為反攻創造條件？ | 6 |
| 三、北進與中國出兵 | 北進為何把勝利期待變成更大的戰爭？ | 7 |
| 四、戰線逆轉及陣地戰 | 戰線再度南移後，為何逐漸變成陣地戰？ | 7 |
| 五、戰俘問題與停戰談判 | 為何談了兩年，戰俘問題還能阻擋停戰？ | 8 |

`initial` 與 `baseline` 均為 `d0625a-invasion`，`compare` 為 `d0727-armistice`。第一次按比較，既有閱讀器預設 A 為停戰、B 為開戰，可自由調換。沒有虛構 6 月 24 日的外交或軍事事件；戰前日本殖民、美蘇分區受降、1948 年兩政權及三八線放在第一筆背景。日級事件模型沒有「開戰前一刻」截面，因此基準的圖說明確說明戰前分界，事件紅點仍代表 25 日進攻。兩時點以文字和地點比較，並不提供兩條分界線的幾何比較。

每筆均有三層解說的全部欄位、事件來源、明示「假設」與「限制」的反事實段落。因果 ID 只指向已發生事件；各筆直接原因與影響說明具體機制。軍事行動未用兩國首都間的箭頭替代；`edges` 留空。這不影響由 `causes` 支援的因果卡片與跳轉。

## 來源取得程度

優先使用原件／文獻編輯及公立博物館；政府或軍方資料也有立場，沒有把官方敘事當成唯一解釋。以下「全文」表示本次已用網路工具實際開啟並讀到網頁正文或 PDF 文字；不表示已逐份檢查作者引用的所有底層檔案。

- **已開啟全文**：美國國家檔案館停戰原文與說明；杜魯門圖書館 1950-06-27 聲明、1951-04-11 解職命令；艾森豪圖書館就職紀事；美國外交文件集開城、板門店、巨濟島、休會、法律立場、1953 年提案、戰俘條款及李承晚放俘文書；Wilson Center 解密中蘇朝電報譯文；韓國戰爭紀念館、英國國家陸軍博物館、澳洲戰爭紀念館；普立茲獎網站完整保存的美聯社老斤里系列；韓國國史編纂委員會相關檔案解題。
- **軍史原站受限、改讀保存全文**：`history.army.mil` 對本次開啟多回應 403。早期作戰、聯軍反攻、中國介入與恢復均勢四冊均改讀美國政府出版局 GPO／GovInfo 保存的同一官方 PDF，事件來源直接連到這些檔案。
- **僅取得搜尋索引或部分文字，開啟受限**：聯合國第 82、84 號決議頁／PDF、大會第五屆會議索引；陸軍第五階段紀事；中國軍網 10 月 19 日紀事；海軍長津湖、興南撤退與丹尼爾文書解題；陸軍大學砥平里頁。本次直接開啟遭 403、逾時或 502，不記成已讀原件全文。決議及作戰日期另用已開啟的圖書館、戰史與博物館交叉核對；開城、小交換及停戰談判另有外交文書佐證。這些連結保留供讀者追查，網站可及性未保證。
- **老斤里原始調查報告**：公共檔案鏡像約 33 MB，網路閱讀工具因大小拒絕開啟完整 PDF，只讀到搜尋索引的執行摘要與訪談說明。已讀美聯社保存全文及韓方檔案解題交叉呈現分歧；沒有聲稱完成美韓全部調查卷宗查閱。美聯社頁是當事人訪談與檔案調查報導，並非法院判決。
- 本版主要戰術敘事仍倚重美軍官方戰史；中國檔案多經中蘇電報與翻譯取得，北韓內部檔案、韓國平民口述及法國營逐日戰報不完整。每筆 `primary` 說明原始材料或取得缺口，不把館藏解題冒充全部原件。

## 關鍵日期、爭議與採用方式

全篇日期使用西曆；無農曆或革命曆換算。作戰採朝鮮當地日期，紐約、華盛頓文書採原件所在地日期，不把跨時區同時發生的事一律硬改成同一日。只有年月的背景敘述不另造日級事件。

| 問題 | 採用方式與交叉查核 |
| --- | --- |
| 誰發動全面戰爭 | 1950-06-25 北韓協同南侵。戰前雙方暴力與內戰因素納入背景；Wilson Center 蘇聯電報與韓、澳館方敘述共同支持事先策畫的全面進攻，不將兩方統一主張等同當日發動責任。 |
| 同日事件 | `d0625a-invasion` 先於 `d0625b-un82`，決議由入侵促成；按 ID 保證排序。日級參與方身分同日共用，UN 的立場特別註明決議是入侵後才通過。 |
| 6 月 27 日海空援韓 | 公開聲明早於同日在紐約較晚通過的第 83 號決議，不把後者寫成前者的直接原因；6 月 30 日地面部隊授權另在背景交代。 |
| 首爾第一次失守、烏山 | 6 月 28 日失守，7 月 5 日烏山首戰。紀念館英文展文混用「抵達」與首戰，本版用陸軍戰史區分部隊先抵達與後交戰，不採「5 日才首次到朝鮮」。 |
| 釜山防線 | 8 月 4 日採較集中的防禦圈形成節點；不把 8 至 9 月變動的陣地畫成一條永久線。 |
| 仁川與首爾 | 9 月 15 日登陸、16 日第八軍反攻、28 日首爾控制恢復、29 日交還典禮。麥克阿瑟較早的成功宣告與仍在市街戰不混同。 |
| 越三八線與大會決議 | 10 月 1 日南韓部隊先越線，10 月 7 日大會決議在後。美國 9 月底的附條件軍令、聯合國政治決議與各部隊行動分開，不建倒置因果。 |
| 中國出兵 | 10 月 19 日主力越江、25 日首次攻擊南韓部隊、11 月 1 日雲山攻擊美軍分開。中方紀念日與韓國館方相互核對；中蘇電報說明此前集結、反覆權衡及求援，不把出兵全歸因於惠山抵江。 |
| 鴨綠江與兩大戰場 | 11 月 21 日美軍先頭至惠山；25 日清川江方向大反攻；27 日長津湖開戰。西部第八軍與東部第十軍不合成同一作戰線，抵江點不代表全邊境已被控制。 |
| 興南 | 起算有 9 日命令、10 日主要接運等口徑，採較一致的 12 月 24 日完成。約九萬平民只代表此次海運，不當作全戰爭流離人數，也不由撤退者代表所有北方平民政治立場。 |
| 首爾後兩次易手 | 1951 年 1 月 3 日撤離與 4 日中朝占領分開。3 月收復在 14 日夜至 15 日，陸軍戰史與韓國館方用語不同；事件採開始日 14 日，標題、正文、參與方身分均明示跨夜。 |
| 老斤里 | 1950 年 7 月 26–29 日，取開始日，保留美軍調查、美聯社證言與韓方檔案入口。人數、射擊命令鏈及空襲責任不假定已完全解決；不以滲透疑慮合理化對整群平民射擊。 |
| 開城及板門店 | 1951-07-10 代表團開會，與 8 日聯絡預備會分開；10 月 25 日在板門店復談。11 月 27 日暫定分界附期限，非 1953 年最終 MDL。李奇微 10 日與 25 日原電報提供會議時序。 |
| 戰俘 | 1952-05-07 多德被扣押，10 日獲釋；10 月 8 日無限期休會。拒返可能涉及真實恐懼，也可能受營內政治暴力脅迫；不把甄別數字直接當成自由公投。美方法律論證與中朝提案對讀。 |
| 小交換與最終戰俘方案 | 1953-04-20 傷病交換開始，6 月 8 日簽中立遣返職權條款；不混為全部戰俘當日獲釋。遣返委員會（五國、印度提供看管）與停戰監察委員會（原四國）分開。 |
| 李承晚放俘 | 1953-06-18；外交紀事當日約 25,000 與後續常用約 27,000 不採單一精確口徑。私函與公開聲明交叉呈現戰俘理由、分治反對及對盟友指揮權的施壓。 |
| 停戰簽署與生效 | 1953-07-27 上午 10 時簽署，22 時停火；按原文第 12、63 款。撤出 DMZ 的 72 小時期限另依第 13 款，不寫成簽字當天已全部撤離。 |
| 簽署主體 | 聯合國軍司令一方，人民軍最高司令與志願軍司令另一方；克拉克、金日成、彭德懷為指揮官，現場代表哈里森與南日。南韓未簽。南韓軍官曾參與代表團不等於南韓另列名簽署；蘇聯有影響力也不是簽署方。 |
| 停戰與和平條約 | 依協定前言、第四條第 60 款與第 62 款，停戰停止軍事敵對、等待政治解決；不是完成統一、締結全面和平或最終處理所有主權與海界。 |

## 製圖依據、有效日期與授權

唯一實際載入的地理幾何為共用 [Natural Earth 1:110m Land](https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/)，[公共領域條款](https://www.naturalearthdata.com/about/terms-of-use/)。未載入、描摹或再散布軍史圖像。文字與點位為編者整理；地名已由事件來源核對，座標為城市／聚落／戰區近似定位，非檔案館測量資料。

| 已參照的歷史資料 | 日期或時段 | 本版處理 |
| --- | --- | --- |
| 《戰爭爆發》入侵圖、釜山防禦敘述 | 圖題 1950-06-25 至 08-04；8 月 4 日防禦圈 | 圖涵蓋一段推進過程，不能整張當成某日截面；用大田、倭館、仁川等點位。 |
| 《聯合國軍攻勢》首爾及平壤作戰圖 | 1950 年 9–10 月；平壤圖 10 月 15–19 日 | 用襄陽、首爾及文字解說，不擷取未校準線形。 |
| 《中國介入》作戰圖與紀事 | 1950 年 11 月至 1951 年 1 月 | 分清惠山、清川江、長津湖、興南，不以關鍵點相連臆畫連續戰線。 |
| 《恢復均勢》反攻圖與印刷頁 25 的防線描述 | 1951-02-20 至 04-22 圖；6 月防禦部署敘述 | 6 月戰線西部在三八線以南、東部在其北；只作文字比較，未畫 1953 最終線。 |
| 停戰原文第一條及附圖指引 | 1953-07-27 22 時起；各側 2 公里與撤離期限依原文 | 分界條款有日期與原件依據，但尚無逐線地理校準及向量資料；未畫 MDL／DMZ，亦不推導海上界線。 |

**沒有可交付的歷史線形或路線資料**：本次未完成原圖逐件權利、改作條件、地理校準及截面有效日期的全部查核，因此 `boundaries: []`，事件無 `overlays`，不啟用國界或戰線圖層。此為資料缺口，不是宣稱上述年代沒有戰線。自然海岸不代表政治疆界；軍事占領不代表主權移轉；空心點是過去事件，不能連成當日控制區。三八線、戰線、MDL、DMZ 的差異在導讀、全域製圖說明與停戰事件重複提示。

首爾、平壤標籤為固定首都代表點，並不隨政府撤離而自動移動；中國、蘇聯、美國、聯合國等點也不是朝鮮戰場軍部。平民與戰俘不是國家，以隱藏地圖標籤及事件中的群體按鈕提供分時解說。地圖「相關國家」為共用閱讀器既有標題，其下可包括非國家行動者，身分正文已明示。紐約、華盛頓事件在區域外，閱讀器會切換事件周邊。

## 檢查及匯出

- 本機原 PATH 沒有 Node／npm。使用既有 Node v24.22.3，將 npm 10.9.2 官方套件解至 `/tmp/atlas-npm`，以 `/tmp/atlas-tools` 的暫存命令入口執行；未新增 repo 依賴或 lockfile。
- `npm test`：通過。建置列出 6 套教材；既有一戰地理核對、780／540／375px 模擬 DOM 操作與德國教材回歸通過；8 項 Node 測試均通過。新增韓戰測試檢查日期、同日順序、越線與決議因果、三八線／MDL／DMZ、停戰生效、戰俘機制、分時身分及首頁入口。
- `npm run export -- korean-war`：通過，產生 `exports/korean-war.html`。完整站點入口為 `site/index.html`，教材頁為 `site/korean-war/index.html`。
- **實際 Chrome（Playwright，非模擬 DOM）**：1440×1000 與 375×812 均從首頁進入，逐步按過全部 34 事件；確認同日 6 月 25 日順序、章節導覽、三層解說、來源索引、前因與後果跳轉、比較的預設與自選 A／B、兩張 SVG、導讀及重設。桌面另測側欄重設，窄螢幕用使用指南中的重設。未出現頁面水平溢出或 JavaScript 錯誤。
- 實際查看桌面、375px 深入解說與比較截圖；窄螢幕比較採上下堆疊，第二面板須在對話框內捲動。比對文字可讀，內容沒有被省略。較寬戰區事件點不會被誤畫為連續線。
- 單檔匯出以 `file://` 實際開啟，載入及比較成功，沒有 HTTP(S) 網路請求；點外部史料仍需連線。
- 截圖及臨時瀏覽器檢查程式保存在 `/tmp/korean-*.png`、`/tmp/atlas-browser.cjs`，屬本機驗證證據，不是需提交的來源檔。未測實體手機、Safari、Firefox，亦未部署或檢查 GitHub Pages 線上新版本。

## 逐事件來源索引

以下與 `events.json` 同步，連到具體文書、文章或單冊軍史，不使用機構首頁替代證據。原始材料與二手軍史的性質見各筆 `primary` 及上方取得程度說明。

| 日期 | 事件 | 來源 |
| --- | --- | --- |
| 1950-06-25 | 北韓全面南侵：三八線上的分治變成大戰 | [美國陸軍軍史中心｜戰爭爆發（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111422/pdf/GOVPUB-D114-PURL-gpo111422.pdf)；[韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en)；[Wilson Center｜俄國解密文件、譯文與研究（印刷頁 30–125）](https://www.wilsoncenter.org/sites/default/files/media/documents/publication/Bulletin6-7_Korea.pdf) |
| 1950-06-25 | 安理會要求北韓停止進攻並退回三八線 | [聯合國數位圖書館｜安理會第 82 號決議](https://digitallibrary.un.org/record/112025)；[澳洲戰爭紀念館｜韓戰概述](https://www.awm.gov.au/articles/atwar/korea) |
| 1950-06-27 | 杜魯門公開下令海空援韓 | [杜魯門圖書館｜1950-06-27 總統聲明原文](https://www.trumanlibrary.gov/library/public-papers/173/statement-president-situation-korea) |
| 1950-06-28 | 首爾第一次失守，逃難者湧向漢江 | [美國陸軍軍史中心｜戰爭爆發（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111422/pdf/GOVPUB-D114-PURL-gpo111422.pdf)；[韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en) |
| 1950-07-05 | 烏山交戰：美國地面部隊投入仍無法止住南進 | [美國陸軍軍史中心｜戰爭爆發（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111422/pdf/GOVPUB-D114-PURL-gpo111422.pdf)；[韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en) |
| 1950-07-07 | 安理會建議由美國領導統一司令部 | [聯合國數位圖書館｜安理會第 84 號決議原文](https://digitallibrary.un.org/record/112027/files/S_RES_84%281950%29-EN.pdf?ln=en)；[澳洲戰爭紀念館｜韓戰概述](https://www.awm.gov.au/articles/atwar/korea) |
| 1950-07-20 | 大田失守：遲滯戰換來增援時間 | [美國陸軍軍史中心｜戰爭爆發（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111422/pdf/GOVPUB-D114-PURL-gpo111422.pdf) |
| 1950-07-26 | 老斤里平民遭美軍射擊：逃難也可能致命 | [美國陸軍｜老斤里調查報告原件（公共檔案鏡像）](https://upload.wikimedia.org/wikipedia/commons/8/8f/US_Department_of_the_Army_No_Gun_Ri_Review.pdf)；[韓國國史編纂委員會｜老斤里相關美國參謀長聯席會議檔案解題](https://db.history.go.kr/contemp/level.do?levelId=fs_029_0010_0040)；[美聯社｜老斤里調查報導與證言（普立茲獎保存）](https://www.pulitzer.org/winners/sang-hun-choe-charles-j-hanley-and-martha-mendoza) |
| 1950-08-04 | 釜山環形防線形成：保住補給入口 | [美國陸軍軍史中心｜戰爭爆發（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111422/pdf/GOVPUB-D114-PURL-gpo111422.pdf) |
| 1950-09-15 | 仁川登陸：從北韓軍隊後方切入 | [美國陸軍軍史中心｜聯合國軍攻勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo126577/pdf/GOVPUB-D114-PURL-gpo126577.pdf)；[韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en) |
| 1950-09-16 | 第八軍從釜山防禦圈展開反攻 | [美國陸軍軍史中心｜聯合國軍攻勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo126577/pdf/GOVPUB-D114-PURL-gpo126577.pdf) |
| 1950-09-28 | 首爾再由美韓部隊控制 | [韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en)；[美國陸軍軍史中心｜聯合國軍攻勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo126577/pdf/GOVPUB-D114-PURL-gpo126577.pdf) |
| 1950-10-01 | 南韓部隊先越過三八線 | [韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en)；[美國陸軍軍史中心｜聯合國軍攻勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo126577/pdf/GOVPUB-D114-PURL-gpo126577.pdf) |
| 1950-10-07 | 聯合國大會支持統一與重建方向 | [聯合國｜大會第五屆會議索引：第 376（V）號決議](https://www.un.org/sites/un2.un.org/files/2021/03/a5_0_0.pdf)；[美國陸軍軍史中心｜聯合國軍攻勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo126577/pdf/GOVPUB-D114-PURL-gpo126577.pdf) |
| 1950-10-19 | 中國人民志願軍越江入朝 | [韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en)；[中國軍網｜1950-10-19 越過鴨綠江紀事](https://eng.chinamil.com.cn/2020special/2020-10/13/content_9917787.htm)；[Wilson Center｜俄國解密文件、譯文與研究（印刷頁 30–125）](https://www.wilsoncenter.org/sites/default/files/media/documents/publication/Bulletin6-7_Korea.pdf) |
| 1950-10-25 | 志願軍首次攻擊：溫井、雲山周邊出現新敵手 | [美國陸軍軍史中心｜聯合國軍攻勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo126577/pdf/GOVPUB-D114-PURL-gpo126577.pdf)；[美國陸軍軍史中心｜中國介入（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111375/pdf/GOVPUB-D114-PURL-gpo111375.pdf) |
| 1950-11-21 | 美軍先頭部隊抵惠山鎮鴨綠江岸 | [美國陸軍軍史中心｜中國介入（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111375/pdf/GOVPUB-D114-PURL-gpo111375.pdf) |
| 1950-11-25 | 清川江方向大反攻，聯軍西翼崩退 | [美國陸軍軍史中心｜中國介入（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111375/pdf/GOVPUB-D114-PURL-gpo111375.pdf) |
| 1950-11-27 | 長津湖戰役開始：包圍、嚴寒與突圍 | [美國陸軍軍史中心｜中國介入（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111375/pdf/GOVPUB-D114-PURL-gpo111375.pdf)；[美國海軍歷史與遺產司令部｜長津湖與興南撤退照片、作戰紀事](https://www.history.navy.mil/content/history/nhhc/browse-by-topic/wars-conflicts-and-operations/korean-war/korea-operations/chosin-reservoir.html) |
| 1950-12-24 | 興南撤退完成，軍人與難民一同南下 | [美國海軍歷史與遺產司令部｜興南與鎮南浦撤退](https://www.history.navy.mil/content/history/nhhc/research/library/online-reading-room/title-list-alphabetically/h/the-hungnam-and-chinnampo-evacuations.html)；[美國海軍歷史與遺產司令部｜長津湖與興南撤退照片、作戰紀事](https://www.history.navy.mil/content/history/nhhc/browse-by-topic/wars-conflicts-and-operations/korean-war/korea-operations/chosin-reservoir.html)；[英國國家陸軍博物館｜韓戰與平民、陣地戰](https://www.nam.ac.uk/explore/korean-war) |
| 1951-01-04 | 中朝軍隊占領首爾，居民再度逃難 | [美國陸軍軍史中心｜中國介入（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo111375/pdf/GOVPUB-D114-PURL-gpo111375.pdf)；[英國國家陸軍博物館｜韓戰與平民、陣地戰](https://www.nam.ac.uk/explore/korean-war) |
| 1951-02-13 | 砥平里守住：聯軍找到抵擋中國攻勢的方法 | [美國陸軍軍史中心｜恢復均勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo92564/pdf/GOVPUB-D114-PURL-gpo92564.pdf)；[美國陸軍大學出版社｜砥平里戰役與文獻表](https://www.armyupress.army.mil/Films/Korea-Chipyong-ni/) |
| 1951-03-14 | 首爾第四次易手：14 日夜至 15 日聯軍入城 | [美國陸軍軍史中心｜恢復均勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo92564/pdf/GOVPUB-D114-PURL-gpo92564.pdf)；[韓國戰爭紀念館｜韓戰事件與檔案照片](https://artsandculture.google.com/story/the-korean-war-chronicles-of-trials-and-overcoming-war-memorial-of-korea/ZAXBgUq2g9izbQ?hl=en) |
| 1951-04-11 | 杜魯門撤換麥克阿瑟：限制戰爭目標 | [杜魯門圖書館｜1951-04-11 解除麥克阿瑟指揮權聲明及命令](https://www.trumanlibrary.gov/library/public-papers/77/statement-and-order-president-relieving-general-macarthur-his-commands) |
| 1951-04-22 | 春季攻勢與臨津江戰鬥：首爾再受威脅 | [澳洲戰爭紀念館｜官方戰史：臨津江與加平戰況](https://www.awm.gov.au/articles/encyclopedia/kapyong/doc)；[美國陸軍軍史中心｜恢復均勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo92564/pdf/GOVPUB-D114-PURL-gpo92564.pdf) |
| 1951-06-23 | 蘇聯提出停火談判訊號 | [美國陸軍軍史中心｜恢復均勢（GPO 保存全文）](https://www.govinfo.gov/content/pkg/GOVPUB-D114-PURL-gpo92564/pdf/GOVPUB-D114-PURL-gpo92564.pdf)；[Wilson Center｜俄國解密文件、譯文與研究（印刷頁 30–125）](https://www.wilsoncenter.org/sites/default/files/media/documents/publication/Bulletin6-7_Korea.pdf) |
| 1951-07-10 | 開城停戰談判開始，戰鬥並未停止 | [美國外交文件集｜1951-07-10 李奇微談開城首會與採訪安排](https://history.state.gov/historicaldocuments/frus1951v07p1/d426)；[美國外交文件集｜1951-07-10 駐韓大使對南韓反對停戰的報告](https://history.state.gov/historicaldocuments/frus1951v07p1/d423)；[美國陸軍軍史中心｜第五階段紀事：1951–1953](https://history.army.mil/portals/143/Images/Publications/catalog/19-5.pdf)；[英國國家陸軍博物館｜韓戰與平民、陣地戰](https://www.nam.ac.uk/explore/korean-war) |
| 1951-10-25 | 板門店復談：以接觸線而非三八線協商 | [美國外交文件集｜1951-10-25 復談電報](https://history.state.gov/historicaldocuments/frus1951v07p1/d656)；[美國陸軍軍史中心｜第五階段紀事：1951–1953](https://history.army.mil/portals/143/Images/Publications/catalog/19-5.pdf) |
| 1952-05-07 | 巨濟島戰俘扣押營長，遣返爭議進入營區 | [美國外交文件集｜巨濟島事件與 1952-05-14 會議紀錄](https://history.state.gov/historicaldocuments/frus1952-54v15p1/d118) |
| 1952-10-08 | 戰俘遣返僵局使正式談判無限期休會 | [美國外交文件集｜1952-10-08 休會與艾奇遜聲明](https://history.state.gov/historicaldocuments/frus1952-54v15p1/d287)；[美國外交文件集｜1953-04-08 美國對戰俘遣返的法律論證](https://history.state.gov/historicaldocuments/frus1952-54v15p1/d453)；[美國外交文件集｜1953-05-07 中朝方中立國提案原文](https://history.state.gov/historicaldocuments/frus1952-54v15p1/d501) |
| 1953-04-20 | 小交換開始：先遣返傷病戰俘 | [美國海軍檔案館｜丹尼爾談判文件與小交換紀錄](https://www.history.navy.mil/research/archives/Collections/personal-donated-collections/pd-d/daniel-john-c.html)；[美國外交文件集｜1953-04-08 美國對戰俘遣返的法律論證](https://history.state.gov/historicaldocuments/frus1952-54v15p1/d453) |
| 1953-06-08 | 戰俘條款簽定：拒返者交由中立機制處理 | [美國外交文件集｜1953-06-08 戰俘條款簽署](https://history.state.gov/historicaldocuments/frus1952-54v15p1/d581)；[美國外交文件集｜1953-05-07 中朝方中立國提案原文](https://history.state.gov/historicaldocuments/frus1952-54v15p1/d501)；[美國國家檔案館｜1953-07-27 停戰協定影像與全文](https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state) |
| 1953-06-18 | 李承晚單方面放俘，盟友間也有停戰衝突 | [美國外交文件集｜1953-06-18 李承晚致克拉克及公開聲明](https://history.state.gov/historicaldocuments/frus1952-54v15p2/d607)；[美國外交文件集｜1953-06-18 放俘規模與談判反應](https://history.state.gov/historicaldocuments/frus1952-54v15p2/d606) |
| 1953-07-27 | 停戰簽署，22 時停火：分界安排不等於和平條約 | [美國國家檔案館｜1953-07-27 停戰協定影像與全文](https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state)；[美國外交文件集｜1953-06-18 李承晚致克拉克及公開聲明](https://history.state.gov/historicaldocuments/frus1952-54v15p2/d607) |
