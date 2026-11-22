/* Historical atlas SVG map. Geometry and chronological evidence live in separate files. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const rad = Math.PI / 180;
  const hosts = new WeakMap(), geometryCache = new WeakMap();
  let serial = 0;
  // Label anchors are geographic coordinates. Capitals serve as endpoints only for diplomatic links.
  const catalog = {
    DE:['德意志帝國','GERMANY',10.1,51.2,13.405,52.52], AH:['奧匈帝國','AUSTRIA-HUNGARY',17.0,47.4,16.37,48.21],
    RS:['塞爾維亞','SERBIA',21.4,43.2,20.46,44.81], RU:['俄羅斯帝國','RUSSIAN EMPIRE',34.6,54.1,30.32,59.94],
    FR:['法國','FRANCE',2.1,46.8,2.35,48.86], GB:['英國','UNITED KINGDOM',-3.1,54.25,-0.13,51.51],
    BE:['比利時','BELGIUM',4.55,50.65,4.35,50.85], IT:['義大利','ITALY',12.05,43.2,12.5,41.9],
    OT:['鄂圖曼帝國','OTTOMAN EMPIRE',33.3,39.1,28.98,41.01], US:['美國','UNITED STATES',-98,37.8,-77.04,38.9],
    JP:['日本','JAPAN',138.7,36.7,139.69,35.69], NL:['荷蘭','NETHERLANDS',5.56,52.5,4.9,52.37],
    CH:['瑞士','SWITZERLAND',8.0,46.7,7.45,46.95], LU:['盧森堡','LUXEMBOURG',6.1,49.8,6.13,49.61],
    DK:['丹麥','DENMARK',9.5,56.2,12.57,55.68], SE:['瑞典','SWEDEN',14.5,59.1,18.07,59.33],
    NO:['挪威','NORWAY',8.35,60.85,10.75,59.91], FI:['芬蘭','FINLAND',26.6,63.5,24.94,60.17],
    ES:['西班牙','SPAIN',-3.35,40.35,-3.7,40.42], PT:['葡萄牙','PORTUGAL',-8.05,39.7,-9.14,38.72],
    RO:['羅馬尼亞','ROMANIA',26.5,45.7,26.1,44.43], BG:['保加利亞','BULGARIA',25.5,42.9,23.32,42.7],
    GR:['希臘','GREECE',22.25,39.3,23.73,37.98], ME:['蒙特內哥羅','MONTENEGRO',19.2,42.8,18.92,42.39],
    AL:['阿爾巴尼亞','ALBANIA',20.05,40.85,19.82,41.33], AT:['奧地利','AUSTRIA',14.4,47.5,16.37,48.21],
    HU:['匈牙利','HUNGARY',19.5,47.1,19.04,47.5], PL:['波蘭','POLAND',20.1,52.1,21.01,52.23],
    CZ:['捷克斯洛伐克','CZECHOSLOVAKIA',18.5,49.15,14.44,50.08], YU:['塞克斯王國','KINGDOM OF SCS',18.8,44.25,20.46,44.81],
    UA:['烏克蘭','UKRAINE',31.25,49.55,30.52,50.45], EE:['愛沙尼亞','ESTONIA',25.5,58.7,24.75,59.44],
    LV:['拉脫維亞','LATVIA',25.1,56.95,24.1,56.95], LT:['立陶宛','LITHUANIA',24,55.25,25.28,54.69],
    MA:['摩洛哥','MOROCCO',-5.8,32.1,-6.84,34.02], EG:['埃及','EGYPT',29.4,27.2,31.24,30.04],
    DZ:['阿爾及利亞','ALGERIA',2.1,31.8,3.05,36.75], TN:['突尼西亞','TUNISIA',9.65,34,10.18,36.81],
    LY:['利比亞','LIBYA',17.3,28.6,13.19,32.89], IR:['波斯','PERSIA',54,32,51.4,35.7],
    CN:['中國','CHINA',106,35,116.4,39.9], CA:['加拿大','CANADA',-96,56,-75.7,45.4],
    AU:['澳洲','AUSTRALIA',134,-25,144.96,-37.81], NZ:['紐西蘭','NEW ZEALAND',172,-41,174.8,-41.29],
    BR:['巴西','BRAZIL',-52,-10,-43.2,-22.9], IN:['英屬印度','BRITISH INDIA',78,23,77.2,28.6],
    MX:['墨西哥','MEXICO',-102,23,-99.13,19.43], BA:['波士尼亞與赫塞哥維納','BOSNIA',17.9,44.0,18.41,43.86],
    MC:['摩納哥','MONACO',7.42,43.73,7.42,43.73], AD:['安道爾','ANDORRA',1.58,42.55,1.52,42.51],
    SM:['聖馬利諾','SAN MARINO',12.45,43.94,12.45,43.94], LI:['列支敦斯登','LIECHTENSTEIN',9.55,47.15,9.52,47.14],
    IS:['冰島','ICELAND',-18.6,65,-21.94,64.15], IE:['愛爾蘭','IRELAND',-8.0,53.4,-6.26,53.35]
  };
  Object.assign(catalog,{
    MT:['馬爾他','MALTA',14.4,35.9,14.51,35.9],CY:['賽普勒斯','CYPRUS',33.1,35,33.36,35.19],
    DAN:['但澤','DANZIG',18.65,54.35,18.65,54.35],
    BA1:['波士尼亞','BOSNIA',17.8,44.2,18.41,43.86],BA2:['赫塞哥維納','HERZEGOVINA',17.8,43.25,17.81,43.34]
  });
  const aliases = {
    'germany':'DE','german empire':'DE','german republic':'DE','deutsches reich':'DE','weimar republic':'DE',
    'austria hungary':'AH','austro-hungarian empire':'AH','austria-hungary':'AH','austrian empire':'AH','austro-hungary':'AH',
    'united kingdom':'GB','britain':'GB','great britain':'GB','united kingdom of great britain and ireland':'GB',
    'united kingdom of great britain':'GB','russia':'RU','russian empire':'RU','soviet russia':'RU','russian sfsr':'RU',
    'turkey':'OT','turkey (ottoman empire)':'OT','ottoman empire':'OT','ottoman':'OT','kingdom of italy':'IT',
    'serbia':'RS','kingdom of serbia':'RS','united states of america':'US','united states':'US','france':'FR','belgium':'BE',
    'yugoslavia':'YU','kingdom of serbs, croats and slovenes':'YU','kingdom of serbs croats and slovenes':'YU',
    'czech republic':'CZ','czechoslovakia':'CZ','romania':'RO','rumania':'RO','roumania':'RO','iran':'IR','persia':'IR',
    'bosnia and herzegovina':'BA', 'ukrainian peoples republic':'UA', 'netherlands':'NL','the netherlands':'NL'
  };
  Object.entries(catalog).forEach(([c,v])=>{const key=v[1].toLowerCase();if(!aliases[key]) aliases[key]=c;});
  const palette={central:'#d0b487', allied:'#93b9af', neutral:'#e8e2cf', post:'#d9ddc8'};
  const action={
    tension:['外交矛盾','#9c5d48','2 5','tensions'],support:['外交支持','#316f68','7 5','tensions'],
    alliance:['結盟','#507267','10 3 2 3','alliances'],mobilize:['動員','#826591','3 3','war'],
    ultimatum:['最後通牒','#ae7229','8 3 2 3','war'],declare:['宣戰','#ae4536','','war'],
    attack:['進攻方向','#ac4936','','attacks'],battle:['戰役','#994735','','battles'],
    front:['戰線','#945952','5 4','fronts'],territory:['領土變動','#88632e','4 3','territory'],
    politics:['政治事件','#685648','','always'],peace:['停戰／和約','#546f68','6 4','always']
  };
  // Interwar names and war entry/exit dates affect fill, not the historical geometry.
  const joined={AH:['1914-07-28','1918-11-04','central'],RS:['1914-07-28','1918-11-11','allied'],
    DE:['1914-08-01','1918-11-11','central'],RU:['1914-08-01','1917-12-15','allied'],
    FR:['1914-08-03','1918-11-11','allied'],BE:['1914-08-04','1918-11-11','allied'],
    GB:['1914-08-04','1918-11-11','allied'],JP:['1914-08-23','1918-11-11','allied'],
    OT:['1914-10-29','1918-10-31','central'],IT:['1915-05-23','1918-11-11','allied'],
    BG:['1915-10-14','1918-09-30','central'],US:['1917-04-06','1918-11-11','allied'],
    PT:['1916-03-09','1918-11-11','allied'],GR:['1917-06-30','1918-11-11','allied'],
    ME:['1914-08-05','1918-11-11','allied'],CN:['1917-08-14','1918-11-11','allied'],BR:['1917-10-26','1918-11-11','allied']};
  function bloc(c,d,id){
    if(id==='j18'&&c==='FR'||id==='j20'&&c==='GB')return 'neutral';
    if(d<'1914-07-28'){
      if(['AH','DE'].includes(c)&&d>='1879-10-07'||c==='IT'&&d>='1882-05-20') return 'central';
      if(['FR','RU'].includes(c)&&d>='1894-01-04'||c==='GB'&&d>='1904-04-08') return 'allied';
      return 'neutral';
    }
    if(c==='RO') return (d>='1916-08-27'&&d<'1917-12-09'||d==='1918-11-10')?'allied':'neutral';
    if(['CA','AU','NZ','South Africa'].includes(c)&&d>='1914-08-04'&&d<'1918-11-11'&&id!=='j20')return 'allied';
    const span=joined[c];return span&&d>=span[0]&&d<span[1]?span[2]:'neutral';
  }
  const pre={
    AH:'維也納重視帝國在巴爾幹的地位。1879 年起與德國結盟，又與俄國競逐東南歐影響力。',
    DE:'德國位居歐洲中部，東西兩側都有陸上大國。柏林要避免法國找到能與它夾擊德國的盟友。',
    RS:'塞爾維亞民族主義者主張南斯拉夫人聯合。貝爾格勒政府同時要顧及軍中民族主義者，以及鄰近帝國的反應。',
    FR:'法國關切東部邊境與亞爾薩斯－洛林；尋找夥伴，也有避免外交孤立的考量。',
    GB:'英國著重海上安全、歐陸均勢與帝國交通線。外交協約仍留有由內閣決定是否參戰的空間。',
    IT:'義大利既與法國在地中海競爭，也對奧匈統治下的部分地區提出民族領土主張。',
    RU:'俄國關注巴爾幹、黑海出口與西部邊境安全。支持塞爾維亞牽涉大國聲望與戰略利益。',
    BE:'比利時的永久中立受 1839 年條約保障。法德之間的地理位置使這項保障在危機中格外重要。',
    OT:'鄂圖曼政府力求維持海峽與其餘領土的控制。巴爾幹問題同時牽動帝國與俄奧兩國。',
    US:'美國在歐洲同盟之外，仍透過跨大西洋貿易、金融及外交與各國往來。',
    JP:'日本在東亞擴大影響力，1902 年締結英日同盟；日後是否參戰仍需由東京決定。'
  };
  const warNotes={
    AH:'以打擊塞爾維亞、維繫王朝與多民族帝國為目標，東線需要德國援助。',DE:'德國同時面對東西兩線，與奧匈帝國協同作戰。',
    FR:'法國首要任務是抵抗入侵、收復被占領的國土，並與英俄協調。',GB:'英國將海軍、遠征軍與帝國資源投入協約方。',
    RS:'塞軍抵抗奧匈入侵，並依賴協約方支援。',BE:'政府延續對德抵抗；德軍占領比利時大部分地區，法理主權仍屬比利時。',
    RU:'東線作戰使俄國需同時應付德奧軍隊與國內供應壓力。',IT:'1915 年 5 月先對奧匈宣戰，直到 1916 年 8 月才對德宣戰。',
    US:'美國以「協同參戰國」身分加入對德作戰，保有獨立的外交目標。',OT:'黑海軍事行動使帝國加入戰爭；海峽、高加索與阿拉伯地區成為戰場。',
    BG:'對塞爾維亞開戰，戰爭目標與馬其頓的領土爭議密切相關。',RO:'羅馬尼亞希望取得特蘭西瓦尼亞，曾因戰敗停戰，於 1918 年末再參戰。',
    JP:'日本向德國宣戰，將打擊目標集中在德國的青島據點與太平洋島嶼。',ME:'蒙特內哥羅支持塞爾維亞，國土在 1916 年起遭奧匈占領。'
  };
  const otherNames={
    'Hungary and disputed successor territories':'匈牙利與南部過渡地區','India':'印度',
    'Spanish West Africa':'西屬西非','Spanish Morocco':'西屬摩洛哥','Alaska':'阿拉斯加','Sierra Leone':'獅子山',
    'Lagos':'拉哥斯','Oil Rivers Protectorate':'油河保護地','Angola':'安哥拉','Namibia':'西南非洲','Afghanistan':'阿富汗',
    'El Salvador':'薩爾瓦多','Fiji':'斐濟','Brunei':'汶萊',"Cote D'Ivoire":'象牙海岸','Italian Somaliland':'義屬索馬利蘭',
    'Taiwan':'臺灣','Hawaii':'夏威夷','Southern Nigeria':'南奈及利亞','Northern Nigeria':'北奈及利亞',
    'Northeastern Rhodesia':'東北羅德西亞','Northwestern Rhodesia':'西北羅德西亞','Mauritania':'茅利塔尼亞',
    'South Africa':'南非','Zambia':'北羅德西亞','Yemen (Arab Republic of Yemen)':'葉門','Bismarck Archipelago':'俾斯麥群島'
  };
  function localName(code,date,fallback){
    if(code==='DE'&&date>='1918-11-09')return '德國';
    if(code==='RU'&&date>='1917-03-15')return date<'1917-11-07'?'俄國':'蘇維埃俄國';
    if(code==='CS'||code==='CZ')return '捷克斯洛伐克';
    if(code==='SHS'||code==='YU')return '塞爾維亞人、克羅埃西亞人和斯洛維尼亞人王國';
    return catalog[code]?.[0] || otherNames[code] || otherNames[fallback] || fallback || code;
  }
  function country(code,date,fallback,eventId){
    if(code==='CS')code='CZ';if(code==='SHS')code='YU';
    const name=localName(code,date,fallback),side=bloc(code,date,eventId);
    let stance='未列入此教材的兩大陣營', relations=pre[code]||'可對照本日事件與底圖年代，檢視這個政體的位置及周邊關係。';
    if(date<'1914-07-28'){
      if(side==='central')stance=date<'1882-05-20'?'德奧同盟':'三國同盟成員';
      if(side==='allied')stance=code==='GB'&&date<'1907-08-31'?'已締結英法協約':date<'1907-08-31'?'法俄同盟及相關協作':'三國協約陣營';
      if(code==='AH'&&date<'1879-10-07')relations='哈布斯堡王朝治理多民族帝國。巴爾幹民族運動與俄國的區域利益，都是維也納關切的問題。';
      if(code==='JP'&&date<'1902-01-30')relations='日本政府重視國家安全與東亞的國際秩序，尚未與英國締結同盟。';
      if(code==='BE'||['CH','NL','DK','SE','NO','ES'].includes(code)) stance='位於兩大陣營之外';
    }else if(date<'1918-11-11'){
      if(side!=='neutral'){stance=side==='central'?'同盟國作戰方':code==='US'?'與協約國協同參戰':'協約方作戰國';relations=warNotes[code]||'已加入戰爭；實際交戰對象須逐一核對各國宣戰與停戰日期。';}
      else if(code==='IT'&&date<'1915-05-23'){stance=date<'1914-08-02'?'三國同盟成員，尚未參戰':'戰時中立';relations='三國同盟具有防禦性質。羅馬維持選擇空間，又與交戰各方談判領土條件。';}
      else if(code==='RU'&&date>='1917-12-15'){stance=date<'1918-03-03'?'東線停戰':'已簽對同盟國和約';relations='布爾什維克政府尋求退出大戰。停戰先於《布列斯特－立陶夫斯克條約》，之後俄國境內仍有戰事。';}
      else if(joined[code]&&(date<joined[code][0]||eventId==='j18'&&code==='FR'||eventId==='j20'&&code==='GB')){stance='尚未加入這場戰爭';}
      else if(joined[code]&&date>=joined[code][1]){stance='已與協約方停戰';relations='停戰使作戰中止，具體領土與政治安排仍待戰後談判。';}
      else if(['CH','NL','DK','SE','NO','ES','US'].includes(code)){stance='維持中立';}
    }else{
      stance='停戰後的歐洲秩序';relations='1918 年的停戰與戰後和約是不同階段。底圖、軍隊實際控制與條約生效可能各有不同日期。';
      if(code==='DE')relations='德國王朝倒台。巴黎和會擬定的《凡爾賽條約》於 1919 年 6 月簽署，1920 年 1 月生效。';
      if(code==='AH')return {name,stance:'歷史底圖所示的舊帝國',relations:'哈布斯堡帝國已經解體。此輪廓只提供舊疆域的定位參考。'};
      if(code==='AT'||code==='HU'||code==='CZ'||code==='YU'||code==='PL')relations='新政權、國際承認、地方軍事控制與邊界定案分屬不同過程，須配合本日條約或建國事件閱讀。';
      if(code==='OT')relations='鄂圖曼政府於 1918 年停戰，帝國政治生命延續至 1922 年廢除蘇丹制。';
    }
    if(code==='ME'&&date<'1916-01-01'&&side==='allied')relations='蒙特內哥羅支持塞爾維亞，與奧匈交戰。';
    if(code==='BE'&&date<'1914-10-01'&&side==='allied')relations='比利時拒絕德軍借道，軍隊抵抗入侵，並尋求協約方援助。';
    if(code==='RU'&&date>='1917-03-15'&&date<'1917-11-07')relations='沙皇退位後，臨時政府繼續承擔對協約國的作戰承諾，與國內要求和平的力量衝突。';
    if(code==='RU'&&date>='1917-11-07'&&date<'1917-12-15')relations='布爾什維克奪權後尋求和平，尚在推動停止東線戰鬥的交涉。';
    if(['CA','AU','NZ','South Africa'].includes(code)){if(eventId!=='j20'&&date>='1914-08-04'&&date<'1918-11-11'){stance='大英帝國自治領，協約方參戰';relations='英國對德宣戰使自治領一併進入戰時狀態，當地政府自行決定軍事貢獻的規模與形式。';}}
    if(code==='OT'&&date>='1914-08-02'&&date<'1914-10-29')relations='鄂圖曼與德國締結秘密同盟，但公開的交戰行動要到黑海襲擊才展開。';
    // Most recent recorded relationship supplies an event-specific cross-reference.
    const events=window.ATLAS_EVENTS||[],active=events.find(e=>e.id===eventId);
    const happened=e=>e.date<date||e.date===date&&(!active||e.chapter<active.chapter||e.chapter===active.chapter&&e.id<=active.id);
    const past=events.filter(e=>happened(e)&&e.actors?.some(a=>(a==='CS'?'CZ':a==='SHS'?'YU':a)===code)).sort((a,b)=>b.date.localeCompare(a.date)||b.chapter-a.chapter||b.id.localeCompare(a.id));
    const feature=baseFeatures({date}).features.find(f=>(codeOf(f.properties.name)||f.properties.name)===code);
    if(feature?.properties.owner){
      const owner=localName(codeOf(feature.properties.owner),date,feature.properties.owner);
      const status={colony:'殖民地',protectorate:'保護地',occupied:'受占領治理',mandate:'委任統治地'}[feature.properties.status]||'依附領地';
      stance=owner+'所屬／治理 · '+status;
      relations='本期底圖把這塊領地列為'+owner+'的'+status+'。殖民、受保護或遭占領各有不同的法律與治理安排。';
    }
    if(code==='Hungary and disputed successor territories'){stance='奧匈解體後的過渡地區';relations='1918 年秋，舊王國南部的控制與歸屬尚待釐清。面狀圖形只標示資料集圈定的過渡範圍。';}
    if(code==='RS'&&date<'1878-07-13'){stance='鄂圖曼宗主權下的自治公國';relations='塞爾維亞已有自己的政府，正式的國際獨立承認則有待外交協商。';}
    if(code==='AH'&&date<'1879-10-07')relations='哈布斯堡王朝治理多民族帝國。維也納關心帝國內部與巴爾幹的政治秩序。';
    if(past.length)relations+=' 最近相關事件：'+past[0].date+'，'+past[0].title+'。';
    return {name,stance,relations};
  }
  window.atlasCountry=country;
  const cityPoints=[['倫敦',-.13,51.51],['巴黎',2.35,48.86],['柏林',13.405,52.52],['維也納',16.37,48.21],['貝爾格勒',20.46,44.81],['羅馬',12.5,41.90],['華沙',21.01,52.23],['聖彼得堡',30.32,59.94],['布魯塞爾',4.35,50.85],['君士坦丁堡',28.98,41.01],['薩拉耶佛',18.41,43.86],['莫斯科',37.62,55.75]];
  const seaNames=[['北　海',2.3,56.5],['大 西 洋',-13.5,47.8],['黑　海',32.9,43.45],['地 中 海',6.0,39.15],['波 羅 的 海',18.4,56.05],['亞得里亞海',15.25,42.15]];
  const mapSources=[
    ['西線範圍｜Australian War Memorial','https://www.awm.gov.au/collection/E84838'],
    ['逐年戰線圖｜Australian War Memorial','https://www.awm.gov.au/collection/LIB100016965'],
    ['戰前陣營｜Imperial War Museums','https://www.iwm.org.uk/sites/default/files/press-release/4_August_1914_Factsheet.pdf'],
    ['參戰立場｜Canadian War Museum','https://www.warmuseum.ca/firstworldwar/history/going-to-war/origins-and-early-phases/']
  ];
  mapSources.push(['東線戰區｜1914–1918 Online','https://encyclopedia.1914-1918-online.net/article/eastern-front/'],['布魯塞爾占領｜布魯塞爾市歷史年表','https://14-18.bruxelles.be/index.php/en/chronology.html']);
  window.atlasMapSources=mapSources;
  const fnum=n=>Math.round(n*10)/10;
  function el(tag,attrs={},content){
    const node=document.createElementNS(NS,tag);
    for(const [k,v] of Object.entries(attrs)) if(v!==undefined&&v!==null)node.setAttribute(k,v);
    if(content!==undefined)node.textContent=content;
    return node;
  }
  function append(p,tag,attrs,text){const n=el(tag,attrs,text);p.append(n);return n;}
  function codeOf(name){
    const n=String(name||'').toLowerCase().trim();
    return aliases[n]||(/ottoman/.test(n)?'OT':/austr(o|ia)[ -]hung/.test(n)?'AH':null);
  }
  const n=.766, f=Math.cos(48*rad)*Math.tan(Math.PI/4+48*rad/2)**n/n;
  function project(lon,lat,world){
    if(world)return [lon*rad*10000,-lat*rad*10000];
    const theta=n*(lon-14)*rad;
    const rho=f/Math.tan(Math.PI/4+Math.max(-80,Math.min(89.5,lat))*rad/2)**n;
    return [rho*Math.sin(theta)*10000,rho*Math.cos(theta)*10000];
  }
  function geomParts(geometry){
    if(!geometry)return [];
    if(geometry.type==='Polygon')return [geometry.coordinates];
    if(geometry.type==='MultiPolygon')return geometry.coordinates;
    if(geometry.type==='GeometryCollection')return geometry.geometries.flatMap(geomParts);
    return [];
  }
  function makeGeometry(feature,world){
    let pairs=geometryCache.get(feature);if(!pairs){pairs={};geometryCache.set(feature,pairs);}
    const k=world?'world':'region';if(pairs[k])return pairs[k];
    const parts=[];
    for(const polygon of geomParts(feature.geometry)){
      // Antarctica spans the projection seam; its polar cap is outside the European conic domain.
      if(!world&&polygon[0]?.every(coord=>coord[1]<-55))continue;
      let path='',minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
      for(const ring of polygon){
        let poly='';
        for(const [lon,lat] of ring){
          const [x,y]=project(lon,lat,world);minX=Math.min(x,minX);minY=Math.min(y,minY);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
          poly+=(poly?'L':'M')+fnum(x)+','+fnum(y);
        }
        path+=poly+'Z';
      }
      if(path)parts.push({path,minX,minY,maxX,maxY});
    }
    return pairs[k]=parts;
  }
  function roundRectHits(rects,r){return rects.some(b=>r.x<b.x+b.w&&r.x+r.w>b.x&&r.y<b.y+b.h&&r.y+r.h>b.y);}
  function usable(rects,x,y,w,h,W,H){const r={x:x-w/2,y:y-h/2,w,h};if(r.x<5||r.y<5||r.x+w>W-5||r.y+h>H-5||roundRectHits(rects,r))return false;rects.push(r);return true;}
  function bindAction(node,action){
    node.addEventListener('click',action);
    node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action(e);}});
  }
  function canShow(actionType,layers){
    const key=action[actionType]?.[3]||'always';return key==='always'||layers[key]!==false;
  }
  function createDefs(svg,id){
    const defs=append(svg,'defs');
    const hatch=append(defs,'pattern',{id:id+'hatch',patternUnits:'userSpaceOnUse',width:6,height:6,patternTransform:'rotate(35)'});
    append(hatch,'line',{x1:0,x2:0,y1:0,y2:6,stroke:'#61583d','stroke-opacity':.4,'stroke-width':2});
    const texture=append(defs,'pattern',{id:id+'paper',patternUnits:'userSpaceOnUse',width:11,height:11});
    append(texture,'circle',{cx:2.4,cy:1.6,r:.55,fill:'#394b40',opacity:.22});
    append(texture,'circle',{cx:7.4,cy:8.4,r:.4,fill:'#594933',opacity:.23});
    for(const [type,style] of Object.entries(action)){
      const m=append(defs,'marker',{id:id+type,viewBox:'0 0 10 8',refX:8.5,refY:4,markerWidth:8,markerHeight:7,orient:'auto',markerUnits:'userSpaceOnUse'});
      append(m,'path',{d:'M0,0 L10,4 L0,8 L2.2,4 Z',fill:style[1]});
    }
  }
  function baseFeatures(evt){
    const geo=window.ATLAS_GEO||{}, dates=Object.keys(geo).sort();
    const date=dates.filter(v=>v<=evt.date).at(-1)||dates[0];
    return {date,features:geo[date]?.features||[]};
  }
  function render(state){
    const {container,evt,options,id}=state, layers=options.layers||{},bounds=container.getBoundingClientRect();
    const W=Math.max(230,Math.round(bounds.width||720)),H=Math.max(180,Math.round(bounds.height||480));
    state.W=W;state.H=H;
    const {features,date}=baseFeatures(evt);
    const point=evt.point||[14,49],focus=options.view==='focus',far=point[0]<-22||point[0]>55||point[1]<27||point[1]>70;
    const world=options.view==='world'||(focus&&far&&Math.abs(point[0]-14)>65);
    let center=world?[8,20]:[13.3,49.8];
    if(focus)center=point;
    const u=project(...center,world);
    // Fit an identical continental extent in each pane before user zoom.
    const S=(world?Math.min(W/61000,H/29000)*(focus?3.5:1):focus?Math.min(W/3100,H/2250):Math.min(W/5800,H/3900))*state.z;
    const tx=W/2-u[0]*S+state.dx,ty=H*.48-u[1]*S+state.dy;
    const sp=(lon,lat)=>{const [x,y]=project(lon,lat,world);return [x*S+tx,y*S+ty];};
    const topY=-ty/S, leftX=-tx/S, rightX=(W-tx)/S, bottomY=(H-ty)/S;
    const svg=el('svg',{class:'atlas-map-svg',viewBox:'0 0 '+W+' '+H,role:'group','aria-label':evt.date+' '+evt.title+' 歷史互動地圖'});
    append(svg,'title',{},evt.date+'｜'+evt.title);
    createDefs(svg,id);
    append(svg,'rect',{width:W,height:H,fill:'#bad0ce'});
    const geography=append(svg,'g',{transform:'translate('+fnum(tx)+' '+fnum(ty)+') scale('+S+')'});
    const baseLand=window.ATLAS_LAND;
    const landFeatures=baseLand?.features||(baseLand?.geometry?[baseLand]:[]);
    for(const feature of landFeatures){
      const parts=makeGeometry(feature,world).filter(p=>p.maxX>=leftX&&p.minX<=rightX&&p.maxY>=topY&&p.minY<=bottomY);
      if(parts.length)append(geography,'path',{d:parts.map(p=>p.path).join(''),fill:'#e2e2d4',stroke:'#809488','stroke-width':.6,'vector-effect':'non-scaling-stroke','fill-rule':'evenodd','pointer-events':'none'});
    }
    const rendered=new Set(),known=new Map();
    for(const feature of features){
      const prop=feature.properties||{},name=prop.name||prop.NAME||prop.sourceName||'',code=codeOf(name)||name,owner=codeOf(prop.owner);
      const parts=makeGeometry(feature,world).filter(p=>p.maxX>=leftX&&p.minX<=rightX&&p.maxY>=topY&&p.minY<=bottomY);
      if(!parts.length)continue;
      known.set(code,prop);rendered.add(code);
      const isDependency=prop.status&&prop.status!=='independent'&&/colon|protector|occup|mandat|depend/i.test(prop.status);
      const political=bloc(isDependency&&owner?owner:code,evt.date,evt.id);
      const fill=layers.alliances===false?'#e8e2cf':palette[political];
      const node=append(geography,'g',{class:'map-country'+(code===options.selectedCountry?' map-country-picked':''),'data-code':code,role:'button',tabindex:0,'aria-label':localName(code,evt.date,name)});
      const path=parts.map(p=>p.path).join('');
      const involved=evt.actors.includes(code)&&layers.borders!==false;
      append(node,'path',{d:path,'fill-rule':'evenodd',fill,stroke:layers.borders===false?'none':involved?'#6e6753':'#7c816d','stroke-width':involved?1.25:.85,'vector-effect':'non-scaling-stroke','stroke-linejoin':'round'});
      append(node,'title',{},localName(code,evt.date,name)+(prop.owner?' · '+prop.owner:'')+'｜點選查看立場');
      if(isDependency){
        const hatchShape=append(svg,'path',{d:path,transform:geography.getAttribute('transform'),'fill-rule':'evenodd',fill:'none','pointer-events':'none'});
        // Apply hatching inside each polygon in screen-space coordinates.
        const clip=append(svg.querySelector('defs'),'clipPath',{id:id+'dep'+known.size});
        clip.append(hatchShape);
        append(svg,'rect',{width:W,height:H,fill:'url(#'+id+'hatch)','clip-path':'url(#'+id+'dep'+known.size+')','pointer-events':'none'});
      }
      bindAction(node,()=>{if(!state.suppress)options.onCountry?.(code,localName(code,evt.date,name));});
    }
    // Meridian and parallel curves cross land and water without suggesting political borders.
    const grid=append(svg,'g',{'pointer-events':'none',class:'map-graticule',fill:'none',stroke:'#567872','stroke-width':.65,'stroke-opacity':.27});
    function gridPath(coords){append(grid,'path',{d:coords.map(([x,y],i)=>(i?'L':'M')+fnum(x)+' '+fnum(y)).join('')});}
    const step=world?30:5,lo=world?-180:-70,hi=world?180:105,south=world?-80:10,north=world?85:85;
    for(let lon=lo;lon<=hi;lon+=step){const arr=[];for(let lat=south;lat<=north;lat+=2.5)arr.push(sp(lon,lat));gridPath(arr);}
    for(let lat=south;lat<=north;lat+=step){const arr=[];for(let lon=lo;lon<=hi;lon+=2.5)arr.push(sp(lon,lat));gridPath(arr);}
    append(svg,'rect',{width:W,height:H,fill:'url(#'+id+'paper)','pointer-events':'none'});
    if(layers.territory!==false && window.ATLAS_TERRITORIES){
      const key=(evt.id==='p02'||evt.title.includes('凡爾賽條約'))?'alsace':(evt.id==='p11'||evt.id==='p03')?'bosnia':null;
      const territory=window.ATLAS_TERRITORIES[key];
      if(territory){
        const parts=makeGeometry(territory,world);
        const d=parts.map(p=>p.path).join('');
        const clip=append(svg.querySelector('defs'),'clipPath',{id:id+'landchange'});
        append(clip,'path',{d,transform:geography.getAttribute('transform'),'fill-rule':'evenodd'});
        append(svg,'rect',{width:W,height:H,fill:'url(#'+id+'hatch)','clip-path':'url(#'+id+'landchange)','pointer-events':'none'});
        append(svg,'path',{d,transform:geography.getAttribute('transform'),fill:'#d6a35f','fill-opacity':.38,stroke:'#9a622a','stroke-width':1.4,'vector-effect':'non-scaling-stroke','pointer-events':'none'});
      }
    }
    const rects=options.comparison?[]:[{x:0,y:0,w:112,h:44},{x:W-55,y:H-142,w:54,h:122}];
    const edgeElements=append(svg,'g',{class:'map-edges','pointer-events':'none'});
    const statuses=append(svg,'g',{class:'map-fronts','pointer-events':'none'});
    const labels=append(svg,'g',{class:'map-labels'});
    const annotations=append(svg,'g',{class:'map-annotations'});
    const corners=append(svg,'g',{class:'map-furniture','pointer-events':'none'});
    const mxy=sp(...point);
    const hasPoint=Array.isArray(evt.point)&&canShow(evt.type,layers);
    if(layers.fronts!==false&&evt.id==='w07'){
      const [x,y]=sp(2.89,50.85);
      append(statuses,'circle',{cx:x,cy:y,r:23,fill:'none',stroke:'#92583e','stroke-width':2,'stroke-dasharray':'5 5'});
    }
    const pointVisible=mxy[0]>8&&mxy[0]<W-8&&mxy[1]>8&&mxy[1]<H-8;
    const occupiedAt=(x,y,w,h)=>rects.push({x:x-w/2,y:y-h/2,w,h});
    // Reserve the current event first; its callout takes precedence over adjacent place names.
    if(hasPoint&&pointVisible){
      const [x,y]=mxy;
      let place=(evt.id==='j01'?'塞拉耶佛':evt.place||evt.title).split('・').at(-1).split(/[／（、，｜·]/)[0].trim();
      if(place.length>13)place=place.slice(0,12)+'…';
      const bw=Math.max(95,place.length*13+25),bh=44;
      const toRight=x+bw+22<W-5,toTop=y>bh+42;
      const bx=Math.max(5,Math.min(W-bw-5,toRight?x+19:x-19-bw)),by=Math.max(5,Math.min(H-bh-5,toTop?y-bh-17:y+17));
      occupiedAt(bx+bw/2,by+bh/2,bw+7,bh+5);occupiedAt(x,y,30,30);
      const marker=append(annotations,'g',{class:'map-pin',role:'button',tabindex:0,'aria-label':'展開事件：'+evt.title});
      append(marker,'path',{d:'M'+x+' '+y+' L'+(toRight?bx+3:bx+bw-3)+' '+(toTop?by+bh-4:by+4),stroke:'#965641','stroke-width':1.5,fill:'none'});
      append(marker,'circle',{cx:x,cy:y,r:13,fill:'#b4593c','fill-opacity':.15,stroke:'#a85238','stroke-opacity':.4,'stroke-width':1});
      append(marker,'circle',{cx:x,cy:y,r:7.2,fill:'#f9f1da',stroke:'#984c35','stroke-width':1.7});
      append(marker,'circle',{cx:x,cy:y,r:3.1,fill:'#a14931'});
      append(marker,'rect',{x:bx+1.6,y:by+2.5,width:bw,height:bh,rx:3.5,fill:'#38493b',opacity:.12});
      append(marker,'rect',{x:bx,y:by,width:bw,height:bh,rx:3,fill:'#fcf8eb',stroke:'#ae9676','stroke-width':.8});
      append(marker,'rect',{x:bx,y:by+3,width:2.5,height:bh-6,fill:'#a9553a'});
      append(marker,'text',{x:bx+10,y:by+15,class:'map-pin-date'},evt.date.replaceAll('-',' · '));
      append(marker,'text',{x:bx+10,y:by+33,class:'map-pin-title'},place);
      bindAction(marker,()=>{if(!state.suppress)options.onEvent?.(evt.id);});
    }
    function edgeAnchor(code){
      const row=catalog[code];if(!row)return null;
      if(code==='RU'&&evt.date>='1918-03-12')return [37.62,55.75];
      return row.slice(4,6);
    }
    // Retain earlier declarations during the crisis so that the growing war is readable.
    if(evt.chapter===2&&layers.war!==false){
      for(const earlier of (window.ATLAS_EVENTS||[]).filter(e=>e.chapter===2&&e.id<evt.id&&e.type==='declare')){
        for(const [a,b,t] of earlier.edges||[]){
          const from=edgeAnchor(a),to=edgeAnchor(b);if(t!=='declare'||!from||!to)continue;
          const [x,y]=sp(...from),[ex,ey]=sp(...to),dx=ex-x,dy=ey-y,len=Math.hypot(dx,dy)||1,arc=Math.min(46,len*.19);
          append(edgeElements,'path',{d:'M'+x+' '+y+' Q'+((x+ex)/2-dy/len*arc)+' '+((y+ey)/2+dx/len*arc)+' '+ex+' '+ey,fill:'none',stroke:'#a45440','stroke-width':1.4,'stroke-opacity':.52,'stroke-dasharray':'5 5'});
        }
      }
    }
    for(const [i,edge] of (evt.edges||[]).entries()){
      const [a,b,type]=edge;if(!canShow(type,layers)||!action[type])continue;
      let aa=edgeAnchor(a),bb=edgeAnchor(b);if(!aa||!bb)continue;
      // Place military vectors in the theatre, never trace a field operation from a state capital.
      // These are schematic bearings. The endpoints are not claimed troop locations.
      if(type==='attack'){
        const approach={
          w01:[1.3,.1],w02:[.9,.55],w05:[0,-.75],w06:[-.7,-.6],w08:[-1,-.6],w09:[-.7,-.1],w10:[-1,0],
          j11:[-.3,.2],j16:[1,.1],j20:[1,.15],
          a01:[.35,.55],a03:[1.2,.05],a04:a==='GB'?[-.7,.15]:[-.55,-.25],a08:[.7,.45],
          b02:[1,.05],b03:[-.75,-.05],b04:[-.9,-.1],c03:[-.75,0]
        }[evt.id];
        if(approach)aa=[point[0]+approach[0],point[1]+approach[1]];
        else if(!aa||Math.abs(point[0]-aa[0])+Math.abs(point[1]-aa[1])>10){
          const [px,py]=sp(...point);
          append(edgeElements,'circle',{cx:px,cy:py,r:22,stroke:action.attack[1],'stroke-width':1.7,'stroke-dasharray':'7 4',fill:'none'});
          continue;
        }
      }
      const [x,y]=sp(...aa),[ex,ey]=sp(...bb);
      const [,color,dash]=action[type];
      if(type==='territory'&&window.ATLAS_TERRITORIES&&['p02','p03','p11'].includes(evt.id))continue;
      if(type==='mobilize'||a===b){
        append(edgeElements,'circle',{cx:x,cy:y,r:14,fill:'none',stroke:color,'stroke-width':2,'stroke-dasharray':'3 4'});
        if(type==='mobilize')append(edgeElements,'circle',{cx:x,cy:y,r:20,fill:'none',stroke:color,'stroke-width':1.1,'stroke-dasharray':'2 5'});
        continue;
      }
      // An attack symbol ends at the recorded theatre; country-to-country edges are relations.
      const dest=type==='attack'&&evt.point?sp(...evt.point):[ex,ey];
      if(type==='attack'&&Math.hypot(dest[0]-x,dest[1]-y)<30){const vx=x-dest[0],vy=y-dest[1],l=Math.hypot(vx,vy)||1;const sx=dest[0]+vx/l*32,sy=dest[1]+vy/l*32;const stopX=dest[0]+vx/l*10,stopY=dest[1]+vy/l*10;append(edgeElements,'path',{d:'M'+sx+' '+sy+'L'+stopX+' '+stopY,fill:'none',stroke:color,'stroke-width':3,'marker-end':'url(#'+id+'attack)'});continue;}
      const dx=dest[0]-x,dy=dest[1]-y,len=Math.max(1,Math.hypot(dx,dy)),arc=Math.min(46,len*.19)*(i%2?-1:1);
      const cx=(x+dest[0])/2-dy/len*arc,cy=(y+dest[1])/2+dx/len*arc;
      const d='M'+fnum(x)+' '+fnum(y)+' Q'+fnum(cx)+' '+fnum(cy)+' '+fnum(dest[0])+' '+fnum(dest[1]);
      append(edgeElements,'path',{d,fill:'none',stroke:'#fff7df','stroke-width':type==='attack'?5.8:4.1,opacity:.7});
      const directed=!['tension','alliance','battle','front','territory','peace','politics'].includes(type);
      const path=append(edgeElements,'path',{d,fill:'none',stroke:color,'stroke-width':type==='attack'?3.8:2,'stroke-dasharray':dash||undefined,'marker-end':directed?'url(#'+id+type+')':undefined});
      append(path,'title',{},localName(a,evt.date)+' · '+action[type][0]+' · '+localName(b,evt.date));
      append(edgeElements,'circle',{cx:x,cy:y,r:2.7,fill:color,stroke:'#f3ecd9','stroke-width':.9});
    }
    // Draw a theatre axis, not a reconstruction of the operational line on a given day.
    if(layers.fronts!==false&&evt.date>='1914-11-22'&&evt.date<'1918-11-11'){
      const west=[[2.75,51.13],[3.1,50.7],[3.25,50.0],[3.65,49.5],[5.15,49.15],[6.45,48.68],[7.12,47.55]];
      append(statuses,'path',{d:west.map((p,i)=>(i?'L':'M')+sp(...p).map(fnum).join(' ')).join(' '),fill:'none',stroke:'#a3624c','stroke-width':5,opacity:.32});
      append(statuses,'path',{d:west.map((p,i)=>(i?'L':'M')+sp(...p).map(fnum).join(' ')).join(' '),fill:'none',stroke:'#7d4938','stroke-width':1.5,'stroke-dasharray':'4 4'});
      const badge=(lon,lat,label)=>{let [x,y]=sp(lon,lat);if(usable(rects,x,y,56,17,W,H))append(statuses,'text',{x,y,class:'map-theatre','text-anchor':'middle'},label);};
      badge(4.0,50.3,'西線示意');
      if(evt.date<'1917-12-15')badge(evt.date<'1915-09-01'?22:26,53.3,'東線戰區');
      if(evt.date>='1915-05-23'&&evt.date<'1918-11-04')badge(evt.date<'1917-11-09'?13.58:12.27,45.95,'義大利戰線');
    }
    if(layers.territory!==false&&evt.date>='1914-08-20'&&evt.date<'1918-11-17'){
      const [x,y]=sp(4.35,50.85);
      const g=append(statuses,'g',{transform:'translate('+x+' '+y+')'});
      append(g,'rect',{x:-5.2,y:-5.2,width:10.4,height:10.4,fill:'#f2dfae',stroke:'#80542c','stroke-width':1.3,transform:'rotate(45)'});
      append(g,'path',{d:'M-3 2 L2 -3 M-1 4 L4 -1',stroke:'#80542c','stroke-width':1});
      append(g,'title',{},'布魯塞爾：德軍占領據點');
    }
    if(layers.battles!==false){
      const recent=(window.ATLAS_EVENTS||[]).filter(e=>e.type==='battle'&&e.id!==evt.id&&e.date<=evt.date&&e.point&&e.date.slice(0,4)===evt.date.slice(0,4));
      for(const b of recent){
        const [x,y]=sp(...b.point);if(x<7||y<7||x>W-7||y>H-7)continue;
        const g=append(annotations,'g',{role:'button',tabindex:0,class:'map-battle','aria-label':b.date+' '+b.title,transform:'translate('+x+' '+y+')'});
        append(g,'circle',{r:8.5,fill:'#f5e8cd',stroke:'#ad8268','stroke-width':1});
        append(g,'path',{d:'M-3.2 -3.2L3.2 3.2M-3.2 3.2L3.2 -3.2',fill:'none',stroke:'#884d37','stroke-width':1.5});
        append(g,'title',{},b.date+'｜'+b.title);bindAction(g,()=>{if(!state.suppress)options.onEvent?.(b.id);});
      }
    }
    // Large territorial labels first. Small states appear when space permits or at a higher zoom.
    if(layers.names!==false){
      const big=['DE','FR','AH','GB','RU','OT','IT','ES','SE','US','JP','CN','CA','AU','IN'];
      const priorities=[...new Set([...evt.actors,...big,...Object.keys(catalog)])];
      for(const code of priorities){
        if(!rendered.has(code)||!catalog[code])continue;
        const row=catalog[code],name=code==='YU'?'塞克斯王國':localName(code,evt.date);
        let [x,y]=sp(row[2],row[3]);const large=big.includes(code);
        const sz=(large?Math.min(20,Math.max(15,W/40)):13)*(world?.86:1);
        let width=name.length*(sz+1),showLatin=large&&!world&&W>445;
        let english=row[1];if(code==='RU'&&evt.date>='1917-03-15')english='RUSSIA';
        if(english==='GERMANY'&&evt.date<'1918-11-09')english='GERMAN EMPIRE';
        if(showLatin)width=Math.max(width,english.length*5.5);
        const anchors={AH:[[16,48.9],[15,47.9],[19.5,48.1]],RU:[[30.3,54.7],[30.5,53.2],[28.5,53.5]],RS:[[21.9,43.2],[21.2,42.85],[21.25,44.15]],OT:[[30.45,39.3],[29.4,39.15],[31.3,40.1]],BE:[[4.0,51.0],[4.75,50.4]]};
        const candidates=[[x,y],...(anchors[code]||[]).map(v=>sp(...v))];
        let found=candidates.find(([a,b])=>usable(rects,a,b,width+5,showLatin?34:sz+3,W,H));
        if(!found&&showLatin){showLatin=false;width=name.length*(sz+1);found=candidates.find(([a,b])=>usable(rects,a,b,width+5,sz+3,W,H));}
        if(!found&&evt.actors.includes(code)&&!world&&x>=0&&x<=W&&y>=0&&y<=H){
          const original=[x,y];
          const offsets=[[34,14],[-34,16],[25,27],[-25,27],[40,-16],[-38,-18],[0,37],[0,-38]];
          found=offsets.map(([dx,dy])=>[x+dx,y+dy]).find(([a,b])=>usable(rects,a,b,width+5,sz+3,W,H));
          if(found){
            const ddx=found[0]-x,ddy=found[1]-y,len=Math.hypot(ddx,ddy),end=sp(row[2],row[3]);
            append(labels,'line',{x1:end[0],y1:end[1],x2:found[0]-ddx/len*10,y2:found[1]-ddy/len*8,stroke:'#636952','stroke-width':.8,'pointer-events':'none'});
            append(labels,'circle',{cx:original[0],cy:original[1],r:1.5,fill:'#5c6554','pointer-events':'none'});
          }
        }
        if(!found)continue;[x,y]=found;
        const g=append(labels,'g',{transform:'translate('+x+' '+y+')',class:'map-name',role:'button',tabindex:-1,'aria-label':name});
        append(g,'text',{x:0,y:showLatin?-1:4,'text-anchor':'middle',class:large?'map-nation':'map-nation minor','font-size':sz},name);
        if(showLatin)append(g,'text',{x:0,y:12,'text-anchor':'middle',class:'map-name-latin'},english);
        bindAction(g,()=>{if(!state.suppress)options.onCountry?.(code,name);});
      }
      if(!world)for(const [name,lon,lat] of seaNames){
        const [x,y]=sp(lon,lat);
        if(usable(rects,x,y,name.length*14,20,W,H))append(labels,'text',{x,y,'text-anchor':'middle',class:'map-sea'},name);
      }
      if(!world)for(const [raw,lon,lat] of cityPoints){
        const [x,y]=sp(lon,lat),name=raw==='聖彼得堡'&&evt.date>='1914-09-01'?'彼得格勒':raw;
        if(!usable(rects,x+name.length*5+6,y+1,name.length*10+10,13,W,H))continue;
        append(labels,'circle',{cx:x,cy:y,r:2.1,fill:'#4e594b',stroke:'#fff6da','stroke-width':.9,'pointer-events':'none'});
        append(labels,'text',{x:x+5,y:y+3.5,class:'map-city'},name);
      }
    }
    // Compass bearing accounts for the conic map's meridian convergence at the map centre.
    if(!options.comparison&&W>320&&H>250){
      const cx=32,cy=H-47;
      const rose=append(corners,'g',{transform:'translate('+cx+' '+cy+')',class:'map-rose'});
      append(rose,'circle',{r:13,fill:'none',stroke:'#536b60','stroke-width':.65});
      append(rose,'path',{d:'M0 -19L4 0L0 16L-4 0Z',fill:'#e9e9d4',stroke:'#4b6055','stroke-width':.9});
      append(rose,'path',{d:'M0 -19V0L-4 0ZM0 16V0L4 0Z',fill:'#4b6055'});
      append(rose,'path',{d:'M-16 0 H16',stroke:'#4b6055','stroke-width':.8});
      append(rose,'text',{y:-24,'text-anchor':'middle',class:'map-north'},'N');
    }
    if(!date)append(corners,'text',{x:W/2,y:H/2,class:'map-note','text-anchor':'middle'},'歷史底圖尚未載入');
    // Reserve space below the map for the application's full legend.
    const vintage=date?date.slice(0,4):'—';
    const caption=vintage+' · '+(world?'世界地理參照':'歷史國界參照');
    append(corners,'text',{x:W-10,y:H-9,class:'map-note','text-anchor':'end'},caption);
    if(hasPoint&&!pointVisible){
      const off=append(annotations,'g',{class:'map-pin',role:'button',tabindex:0,'aria-label':'定位到本事件'});
      const text=far?'本事件在歐洲圖外 · 點此定位':'事件位於視野外 · 點此定位',w=185;
      append(off,'rect',{x:W/2-w/2,y:H-39,width:w,height:23,rx:3,fill:'#fcf8eb',stroke:'#ac8f6c','stroke-width':.8});
      append(off,'text',{x:W/2,y:H-23,'text-anchor':'middle',class:'map-note'},text);
      bindAction(off,()=>{const select=container.id==='map'&&document.getElementById('view');if(select){select.value='focus';select.dispatchEvent(new Event('change'));}else{state.options={...options,view:'focus'};state.z=1;state.dx=0;state.dy=0;render(state);}});
    }
    container.replaceChildren(svg);
  }
  function setControls(state){
    const {container}=state;
    let drag=null;
    container.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,startX:state.dx,startY:state.dy};state.suppress=false;});
    container.addEventListener('pointermove',e=>{
      if(!drag||!e.buttons)return;
      const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
      if(!state.suppress&&Math.hypot(dx,dy)<5)return;
      if(!state.suppress)container.setPointerCapture?.(e.pointerId);
      state.suppress=true;container.classList.add('map-dragging');
      state.dx=drag.startX+dx;state.dy=drag.startY+dy;
      if(!state.frame)state.frame=requestAnimationFrame(()=>{state.frame=0;render(state);});
    });
    const end=()=>{drag=null;container.classList.remove('map-dragging');setTimeout(()=>{state.suppress=false;},0);};
    container.addEventListener('pointerup',end);container.addEventListener('pointercancel',end);
    if(window.ResizeObserver){
      const observer=new ResizeObserver(()=>{if(!container.isConnected){observer.disconnect();return;}const b=container.getBoundingClientRect();if(Math.abs(b.width-state.W)>1||Math.abs(b.height-state.H)>1)render(state);});
      observer.observe(container);
    }
  }
  window.drawAtlasMap=(container,evt,options={})=>{
    if(!container||!evt)return;
    let state=hosts.get(container);
    if(!state){state={container,id:'map_'+(++serial)+'_',z:1,dx:0,dy:0,suppress:false,frame:0};hosts.set(container,state);setControls(state);}
    else if(state.options.view!==options.view||options.view==='focus'&&evt.id!==state.evt.id){state.z=1;state.dx=0;state.dy=0;}
    state.evt=evt;state.options=options;render(state);
  };
  window.atlasZoom=(container,factor)=>{
    const state=hosts.get(container);if(!state)return;
    if(factor===0){state.z=1;state.dx=0;state.dy=0;}
    else {const old=state.z;state.z=Math.min(8,Math.max(.45,state.z*factor));state.dx*=state.z/old;state.dy*=state.z/old;}
    render(state);
  };
})();
