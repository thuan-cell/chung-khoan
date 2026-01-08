
import { GoogleGenAI } from "@google/genai";
import { StockRecommendation } from "../types";

export const analyzeStockWithImage = async (
  base64Image: string, 
  mimeType: string, 
  symbol: string = "CỔ PHIẾU",
  customPrompt: string = ""
): Promise<StockRecommendation> => {
  // Khởi tạo ngay trước khi dùng để đảm bảo lấy đúng API_KEY từ environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Bạn là một CHUYÊN GIA PHÂN TÍCH CHIẾN LƯỢC CAO CẤP.
    NHIỆM VỤ: Phân tích biểu đồ chứng khoán và đưa ra khuyến nghị.
    CẤU TRÚC:
    ### 1. XU HƯỚNG
    ### 2. DỰ BÁO
    ### 3. CHIẾN LƯỢC
    - **Hành động:** [MUA/BÁN/NẮM GIỮ/QUAN SÁT]
    - **Target:** [Giá]
    - **Stop Loss:** [Giá]
  `;

  const prompt = `Phân tích mã: ${symbol.toUpperCase()}. ${customPrompt}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      },
    });

    const text = response.text || "Không có phản hồi từ AI.";
    
    let rec: 'BUY' | 'SELL' | 'HOLD' | 'WAIT' = 'WAIT';
    const upperText = text.toUpperCase();
    if (upperText.includes("MUA")) rec = 'BUY';
    else if (upperText.includes("BÁN")) rec = 'SELL';
    else if (upperText.includes("NẮM GIỮ")) rec = 'HOLD';

    const targetMatch = text.match(/(?:Target|Mục tiêu).*?\*\*([\d.]+)\*\*/i);
    const stopLossMatch = text.match(/(?:Stop Loss|Dừng lỗ).*?\*\*([\d.]+)\*\*/i);

    return {
      symbol: symbol.toUpperCase(),
      recommendation: rec,
      confidence: 90,
      priceCurrent: "Live",
      priceChange: "N/A",
      analysisSummary: text,
      last3MonthsAnalysis: "",
      next2DaysOrientation: "",
      currentSessionAnalysis: "",
      targetPrice: targetMatch ? targetMatch[1] : undefined,
      stopLoss: stopLossMatch ? stopLossMatch[1] : undefined,
      sources: []
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Truyền lỗi ra ngoài để UI xử lý (ví dụ yêu cầu chọn lại Key)
    throw error;
  }
};
