import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an ATS (Applicant Tracking System) expert and career advisor. Analyze the resume against the job description and provide:
1. An overall match score (0-100)
2. Matching keywords and skills found
3. Missing keywords and skills
4. Recommendations for improvement
5. Specific suggestions to increase ATS compatibility

Format your response as follows:
MATCH_SCORE: [number]
[Detailed analysis in a well-structured format]

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide a detailed ATS match analysis.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract match score
    const scoreMatch = text.match(/MATCH_SCORE:\s*(\d+)/);
    const matchScore = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    
    // Remove the score line from the report
    const report = text.replace(/MATCH_SCORE:\s*\d+\n?/, "").trim();

    return NextResponse.json({ matchScore, report });
  } catch (error) {
    console.error("Error generating ATS match report:", error);
    return NextResponse.json(
      { error: "Failed to generate ATS match report" },
      { status: 500 }
    );
  }
}
