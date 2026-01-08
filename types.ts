
export interface StockRecommendation {
  symbol: string;
  recommendation: 'BUY' | 'SELL' | 'HOLD' | 'WAIT';
  confidence: number;
  priceCurrent: string;
  priceChange: string;
  analysisSummary: string;
  last3MonthsAnalysis: string;
  next2DaysOrientation: string;
  currentSessionAnalysis: string;
  targetPrice?: string;
  stopLoss?: string;
  sources: { title: string; uri: string }[];
}

export interface WatchlistItem {
  symbol: string;
  addedAt: number;
}

export interface ChartData {
  date: string;
  price: number;
  volume: number;
}
