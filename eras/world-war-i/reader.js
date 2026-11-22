// Historical editorial details specific to this edition.
window.ATLAS_EDITION_VIEW = {
  legend(current,layers){
    const pre=current.date<'1914-07-28';
    return (layers.alliances&&current.date<'1918-11-11'?'<span class="legItem"><i class="key central"></i>'+(pre?'德奧同盟圈':'同盟國方')+'</span><span class="legItem"><i class="key entente"></i>'+(pre?'協約關係圈':'協約國方')+'</span>':'')+
      '<span class="legItem"><i class="key other"></i>'+(layers.alliances&&current.date<'1918-11-11'?'其餘地區':'歷史政區')+'</span><span class="legItem"><i class="key event"></i>當前事件</span>';
  },
  archive(e,icon){
    const archiveCard=e.id==='j01'?'<a class="archiveCard" href="https://germanhistorydocs.org/en/wilhelmine-germany-and-the-first-world-war-1890-1918/ghdi%3Aimage-2284" target="_blank" rel="noopener noreferrer"><span>'+icon('file')+' 當日影像</span><strong>離開市政廳的大公夫婦</strong><small>德國史文獻與圖像　'+icon('external')+'</small></a>':'';
    return archiveCard;
  },
  credit(current,last){return (current.date<'1886'?'年度截面':current.date>='1919'?'條約／過渡邊界':'歷史國界')+' · '+(last||'—')+'　｜　CShapes · CC BY-NC-SA';},
  method({current,fmt,esc,sourceLink,showDialog}){
    const m=window.ATLAS_GEO_META||{};
    const dateKeys=Object.keys(window.ATLAS_GEO||{}).filter(k=>k<=current.date).sort();
    showDialog('method','歷史國界怎麼讀？','製圖說明與授權','<section class="dialogSection"><h3>事件日與底圖年代</h3><p>目前事件發生於 '+fmt(current.date)+'，使用有效起點為 '+esc(dateKeys.at(-1)||'未標示')+' 的資料截面。有效起點可能對應歐洲以外或其他政區的更新。</p><p>'+esc(m.note)+'</p></section><section class="dialogSection"><h3>底圖的比例與精度</h3><p>1871–1885 年使用 CShapes-Europe 的年度資料，同一年內的議和、簽約或移交通常只能以事件標記區分。1886 年起使用 CShapes 2.0 的有效日期。海岸與島嶼經過簡化，全球視圖只收錄選定的歷史政區。</p><p>斜線表示資料列為依附或殖民的領地。無政治面資料的陸地只提供地理位置。戰線與進攻方向採概略示意，個別占領地點顯示在事件層；軍事控制的逐日範圍仍有缺口。</p></section><section class="dialogSection"><h3>1919 年的條約邊界</h3><p>資料編碼日、條約生效日、公投結果及軍隊撤離日可能各不相同。戰後事件在圖說中交代關鍵差別，例如凡爾賽條約於 1919 年簽署、1920 年生效。鄂圖曼帝國解體的後續發展延伸至 1920 年代。</p></section><section class="dialogSection"><h3>底圖作者與授權</h3><p>Schvitz 等（2022），CShapes 2.0。Cederman、Girardin、Müller-Crepon 與 Pengl（2025），CShapes-Europe。本站選繪、簡化及轉換座標資料；衍生地理資料依相同授權提供。</p>'+sourceLink(['ETH Zürich · CShapes 資料、方法與引用','https://icr.ethz.ch/data/cshapes/'])+sourceLink(['CC BY-NC-SA 4.0 · 姓名標示、非商業性、相同方式分享','https://creativecommons.org/licenses/by-nc-sa/4.0/'])+sourceLink(['Natural Earth · 自然陸地輪廓（公共領域）','https://www.naturalearthdata.com/'])+'<h3>戰線與圖例參照</h3>'+(window.atlasMapSources||[]).map(sourceLink).join('')+'</section>');
  }
};
