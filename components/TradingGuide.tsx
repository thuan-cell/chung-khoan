
import React, { useState } from 'react';

const CandlestickSecretGuide = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Cột 1: NHẬP MÔN: ĐỌC NẾN */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500">
            <i className="fa-solid fa-graduation-cap text-xs"></i>
          </div>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800">Nhập Môn: Đọc Nến</h3>
        </div>
        <ul className="space-y-4 text-[10px] text-slate-600">
          <li className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-4 bg-[#089981] rounded-sm"></div>
              <strong className="text-emerald-600 uppercase">Nến Xanh (Tăng)</strong>
            </div>
            <p className="pl-5">Giá đóng cửa <span className="font-bold text-slate-900">CAO HƠN</span> giá mở cửa. Phe Mua đang kiểm soát.</p>
          </li>
          <li className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-4 bg-[#f23645] rounded-sm"></div>
              <strong className="text-rose-600 uppercase">Nến Đỏ (Giảm)</strong>
            </div>
            <p className="pl-5">Giá đóng cửa <span className="font-bold text-slate-900">THẤP HƠN</span> giá mở cửa. Phe Bán đang áp đảo.</p>
          </li>
        </ul>
      </div>

      {/* Cột 2: Khi nào nên MUA? */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-emerald-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <i className="fa-solid fa-cart-shopping text-xs"></i>
          </div>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800">Tín Hiệu MUA</h3>
        </div>
        <ul className="space-y-3 text-[10px] text-slate-600">
          <li className="flex gap-2">
            <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
            <span><strong className="text-slate-900 text-[11px]">Breakout:</strong> Giá vượt đỉnh cũ với khối lượng (Volume) đột biến.</span>
          </li>
          <li className="flex gap-2">
            <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
            <span><strong className="text-slate-900 text-[11px]">Nến Búa (Hammer):</strong> Xuất hiện ở đáy, báo hiệu lực cầu bắt đáy mạnh.</span>
          </li>
          <li className="flex gap-2">
            <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
            <span><strong className="text-slate-900 text-[11px]">Giao cắt MA:</strong> Giá vượt lên trên đường màu tím (MA10).</span>
          </li>
        </ul>
      </div>

      {/* Cột 3: Khi nào nên BÁN? */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-l-4 border-l-rose-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded bg-rose-500/10 flex items-center justify-center text-rose-500">
            <i className="fa-solid fa-hand-holding-dollar text-xs"></i>
          </div>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800">Tín Hiệu BÁN</h3>
        </div>
        <ul className="space-y-3 text-[10px] text-slate-600">
          <li className="flex gap-2">
            <i className="fa-solid fa-triangle-exclamation text-rose-500 mt-1"></i>
            <span><strong className="text-slate-900 text-[11px]">Shooting Star:</strong> Râu trên dài ở vùng đỉnh, báo hiệu phe bán chốt lời.</span>
          </li>
          <li className="flex gap-2">
            <i className="fa-solid fa-triangle-exclamation text-rose-500 mt-1"></i>
            <span><strong className="text-slate-900 text-[11px]">Thủng Hỗ Trợ:</strong> Giá rơi khỏi đường MA50 (màu xanh dương).</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ProfessionalCaseStudy = () => {
  const mainData = [
    { o: 65.2, h: 65.5, l: 64.0, c: 64.2, v: 120, day: '01', month: '11' },
    { o: 64.2, h: 64.5, l: 63.0, c: 63.2, v: 130 },
    { o: 63.2, h: 63.8, l: 62.8, c: 63.5, v: 110 },
    { o: 63.5, h: 63.8, l: 61.2, c: 61.5, v: 240 },
    { o: 61.5, h: 62.0, l: 60.5, c: 60.8, v: 160 },
    { o: 60.8, h: 61.2, l: 59.5, c: 60.2, v: 140 },
    { o: 60.2, h: 60.5, l: 59.0, c: 59.4, v: 125 },
    { o: 59.4, h: 60.2, l: 59.2, c: 59.8, v: 110 },
    { o: 59.8, h: 60.5, l: 58.8, c: 59.0, v: 135 },
    { o: 59.0, h: 59.2, l: 58.0, c: 58.4, v: 120 },
    { o: 58.4, h: 59.0, l: 58.2, c: 58.8, v: 105 },
    { o: 58.8, h: 60.8, l: 58.8, c: 60.2, v: 220 },
    { o: 60.2, h: 61.2, l: 60.0, c: 60.8, v: 180 },
    { o: 60.8, h: 61.5, l: 60.2, c: 61.0, v: 170 },
    { o: 61.0, h: 61.2, l: 59.5, c: 59.8, v: 145 },
    { o: 59.8, h: 60.5, l: 58.5, c: 59.0, v: 130 },
    { o: 59.0, h: 59.5, l: 58.0, c: 58.2, v: 110 },
    { o: 58.2, h: 58.8, l: 57.5, c: 57.8, v: 120 },
    { o: 57.8, h: 58.5, l: 57.2, c: 57.4, v: 140 },
    { o: 57.4, h: 58.2, l: 57.0, c: 58.0, v: 160 },
    { o: 58.0, h: 58.5, l: 57.4, c: 57.6, v: 115 },
    { o: 57.6, h: 58.0, l: 56.5, c: 56.8, v: 105 },
    { o: 56.8, h: 57.2, l: 56.0, c: 56.4, v: 155 },
    { o: 56.4, h: 56.8, l: 55.5, c: 55.8, v: 180 },
    { o: 55.8, h: 56.5, l: 55.2, c: 56.2, v: 195 },
    { o: 56.2, h: 56.4, l: 54.8, c: 55.2, v: 140 },
    { o: 55.2, h: 55.8, l: 55.0, c: 55.5, v: 120 },
    { o: 55.5, h: 56.2, l: 55.4, c: 56.0, v: 110 },
    { o: 56.0, h: 56.2, l: 54.5, c: 54.8, v: 130 },
    { o: 54.8, h: 56.5, l: 54.8, c: 56.2, v: 220 },
    { o: 56.2, h: 56.8, l: 56.0, c: 56.5, v: 190 },
    { o: 56.5, h: 57.2, l: 56.5, c: 57.0, v: 140 },
    { o: 57.0, h: 57.4, l: 56.2, c: 56.5, v: 155 },
    { o: 56.5, h: 56.8, l: 56.0, c: 56.2, v: 130 },
    { o: 56.2, h: 57.8, l: 56.2, c: 57.5, v: 110 },
    { o: 57.5, h: 58.2, l: 57.0, c: 58.0, v: 250 },
    { o: 58.0, h: 58.4, l: 57.5, c: 57.8, v: 180 },
    { o: 57.8, h: 58.0, l: 56.5, c: 56.8, v: 160 },
    { o: 56.8, h: 57.2, l: 56.4, c: 57.0, v: 140 },
    { o: 57.0, h: 58.5, l: 57.0, c: 58.2, v: 120 },
    { o: 58.2, h: 58.8, l: 57.8, c: 58.0, v: 150 },
    { o: 58.0, h: 58.4, l: 57.2, c: 57.4, v: 130 },
    { o: 57.4, h: 57.8, l: 57.0, c: 57.2, v: 110 },
    { o: 57.2, h: 57.5, l: 56.8, c: 57.0, v: 105 },
    { o: 57.0, h: 58.2, l: 57.0, c: 57.8, v: 100 },
    { o: 57.8, h: 58.0, l: 57.2, c: 57.5, v: 160 },
    { o: 57.5, h: 58.2, l: 57.5, c: 58.0, v: 130 },
    { o: 58.0, h: 58.4, l: 57.8, c: 58.2, v: 110 },
    { o: 58.2, h: 58.5, l: 58.0, c: 58.3, v: 105 },
    { o: 58.3, h: 58.8, l: 57.8, c: 58.0, v: 115 },
    { o: 58.0, h: 58.2, l: 57.2, c: 57.4, v: 120 },
    { o: 57.4, h: 60.5, l: 57.4, c: 59.6, v: 480, day: '06', month: '01' },
  ];

  const minP = 54.0;
  const maxP = 66.0;
  const pRange = maxP - minP;
  const priceLevels = [66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55];

  const chartWidth = 1400;
  const totalHeight = 850;
  const priceAreaHeight = 720;

  const slotWidth = (chartWidth - 80) / mainData.length;
  const candleWidth = slotWidth * 0.7;

  const getX = (i: number) => 10 + i * slotWidth + slotWidth / 2;
  const getY = (p: number) => (priceAreaHeight - 40) - ((p - minP) / pRange) * (priceAreaHeight - 40) + 40;

  return (
    <div className="bg-white border border-slate-200 rounded-lg relative flex flex-col mb-4 overflow-hidden font-sans shadow-xl">
      <div className="overflow-x-auto terminal-scrollbar">
        <div className="relative" style={{ height: totalHeight, minWidth: chartWidth }}>
          <div className="absolute top-0 left-0 w-full h-10 flex items-center px-4 bg-slate-50 border-b border-slate-200/80 z-20">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-4">MÃ PHÂN TÍCH • 1D</span>
          </div>

          <div className="absolute right-0 top-0 h-full w-14 border-l border-slate-200 flex flex-col justify-start text-[10px] text-slate-400 font-bold py-10 z-10 bg-white">
            {priceLevels.map(p => (
              <div key={p} className="absolute right-2" style={{ top: getY(p) - 8 }}>{p.toFixed(2)}</div>
            ))}
          </div>

          <svg width={chartWidth} height={totalHeight} viewBox={`0 0 ${chartWidth} ${totalHeight}`} className="bg-white">
            {priceLevels.map(p => (
              <line key={p} x1="0" y1={getY(p)} x2={chartWidth - 56} y2={getY(p)} stroke="#f1f5f9" strokeWidth="1" />
            ))}
            {mainData.map((d, i) => {
              const x = getX(i);
              const color = d.c >= d.o ? '#089981' : '#f23645';
              const bodyTop = getY(Math.max(d.o, d.c));
              const bodyBottom = getY(Math.min(d.o, d.c));
              return (
                <g key={`candle-${i}`}>
                  <line x1={x} y1={getY(d.h)} x2={x} y2={getY(d.l)} stroke={color} strokeWidth="1" />
                  <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={Math.max(bodyBottom - bodyTop, 1)} fill={color} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

interface GuideProps {
  embeddedUrl: string | null;
  setEmbeddedUrl: (url: string | null) => void;
  currentSymbol: string;
}

const TradingGuide: React.FC<GuideProps> = ({ embeddedUrl, setEmbeddedUrl, currentSymbol }) => {
  const [iframeLoading, setIframeLoading] = useState(false);

  React.useEffect(() => {
    if (embeddedUrl) {
      setIframeLoading(true);
    }
  }, [embeddedUrl]);

  return (
    <div className={`mx-auto pb-4 px-1 sm:px-2 ${embeddedUrl ? 'flex-1 flex flex-col w-full max-w-full h-full' : 'max-w-[1550px] mt-2'}`}>
      <section className={`flex flex-col ${embeddedUrl ? 'h-full flex-1' : 'space-y-4'}`}>
        {embeddedUrl ? (
          <div className="w-full h-full min-h-[680px] flex-1 bg-zinc-950 rounded-[1.5rem] overflow-hidden border border-zinc-800 shadow-2xl flex flex-col animate-in zoom-in-95 duration-500 relative">
            
            <div className="bg-[#18181b] px-6 py-3 border-b border-zinc-800 flex justify-between items-center shrink-0">
              <span className="text-[8px] sm:text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                VNDIRECT ENGINE ACTIVE • {currentSymbol}
              </span>
              <div className="flex items-center gap-4">
                 <button onClick={() => {
                   const iframe = document.getElementById('quick-view-frame') as HTMLIFrameElement;
                   if (iframe) iframe.src = iframe.src;
                 }} className="text-[8px] sm:text-[9px] text-zinc-500 hover:text-white font-black uppercase tracking-widest transition-colors">REFRESH</button>
                 <button onClick={() => setEmbeddedUrl(null)} className="text-[8px] sm:text-[9px] text-rose-500/70 hover:text-rose-500 font-black uppercase tracking-widest transition-colors">ĐÓNG</button>
              </div>
            </div>

            {iframeLoading && (
              <div className="absolute inset-0 bg-[#09090b]/80 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">ĐANG LOAD DỮ LIỆU {currentSymbol}...</span>
              </div>
            )}

            <iframe 
              key={`${embeddedUrl}-${currentSymbol}`}
              id="quick-view-frame"
              src={embeddedUrl} 
              onLoad={() => setIframeLoading(false)}
              className={`w-full flex-1 bg-white border-none transition-opacity duration-500 ${iframeLoading ? 'opacity-0' : 'opacity-100'}`} 
              title="Quick View Dashboard" 
              sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation" 
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ProfessionalCaseStudy />
            <CandlestickSecretGuide />
          </div>
        )}
      </section>
    </div>
  );
};

export default TradingGuide;
