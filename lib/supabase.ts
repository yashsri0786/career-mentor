import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Resume = {
  id: string
  user_id: string
  file_name: string
  resume_text: string
  analysis?: string
  created_at: string
  updated_at: string
}

export type ATSMatch = {
  id: string
  user_id: string
  resume_id: string
  job_description: string
  match_score: number
  report: string
  created_at: string
}

export type ChatSession = {
  id: string
  user_id: string
  industry: string
  messages: any[]
  created_at: string
  updated_at: string
}
