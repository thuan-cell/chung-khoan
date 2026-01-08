
import React from 'react';

interface Props {
  type: 'BUY' | 'SELL' | 'HOLD' | 'WAIT';
}

const RecommendationBadge: React.FC<Props> = ({ type }) => {
  const styles = {
    BUY: "bg-[#089981]/15 text-[#089981] border-[#089981]/30 shadow-[0_0_20px_rgba(8,153,129,0.1)]",
    SELL: "bg-[#f23645]/15 text-[#f23645] border-[#f23645]/30 shadow-[0_0_20px_rgba(242,54,69,0.1)]",
    HOLD: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
    WAIT: "bg-zinc-800/50 text-zinc-400 border-zinc-700 shadow-none",
  };

  const labels = {
    BUY: "MUA MẠNH",
    SELL: "BÁN MẠNH",
    HOLD: "NẮM GIỮ",
    WAIT: "QUAN SÁT",
  };

  return (
    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] border transition-all duration-500 uppercase ${styles[type]}`}>
      <span className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full bg-current ${type !== 'WAIT' ? 'animate-pulse' : ''}`}></div>
        {labels[type]}
      </span>
    </div>
  );
};

export default RecommendationBadge;
