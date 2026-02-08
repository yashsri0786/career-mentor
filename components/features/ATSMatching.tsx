"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getMatchScoreColor, extractTextFromFile } from "@/lib/utils";

interface ATSMatchingProps {
  uploadedResume: string;
}

export default function ATSMatching({ uploadedResume }: ATSMatchingProps) {
  const [resumeText, setResumeText] = useState<string>(uploadedResume);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [report, setReport] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const text = await extractTextFromFile(e.target.files[0]);
        setResumeText(text);
      } catch (error) {
        console.error("Error extracting text:", error);
        alert("Failed to extract text from file");
      }
    }
  };

  const handleGenerateReport = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please provide both resume and job description");
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch("/api/ats-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await response.json();
      setMatchScore(data.matchScore);
      setReport(data.report);
    } catch (error) {
      console.error("Error generating match report:", error);
      alert("Failed to generate match report");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">ATS Matching</h2>
        <p className="mt-2 text-gray-600">
          Compare your resume against a job description for ATS compatibility analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Resume Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Your Resume</h3>
          </div>

          {resumeText ? (
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-xs font-medium text-primary mb-2">Resume loaded</p>
                <p className="text-sm text-gray-700 line-clamp-4">
                  {resumeText.substring(0, 200)}...
                </p>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Upload different resume</span>
                <input
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload your resume or paste its content below
              </p>
              <label className="block">
                <input
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          )}
        </div>

        {/* Job Description Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-48 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleGenerateReport}
          disabled={!resumeText || !jobDescription || analyzing}
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {analyzing ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M7,9.5A1.5,1.5 0 0,0 5.5,11A1.5,1.5 0 0,0 7,12.5A1.5,1.5 0 0,0 8.5,11A1.5,1.5 0 0,0 7,9.5M17,9.5A1.5,1.5 0 0,0 15.5,11A1.5,1.5 0 0,0 17,12.5A1.5,1.5 0 0,0 18.5,11A1.5,1.5 0 0,0 17,9.5M12,17A4,4 0 0,0 16,13H8A4,4 0 0,0 12,17Z" />
              </svg>
              Generating Report... (~30 seconds)
            </>
          ) : (
            "Generate Match Report"
          )}
        </button>
      </div>

      {/* Match Report */}
      {matchScore !== null && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Match Report</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
              <div className="w-40 h-40 mb-4">
                <CircularProgressbar
                  value={matchScore}
                  text={`${matchScore}%`}
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: getMatchScoreColor(matchScore),
                    textColor: getMatchScoreColor(matchScore),
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-600">ATS Match Score</p>
            </div>

            <div className="md:col-span-2">
              <div className="prose prose-sm max-w-none">
                <div className="prose prose-sm max-w-none text-gray-700">
                  <ReactMarkdown>{report}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
