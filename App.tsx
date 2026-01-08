
import React, { useState, useEffect, useRef } from 'react';
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
  const [activeViewId, setActiveViewId] = useState<string | null>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [searchSymbol, setSearchSymbol] = useState<string>('VNINDEX');
  const [searchInput, setSearchInput] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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
    } catch (err) {
      setError("AI Engine đang bảo trì hoặc file lỗi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#050507] text-[#e4e4e7] overflow-hidden">
      
      {/* Institutional Header */}
      <header className="z-50 h-14 border-b border-white/[0.04] bg-[#050507]/80 backdrop-blur-xl flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('analysis'); setEmbeddedUrl(null); }}>
            <div className="w-8 h-8 bg-[#10b981] flex items-center justify-center rounded-lg shadow-lg shadow-emerald-500/20">
              <i className="fa-solid fa-bolt-lightning text-black text-xs"></i>
            </div>
            <div className="flex flex-col">
                <span className="text-white font-extrabold text-xs tracking-tight uppercase leading-none">FireStock AI</span>
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5">Terminal Pro</span>
            </div>
          </div>

          <nav className="flex items-center h-full gap-1">
            {['PHÂN TÍCH', 'HỌC VIỆN'].map((tab, idx) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(idx === 0 ? 'analysis' : 'guide')} 
                className={`px-4 h-14 text-[10px] font-black tracking-[0.2em] transition-all relative ${activeTab === (idx === 0 ? 'analysis' : 'guide') ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                {tab}
                {activeTab === (idx === 0 ? 'analysis' : 'guide') && <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full"></div>}
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
              placeholder="GÕ MÃ (VD: FPT, HPG)..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#121214] border border-white/[0.02] rounded-lg h-8 pl-9 pr-4 text-[10px] font-bold tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all placeholder:text-zinc-800"
            />
          </form>
          <button 
            onClick={() => { setActiveViewId('market'); setEmbeddedUrl('https://banggia.vndirect.com.vn/danh-muc/hose'); setActiveTab('guide'); }}
            className="flex items-center gap-2 px-4 h-8 bg-[#121214] border border-white/[0.02] rounded-lg hover:border-zinc-700 transition-all"
          >
            <i className="fa-solid fa-list-ul text-orange-500/60 text-[10px]"></i>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Bảng giá</span>
          </button>
        </div>

        <button 
          onClick={handleRunAnalysis}
          disabled={loading || !selectedImage}
          className="bg-[#10b981] hover:bg-[#34d399] disabled:opacity-20 text-black font-black text-[10px] px-6 h-8 rounded-lg transition-all uppercase tracking-widest shadow-lg shadow-emerald-500/10 flex items-center gap-2"
        >
          <i className="fa-solid fa-microchip"></i>
          {loading ? 'Đang phân tích...' : 'Xuất báo cáo AI'}
        </button>
      </header>

      <main className={`flex-1 min-h-0 bg-[#050507] overflow-y-auto terminal-scrollbar ${embeddedUrl ? 'p-8 sm:p-12' : 'p-6'}`}>
        <div className={`${embeddedUrl ? 'max-w-[1300px]' : 'max-w-[1600px]'} mx-auto h-full`}>
          {activeTab === 'analysis' && !embeddedUrl ? (
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 h-full">
              
              {/* Data Input Section */}
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1 h-3 bg-emerald-500/40 rounded-full"></div>
                    <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Nguồn dữ liệu biểu đồ: {searchSymbol}</h2>
                  </div>
                  
                  <div 
                    onClick={() => !selectedImage && fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-3xl transition-all duration-500 flex items-center justify-center min-h-[400px] cursor-pointer overflow-hidden ${selectedImage ? 'border-emerald-500/20 bg-zinc-950/40' : 'border-white/[0.02] bg-[#0c0c0e]/50 hover:bg-[#121214]/50'}`}
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
                      <div className="text-center p-12 opacity-30 group">
                        <i className="fa-solid fa-image text-4xl mb-6 block text-zinc-700"></i>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Dán hoặc kéo thả biểu đồ</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <i className="fa-solid fa-comment-dots text-emerald-500/30 text-[10px]"></i>
                    <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Yêu cầu bổ sung cho chuyên gia</h2>
                  </div>
                  <div className="bg-[#0c0c0e] border border-white/[0.03] rounded-2xl p-4 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                    <textarea 
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="VD: Phân tích kỹ râu nến vùng đỉnh. Đang nắm giá 25.5 có nên cắt lỗ không?"
                      className="w-full bg-transparent border-none focus:ring-0 text-zinc-300 text-xs font-medium placeholder:text-zinc-800 min-h-[100px] resize-none terminal-scrollbar leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* AI Report Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 px-1">
                  <i className="fa-solid fa-file-contract text-emerald-500/40 text-[10px]"></i>
                  <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Báo cáo chiến lược đầu tư</h2>
                </div>

                {loading ? (
                  <div className="flex-1 bg-[#0c0c0e] rounded-3xl border border-white/[0.03] flex flex-col items-center justify-center p-12">
                    <div className="w-10 h-10 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">Processing Market Data...</span>
                  </div>
                ) : result ? (
                  <div className="flex-1 glass-panel rounded-[2.5rem] p-8 sm:p-10 flex flex-col relative overflow-hidden animate-report border-emerald-500/5">
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/[0.04]">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em]">Official Recommendation</span>
                        <h1 className="text-xl font-black text-white uppercase tracking-tight">{searchSymbol} TERMINAL</h1>
                      </div>
                      <RecommendationBadge type={result.recommendation} />
                    </div>

                    <div className="flex-1 overflow-y-auto terminal-scrollbar pr-4">
                      <div className="report-content">
                        {/* Custom rendering of analysis text */}
                        <div dangerouslySetInnerHTML={{ __html: result.analysisSummary
                          .replace(/### (.*)/g, '<h3>$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/- (.*)/g, '<li>$1</li>')
                          .replace(/\n\n/g, '<p></p>')
                        }} />
                      </div>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/[0.04] pt-8">
                       <div className="bg-black/20 p-4 rounded-xl border border-white/[0.02]">
                         <span className="text-[8px] font-bold text-zinc-600 uppercase block mb-1 tracking-widest">Độ tin cậy</span>
                         <span className="text-xl font-black text-emerald-500 mono leading-none">{result.confidence}%</span>
                       </div>
                       <div className="bg-black/20 p-4 rounded-xl border border-white/[0.02]">
                         <span className="text-[8px] font-bold text-zinc-600 uppercase block mb-1 tracking-widest">Xếp hạng AI</span>
                         <span className="text-xs font-black text-zinc-300 uppercase leading-none mt-1 inline-block">Tier 1 Strategy</span>
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 border border-dashed border-white/[0.03] rounded-[2.5rem] flex flex-col items-center justify-center p-16 text-center">
                    <div className="w-16 h-16 bg-[#0c0c0e] rounded-2xl flex items-center justify-center border border-white/[0.02] mb-6 shadow-xl">
                      <i className="fa-solid fa-chess-knight text-zinc-800 text-2xl"></i>
                    </div>
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] leading-loose">
                      Terminal Standby <br/> Vui lòng cung cấp dữ liệu biểu đồ để khởi tạo phân tích
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-subtle"></div>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">Vision Core Active</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
            <span className="text-[9px] font-bold text-zinc-800 mono uppercase tracking-widest">Build 2025.04.Exp • FireStock AI Terminal</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
