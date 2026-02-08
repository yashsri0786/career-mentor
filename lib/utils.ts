import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function extractTextFromFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/extract-text", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to extract text from file");
  }

  const data = await response.json();
  return data.text;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getMatchScoreColor(score: number): string {
  if (score < 60) return "#EF4444"; // red
  if (score < 75) return "#F59E0B"; // orange
  if (score < 85) return "#10B981"; // green
  return "#14B8A6"; // teal
}
