import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const systemPrompt = `You are a Global Career Transition Specialist with expertise in:
- Career pivots and industry transitions
- International job markets and relocation
- Visa guidance and immigration pathways
- Industry-specific insights across sectors
- Upskilling and reskilling strategies
- Networking and personal branding
- Salary negotiation globally

Provide thoughtful, actionable advice tailored to each person's situation. Ask clarifying questions when needed and offer specific, practical guidance.`;

    const conversationHistory = messages.map((msg: any) => 
      `${msg.role === 'user' ? 'User' : 'Advisor'}: ${msg.content}`
    ).join('\n');

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `${systemPrompt}\n\nConversation so far:\n${conversationHistory}\n\nProvide your response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({
      response: response.text(),
    });
  } catch (error) {
    console.error("Error in career pivot:", error);
    return NextResponse.json(
      { error: "Failed to process career pivot request" },
      { status: 500 }
    );
  }
}
