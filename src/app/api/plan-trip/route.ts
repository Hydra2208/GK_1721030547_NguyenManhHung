import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, duration, budget, style, specialRequests } = body;

    if (!process.env.GROQ_API_KEY) {
      console.warn("Missing GROQ_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY in environment variables. Please add it to your .env.local file." },
        { status: 500 }
      );
    }

    const prompt = `Bạn là một trợ lý du lịch AI chuyên nghiệp người Việt. Dựa vào thông tin sau, hãy tạo một lịch trình du lịch chi tiết và thực tế.

Thông tin khách hàng yêu cầu:
- Điểm đến: ${destination || "Tùy chọn"}
- Thời gian: ${duration || "3 ngày 2 đêm"}
- Ngân sách: ${budget || "Tùy chọn"}
- Phong cách: ${style || "Thư giãn"}
- Yêu cầu đặc biệt: ${specialRequests || "Không có"}

YÊU CẦU ĐẦU RA:
Bạn PHẢI trả lời DUY NHẤT một chuỗi nội dung theo định dạng JSON hợp lệ. Không được kèm theo bất kỳ văn bản giải thích nào khác. Cấu trúc chính xác tuyệt đối như sau:
{
  "trip_summary": {
    "destination": "[Điểm đến chính xác]",
    "duration": "[Thời gian cụ thể]",
    "total_estimated_budget": "[Tổng chi phí dự kiến theo dạng VNĐ]",
    "style": "[Phong cách chính]"
  },
  "itinerary": [
    {
      "day": 1,
      "theme": "[Chủ đề ngắn gọn của ngày 1]",
      "activities": [
        {
          "time": "[Giờ phút, VD: 08:00]",
          "location": "[Tên địa điểm cụ thể]",
          "description": "[Mô tả hoạt động chi tiết, hấp dẫn]",
          "estimated_cost": "[Chi phí dự kiến của hoạt động này]"
        }
      ]
    }
  ],
  "travel_tips": [
    "[Lưu ý, mẹo du lịch thật hữu ích 1]",
    "[Lưu ý, mẹo du lịch thật hữu ích 2]",
    "[Lưu ý, mẹo du lịch thật hữu ích 3]"
  ]
}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    let text = chatCompletion.choices[0]?.message?.content || "";

    console.log("Groq Generated Content successfully.");

    // Clean up potential markdown blocks from the response just in case
    if (text.startsWith("\`\`\`json")) {
      text = text.replace(/^\`\`\`json/, "").replace(/\`\`\`$/, "");
    } else if (text.startsWith("\`\`\`")) {
      text = text.replace(/^\`\`\`/, "").replace(/\`\`\`$/, "");
    }
    
    text = text.trim();
    
    const parsedData = JSON.parse(text);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Failed to generate plan using AI" }, { status: 500 });
  }
}
