"use client";

import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { extractTextFromFile } from "@/lib/utils";

interface AnalyzeCVProps {
  onResumeUpload: (text: string) => void;
}

export default function AnalyzeCV({ onResumeUpload }: AnalyzeCVProps) {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      await handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile) {
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
      ];

      if (!validTypes.includes(selectedFile.type)) {
        alert("Please upload a PDF, DOCX, or TXT file");
        return;
      }

      setFile(selectedFile);
      try {
        const text = await extractTextFromFile(selectedFile);
        setResumeText(text);
        onResumeUpload(text);
      } catch (error) {
        console.error("Error extracting text:", error);
        alert("Failed to extract text from file");
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileSelect(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText) {
      alert("Please upload a resume first");
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      const data = await response.json();
      setReport(data.analysis);
    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Failed to analyze CV");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Analyze Your CV</h2>
        <p className="mt-2 text-gray-600">
          Upload your resume for a comprehensive AI-powered analysis with actionable insights.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Upload Resume</h3>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Upload your resume
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Drag & drop or click to browse. PDF, DOCX, or TXT.
              </p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                />
                <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 inline-block">
                  Browse Files
                </span>
              </label>
            </div>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {resumeText.substring(0, 300)}...
              </p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!resumeText || analyzing}
            className="w-full mt-6 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {analyzing ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M7,9.5A1.5,1.5 0 0,0 5.5,11A1.5,1.5 0 0,0 7,12.5A1.5,1.5 0 0,0 8.5,11A1.5,1.5 0 0,0 7,9.5M17,9.5A1.5,1.5 0 0,0 15.5,11A1.5,1.5 0 0,0 17,12.5A1.5,1.5 0 0,0 18.5,11A1.5,1.5 0 0,0 17,9.5M12,17A4,4 0 0,0 16,13H8A4,4 0 0,0 12,17Z" />
                </svg>
                Analyzing... (takes ~30 seconds)
              </>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </div>

        {/* Analysis Report Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Analysis Report</h3>
          </div>

          {!report ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600">
                Upload your resume and click analyze to get your detailed report.
              </p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="prose prose-sm max-w-none text-gray-700">
                <ReactMarkdown>{report}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
