
import React, { useState, useRef, useEffect } from 'react';
import { analyzeStockWithImage } from './services/geminiService';
import { StockRecommendation } from './types';
import RecommendationBadge from './components/RecommendationBadge';
import TradingGuide from './components/TradingGuide';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analysis' | 'guide'>('analysis');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StockRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [embeddedUrl, setEmbeddedUrl] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [searchSymbol, setSearchSymbol] = useState<string>('VNINDEX');
  const [searchInput, setSearchInput] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Kiểm tra key khi khởi động
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
        setNeedsKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setNeedsKey(false);
      setError(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearchSymbol(searchInput.toUpperCase().trim());
    setSearchInput('');
    searchRef.current?.blur();
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeStockWithImage(selectedImage, mimeType, searchSymbol, customPrompt);
      setResult(data);
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found") || err.message?.includes("API_KEY")) {
        setError("Vui lòng chọn API Key từ dự án có trả phí để tiếp tục.");
        setNeedsKey(true);
      } else {
        setError("Lỗi kết nối AI. Vui lòng kiểm tra lại hình ảnh hoặc thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#050507] text-[#e4e4e7] overflow-hidden">
      
      <header className="z-50 h-14 border-b border-white/[0.04] bg-[#050507]/80 backdrop-blur-xl flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('analysis'); setEmbeddedUrl(null); }}>
            <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center rounded-lg shadow-lg shadow-emerald-500/20">
              <i className="fa-solid fa-chart-line text-black text-xs"></i>
            </div>
            <div className="flex flex-col">
                <span className="text-white font-extrabold text-xs tracking-tight uppercase leading-none">FireStock AI</span>
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5">Terminal v2.5</span>
            </div>
          </div>

          <nav className="flex items-center h-full gap-1">
            {['PHÂN TÍCH', 'HỌC VIỆN'].map((tab, idx) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(idx === 0 ? 'analysis' : 'guide'); setEmbeddedUrl(null); }} 
                className={`px-4 h-14 text-[10px] font-black tracking-[0.2em] transition-all relative ${activeTab === (idx === 0 ? 'analysis' : 'guide') && !embeddedUrl ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                {tab}
                {activeTab === (idx === 0 ? 'analysis' : 'guide') && !embeddedUrl && <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full"></div>}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xl px-12">
          <form onSubmit={handleSearch} className="relative flex-1">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700 text-[10px]"></i>
            <input 
              ref={searchRef}
              type="text" 
              placeholder="NHẬP MÃ (VD: FPT, HPG)..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#121214] border border-white/[0.02] rounded-lg h-8 pl-9 pr-4 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all placeholder:text-zinc-800 uppercase"
            />
          </form>
          {needsKey && (
            <button 
              onClick={handleSelectKey}
              className="bg-orange-500 hover:bg-orange-400 text-black font-black text-[9px] px-4 h-8 rounded-lg transition-all uppercase tracking-widest flex items-center gap-2"
            >
              <i className="fa-solid fa-key"></i> CHỌN API KEY
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleRunAnalysis}
            disabled={loading || !selectedImage}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-20 text-black font-black text-[10px] px-6 h-8 rounded-lg transition-all uppercase tracking-widest shadow-lg shadow-emerald-500/10 flex items-center gap-2"
          >
            {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-brain"></i>}
            {loading ? 'ĐANG PHÂN TÍCH...' : 'XUẤT BÁO CÁO AI'}
          </button>
        </div>
      </header>

      <main className={`flex-1 min-h-0 bg-[#050507] overflow-y-auto terminal-scrollbar ${embeddedUrl ? 'p-0' : 'p-6'}`}>
        {error && (
          <div className="max-w-[1600px] mx-auto mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
              <i className="fa-solid fa-triangle-exclamation"></i>
              {error}
            </div>
            {needsKey && (
              <button onClick={handleSelectKey} className="text-[10px] font-black text-rose-400 underline decoration-rose-500/30 hover:text-rose-300">
                Mở cài đặt Key
              </button>
            )}
          </div>
        )}

        <div className={`${embeddedUrl ? 'w-full h-full' : 'max-w-[1600px] mx-auto h-full'}`}>
          {activeTab === 'analysis' && !embeddedUrl ? (
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 h-full">
              
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1 h-3 bg-emerald-500/40 rounded-full"></div>
                    <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">BIỂU ĐỒ: {searchSymbol}</h2>
                  </div>
                  
                  <div 
                    onClick={() => !selectedImage && fileInputRef.current?.click()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith('image/')) {
                         const reader = new FileReader();
                         reader.onload = (ev) => { setSelectedImage(ev.target?.result as string); setMimeType(file.type); };
                         reader.readAsDataURL(file);
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className={`relative border-2 border-dashed rounded-3xl transition-all duration-500 flex items-center justify-center min-h-[420px] cursor-pointer overflow-hidden ${selectedImage ? 'border-emerald-500/20 bg-zinc-950/40' : 'border-white/[0.02] bg-[#0c0c0e]/50 hover:bg-[#121214]/50'}`}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => { setSelectedImage(ev.target?.result as string); setMimeType(file.type); };
                        reader.readAsDataURL(file);
                      }
                    }} />
                    {selectedImage ? (
                      <div className="p-4 w-full h-full flex items-center justify-center">
                        <img src={selectedImage} alt="Chart" className="max-w-full max-h-[450px] object-contain rounded-xl shadow-2xl animate-report" />
                        <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setResult(null); }} className="absolute top-4 right-4 w-9 h-9 bg-zinc-950/90 rounded-full border border-white/[0.05] text-zinc-500 hover:text-rose-500 transition-colors">
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-12 group">
                        <i className="fa-solid fa-cloud-arrow-up text-3xl mb-4 block text-zinc-800 group-hover:text-emerald-500/40 transition-colors"></i>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-500 transition-colors">Kéo thả biểu đồ vào đây</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <i className="fa-solid fa-keyboard text-emerald-500/30 text-[10px]"></i>
                    <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Câu hỏi chuyên sâu</h2>
                  </div>
                  <div className="bg-[#0c0c0e] border border-white/[0.03] rounded-2xl p-4">
                    <textarea 
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="VD: Có nên mua ở vùng giá này không?"
                      className="w-full bg-transparent border-none focus:ring-0 text-zinc-300 text-[11px] font-medium placeholder:text-zinc-800 min-h-[140px] resize-none terminal-scrollbar leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2 px-1">
                  <i className="fa-solid fa-robot text-emerald-500/40 text-[10px]"></i>
                  <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">AI Chiến Lược {searchSymbol}</h2>
                </div>

                {loading ? (
                  <div className="flex-1 bg-[#0c0c0e] rounded-[2.5rem] border border-white/[0.03] flex flex-col items-center justify-center p-12 shadow-2xl">
                    <div className="w-14 h-14 border-2 border-emerald-500/5 border-t-emerald-500 rounded-full animate-spin mb-8"></div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">Analyzing Pattern Data...</span>
                  </div>
                ) : result ? (
                  <div className="flex-1 glass-panel rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden animate-report border-emerald-500/10 shadow-2xl">
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/[0.04]">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em]">Strategic Recommendation</span>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tight">{result.symbol}</h1>
                      </div>
                      <RecommendationBadge type={result.recommendation} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-black/40 border border-white/[0.03] p-6 rounded-3xl text-center">
                           <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Mục tiêu (Target)</span>
                           <span className="text-3xl font-black text-emerald-400 mono">{result.targetPrice || '--.--'}</span>
                        </div>
                        <div className="bg-black/40 border border-white/[0.03] p-6 rounded-3xl text-center">
                           <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Cắt lỗ (Stop Loss)</span>
                           <span className="text-3xl font-black text-rose-400 mono">{result.stopLoss || '--.--'}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto terminal-scrollbar pr-4">
                      <div className="report-content">
                        <div dangerouslySetInnerHTML={{ __html: result.analysisSummary
                          .replace(/### (.*)/g, '<h3>$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/- (.*)/g, '<li>$1</li>')
                          .replace(/\n\n/g, '<p></p>')
                        }} />
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
                       <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Hệ thống phân tích thời gian thực</span>
                       <button onClick={() => window.print()} className="text-[9px] font-black text-emerald-500/60 hover:text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                         <i className="fa-solid fa-file-pdf"></i> PDF
                       </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 border border-dashed border-white/[0.03] rounded-[2.5rem] flex flex-col items-center justify-center p-16 text-center group">
                    <div className="w-24 h-24 bg-[#0c0c0e] rounded-[2rem] flex items-center justify-center border border-white/[0.02] mb-8 shadow-2xl">
                      <i className="fa-solid fa-shield-halved text-zinc-800 text-4xl"></i>
                    </div>
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] leading-loose max-w-[300px]">
                      HỆ THỐNG ĐANG CHỜ <br/> CUNG CẤP BIỂU ĐỒ
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <TradingGuide embeddedUrl={embeddedUrl} setEmbeddedUrl={setEmbeddedUrl} currentSymbol={searchSymbol} />
          )}
        </div>
      </main>

      <footer className="h-10 border-t border-white/[0.03] bg-[#050507] flex items-center px-6 justify-between shrink-0">
        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Personal AI Terminal Online</span>
        <span className="text-[8px] font-bold text-zinc-800 mono uppercase">Powered by Gemini 3 Flash • FireStock AI</span>
      </footer>
    </div>
  );
};

export default App;
