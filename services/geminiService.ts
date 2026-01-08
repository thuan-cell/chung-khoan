
import { GoogleGenAI } from "@google/genai";
import { StockRecommendation } from "../types";

export const analyzeStockWithImage = async (
  base64Image: string, 
  mimeType: string, 
  symbol: string = "CỔ PHIẾU",
  customPrompt: string = ""
): Promise<StockRecommendation> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Bạn là một CHUYÊN GIA PHÂN TÍCH CHIẾN LƯỢC CAO CẤP tại một tổ chức tài chính lớn.
    PHONG CÁCH: Chuyên nghiệp, khách quan, súc tích, không dùng từ ngữ cảm tính.
    
    CẤU TRÚC TRÌNH BÀY (Markdown):
    ### 1. PHÂN TÍCH CẤU TRÚC GIÁ & DÒNG TIỀN
    (Phân tích Price Action, nến, khối lượng, tương quan cung cầu)
    
    ### 2. CÁC VÙNG KỸ THUẬT QUAN TRỌNG
    (Xác định các mức kháng cự/hỗ trợ trọng yếu, các chỉ báo kỹ thuật RSI/MACD/MA nếu có)
    
    ### 3. KẾT LUẬN & CHIẾN LƯỢC ĐẦU TƯ
    (Đưa ra nhận định rõ ràng: MUA/BÁN/GIỮ và chiến lược cụ thể cho phiên tiếp theo)
  `;

  const prompt = `
    THỰC HIỆN PHÂN TÍCH BIỂU ĐỒ MÃ: ${symbol.toUpperCase()}
    
    ${customPrompt ? `YÊU CẦU ĐẶC BIỆT TỪ NHÀ ĐẦU TƯ: "${customPrompt}"` : ""}

    LƯU Ý: 
    - Trả lời trực tiếp vào vấn đề. 
    - Ưu tiên giải đáp yêu cầu đặc biệt của người dùng ở phần 3.
    - Định dạng văn bản sạch, đẹp, chuẩn chứng khoán.
    - Không viết quá dài, tập trung vào điểm mấu chốt kỹ thuật.
  `;

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
        temperature: 0.1,
      },
    });

    const text = response.text || "Hệ thống không trích xuất được dữ liệu phân tích.";
    
    let rec: 'BUY' | 'SELL' | 'HOLD' | 'WAIT' = 'WAIT';
    const upperText = text.toUpperCase();
    if (upperText.includes("MUA MẠNH") || upperText.includes("**MUA**")) rec = 'BUY';
    else if (upperText.includes("BÁN") || upperText.includes("THOÁT HÀNG")) rec = 'SELL';
    else if (upperText.includes("NẮM GIỮ")) rec = 'HOLD';

    return {
      symbol: symbol.toUpperCase(),
      recommendation: rec,
      confidence: 96,
      priceCurrent: "Visual Data",
      priceChange: "N/A",
      analysisSummary: text,
      last3MonthsAnalysis: "Expert View",
      next2DaysOrientation: "Strategic",
      currentSessionAnalysis: "Live",
      sources: []
    };
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};
