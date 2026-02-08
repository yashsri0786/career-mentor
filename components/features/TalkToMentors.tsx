"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  expertise: string;
}

const industries: Industry[] = [
  { id: "finance", name: "Finance", icon: "💰", description: "Fortune 50 Finance Executive, 30+ yrs", expertise: "Investment Banking, Asset Management, Corporate Finance" },
  { id: "technology", name: "Technology", icon: "💻", description: "FAANG Veteran, Silicon Valley Leader", expertise: "Software Engineering, Product Management, Tech Leadership" },
  { id: "consulting", name: "Consulting", icon: "📊", description: "Harvard MBA, Ex-McKinsey Senior Partner", expertise: "Strategy Consulting, Business Transformation" },
  { id: "pharma", name: "Pharma", icon: "💊", description: "Global Pharma Executive, 25+ yrs", expertise: "Drug Development, Regulatory Affairs, Market Access" },
  { id: "energy", name: "Energy", icon: "⚡", description: "Global Energy Sector Leader", expertise: "Oil & Gas, Renewable Energy, Energy Transition" },
  { id: "biotech", name: "BioTech", icon: "🧬", description: "BioTech Pioneer, Startup to IPO", expertise: "Biotechnology R&D, Clinical Development" },
  { id: "marketing", name: "Marketing", icon: "📢", description: "CMO-Level Brand Strategist", expertise: "Brand Strategy, Digital Marketing, Growth Marketing" },
  { id: "sales", name: "Sales", icon: "📈", description: "Chief Revenue Officer, $B+ Revenue", expertise: "Enterprise Sales, Revenue Growth, Sales Operations" },
  { id: "product", name: "Product Management", icon: "📦", description: "CPO, World-Class Product Builder", expertise: "Product Strategy, Product-Market Fit, Scaling Products" },
  { id: "digital-assets", name: "Digital Assets", icon: "🪙", description: "Web3 & Blockchain Pioneer", expertise: "Cryptocurrency, DeFi, NFTs, Blockchain Technology" },
];

interface TalkToMentorsProps {
  resumeData: string;
}

export default function TalkToMentors({ resumeData }: TalkToMentorsProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectIndustry = async (industry: Industry) => {
    setSelectedIndustry(industry);
    setMessages([]);
    setLoading(true);

    try {
      const response = await fetch("/api/mentor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "init",
          industry: industry.id,
          resumeData,
        }),
      });

      const data = await response.json();
      setMessages([{ role: "assistant", content: data.greeting }]);
    } catch (error) {
      console.error("Error initializing chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedIndustry) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/mentor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          industry: selectedIndustry.id,
          messages: [...messages, { role: "user", content: userMessage }],
          resumeData,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, but I'm having trouble responding right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (selectedIndustry) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Talk to Industry Mentors</h2>
            <p className="mt-2 text-gray-600">Chatting with {selectedIndustry.name} mentor</p>
          </div>
          <button
            onClick={() => {
              setSelectedIndustry(null);
              setMessages([]);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Change Mentor
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {/* Mentor Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                {selectedIndustry.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedIndustry.name} Expert</h3>
                <p className="text-xs text-gray-600">{selectedIndustry.description}</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm prose prose-sm max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about career transitions, global markets, pivoting strategies..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputMessage.trim()}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Talk to Industry Mentors</h2>
        <p className="mt-2 text-gray-600">
          Select an industry to connect with a world-class AI mentor.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((industry) => (
          <button
            key={industry.id}
            onClick={() => handleSelectIndustry(industry)}
            className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                {industry.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{industry.description}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{industry.expertise}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center text-sm font-medium text-primary">
                Chat Now
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
