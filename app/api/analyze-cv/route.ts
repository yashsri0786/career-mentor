import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an expert career advisor and resume reviewer. Analyze the provided resume and provide a comprehensive analysis covering:
1. Overall Structure & Formatting
2. Content Quality & Clarity
3. Key Strengths
4. Areas for Improvement
5. Missing Information
6. Industry-Specific Recommendations
7. Action Items

Be specific, constructive, and professional in your feedback.

Resume to analyze:
${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error analyzing CV:", error);
    return NextResponse.json(
      { error: "Failed to analyze CV. Please check your API key." },
      { status: 500 }
    );
  }
}
