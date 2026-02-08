import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { action, name, role, interviewType, jobDescription, messages } =
      await request.json();

    if (!role || !interviewType) {
      return NextResponse.json(
        { error: "Role and interview type are required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an experienced ${interviewType} interviewer conducting an interview for the ${role} position. ${
      jobDescription
        ? `The job description is: ${jobDescription}`
        : ""
    }
    
Conduct a professional, realistic interview:
- Ask relevant questions for this interview type
- Provide constructive feedback on answers
- Ask follow-up questions based on responses
- Be encouraging but maintain professional standards
- Focus on behavioral questions for Behavioral Round
- Focus on technical/role-specific questions for Managerial Round  
- Focus on culture fit and background for HR Round`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    if (action === "start") {
      const prompt = `${systemPrompt}\n\nStart the ${interviewType} interview for ${name} applying for ${role}.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      return NextResponse.json({
        greeting: response.text(),
      });
    } else if (action === "answer") {
      const conversationHistory = messages.map((msg: any) => 
        `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.content}`
      ).join('\n');

      const prompt = `${systemPrompt}\n\nInterview conversation so far:\n${conversationHistory}\n\nProvide your next question or feedback:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      return NextResponse.json({
        response: response.text(),
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in interview prep:", error);
    return NextResponse.json(
      { error: "Failed to process interview" },
      { status: 500 }
    );
  }
}
