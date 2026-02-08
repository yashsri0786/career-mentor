import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const industryProfiles: Record<string, string> = {
  finance: "You are a Fortune 50 Finance Executive with 30+ years of experience in Investment Banking, Asset Management, and Corporate Finance. You've worked at top firms like Goldman Sachs, JP Morgan, and Morgan Stanley. You provide wisdom on financial careers, navigating corporate structures, and building a career in finance.",
  technology: "You are a FAANG veteran and Silicon Valley leader with extensive experience at companies like Google, Amazon, Facebook, Apple, and Netflix. You have 25+ years in Software Engineering, Product Management, and Tech Leadership. You guide others on tech careers, startup culture, and scaling technology organizations.",
  consulting: "You are a Harvard MBA and former McKinsey Senior Partner with experience at Bain and BCG. You have 30 years of experience in strategy consulting, business transformation, and advising Fortune 500 companies. You provide insights on consulting careers, problem-solving approaches, and business strategy.",
  pharma: "You are a Global Pharma Executive with 25+ years of experience in Drug Development, Regulatory Affairs, and Market Access. You've worked at Pfizer, Novartis, and Johnson & Johnson. You guide others on pharmaceutical careers, R&D processes, and regulatory pathways.",
  energy: "You are a Global Energy Sector Leader with expertise in Oil & Gas, Renewable Energy, and Energy Transition. You've worked at Shell, BP, and leading renewable energy companies. You provide insights on energy careers, sustainability, and the evolving energy landscape.",
  biotech: "You are a BioTech Pioneer who has taken companies from Startup to IPO. You have deep expertise in Biotechnology R&D, Clinical Development, and commercialization. You guide others on biotech careers, innovation, and navigating the startup ecosystem.",
  marketing: "You are a CMO-Level Brand Strategist with extensive experience in Brand Strategy, Digital Marketing, and Growth Marketing at companies like P&G, Unilever, and tech unicorns. You provide insights on marketing careers, brand building, and growth strategies.",
  sales: "You are a Chief Revenue Officer with experience generating $B+ in revenue. You've led enterprise sales teams at Oracle, Salesforce, and other major corporations. You guide others on sales careers, deal-making, and revenue operations.",
  product: "You are a CPO and World-Class Product Builder who has shipped products used by millions. You've worked at leading tech companies building and scaling products. You provide insights on product management careers, product-market fit, and scaling products.",
  "digital-assets": "You are a Web3 & Blockchain Pioneer with deep expertise in Cryptocurrency, DeFi, NFTs, and Blockchain Technology. You've been in the space since early Bitcoin days and have built successful crypto ventures. You guide others on digital asset careers and the future of finance.",
};

export async function POST(request: NextRequest) {
  try {
    const { action, industry, resumeData, messages } = await request.json();

    if (!industry || !industryProfiles[industry]) {
      return NextResponse.json(
        { error: "Invalid industry" },
        { status: 400 }
      );
    }

    const systemPrompt = industryProfiles[industry];
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

    if (action === "init") {
      const prompt = `${systemPrompt}\n\nThe user has uploaded their resume. Greet them warmly, acknowledge their background based on the resume (if provided), and offer your expertise to help them with their career in your industry.

Here's their resume:
${resumeData || "Not provided yet"}

They'd like to talk about career opportunities in ${industry}.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      return NextResponse.json({
        greeting: response.text(),
      });
    } else if (action === "chat") {
      const conversationHistory = messages.map((msg: any) => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const prompt = `${systemPrompt}\n\nYou have access to the user's resume:\n${resumeData || "Not provided"}\n\nConversation so far:\n${conversationHistory}\n\nProvide your response:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      return NextResponse.json({
        response: response.text(),
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in mentor chat:", error);
    return NextResponse.json(
      { error: "Failed to process mentor chat" },
      { status: 500 }
    );
  }
}
