
export interface StockRecommendation {
  symbol: string;
  recommendation: 'BUY' | 'SELL' | 'HOLD' | 'WAIT';
  confidence: number;
  priceCurrent: string;
  priceChange: string;
  analysisSummary: string;
  last3MonthsAnalysis: string;
  next2DaysOrientation: string; // Đổi từ last2Days sang next2Days
  currentSessionAnalysis: string;
  sources: { title: string; uri: string }[];
}

export interface ChartData {
  date: string;
  price: number;
  volume: number;
}
