"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyzeCV from "@/components/features/AnalyzeCV";
import ATSMatching from "@/components/features/ATSMatching";
import TalkToMentors from "@/components/features/TalkToMentors";
import InterviewPrep from "@/components/features/InterviewPrep";
import CareerPivot from "@/components/features/CareerPivot";

type Tab = "analyze-cv" | "ats-matching" | "talk-to-mentors" | "interview-prep" | "career-pivot";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("analyze-cv");
  const [uploadedResume, setUploadedResume] = useState<string>("");
  const [candidateName, setCandidateName] = useState<string>("");

  // Extract candidate name from resume
  const handleResumeUpload = (resumeText: string) => {
    setUploadedResume(resumeText);
    
    // Simple name extraction: look for common patterns
    const lines = resumeText.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      // First non-empty line is usually the name
      const firstLine = lines[0].trim();
      // Check if it looks like a name (2-4 words, no special chars)
      if (/^[A-Za-z\s]{2,50}$/.test(firstLine) && firstLine.split(' ').length <= 4) {
        setCandidateName(firstLine);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("analyze-cv")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "analyze-cv"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Analyze CV
            </button>
            
            <button
              onClick={() => setActiveTab("ats-matching")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "ats-matching"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              ATS Matching
            </button>
            
            <button
              onClick={() => setActiveTab("talk-to-mentors")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "talk-to-mentors"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Talk to Mentors
            </button>
            
            <button
              onClick={() => setActiveTab("interview-prep")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "interview-prep"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Interview Prep
            </button>
            
            <button
              onClick={() => setActiveTab("career-pivot")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "career-pivot"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Career Pivot
            </button>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div style={{ display: activeTab === "analyze-cv" ? "block" : "none" }}>
          <AnalyzeCV onResumeUpload={handleResumeUpload} />
        </div>
        <div style={{ display: activeTab === "ats-matching" ? "block" : "none" }}>
          <ATSMatching uploadedResume={uploadedResume} />
        </div>
        <div style={{ display: activeTab === "talk-to-mentors" ? "block" : "none" }}>
          <TalkToMentors resumeData={uploadedResume} />
        </div>
        <div style={{ display: activeTab === "interview-prep" ? "block" : "none" }}>
          <InterviewPrep candidateName={candidateName} />
        </div>
        <div style={{ display: activeTab === "career-pivot" ? "block" : "none" }}>
          <CareerPivot />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
