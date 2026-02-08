# Supabase Database Setup

## 🔧 Setup Instructions

### 1. Create Database Tables

Go to your Supabase Dashboard → SQL Editor and run this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create resumes table
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  resume_text TEXT NOT NULL,
  analysis TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ATS matches table
CREATE TABLE ats_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  job_description TEXT NOT NULL,
  match_score INTEGER NOT NULL,
  report TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat sessions table
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  industry TEXT NOT NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for resumes
CREATE POLICY "Users can view their own resumes" 
  ON resumes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resumes" 
  ON resumes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes" 
  ON resumes FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes" 
  ON resumes FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for ats_matches
CREATE POLICY "Users can view their own ATS matches" 
  ON ats_matches FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ATS matches" 
  ON ats_matches FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policies for chat_sessions
CREATE POLICY "Users can view their own chat sessions" 
  ON chat_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat sessions" 
  ON chat_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat sessions" 
  ON chat_sessions FOR UPDATE 
  USING (auth.uid() = user_id);
```

### 2. Enable Email Authentication (REQUIRED)

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. **IMPORTANT:** Disable email confirmation to allow instant signups:
   - Go to **Authentication** → **Settings**
   - Scroll to "Email Auth"
   - **Uncheck "Enable email confirmations"**
   - This allows testers to sign up instantly without waiting for email

### 3. Test Your Setup

1. Refresh your app at http://localhost:3000
2. You should see the login page
3. Create an account
4. Log in and start using the app!

## ✅ What Supabase Provides

- **User Authentication**: Login/signup with email & password
- **Database Storage**: All CVs, analyses, and chats saved
- **Row Level Security**: Users can only see their own data
- **Real-time**: Automatic UI updates when data changes

## 🎯 Features Enabled

1. **User Accounts**: Each user has their own secure account
2. **CV Library**: All uploaded resumes saved to your account
3. **History**: View past CV analyses and ATS matches
4. **Chat History**: All mentor conversations saved
5. **Multi-device**: Access your data from anywhere

## 🔐 Security

- Passwords are hashed
- Row Level Security ensures data privacy
- Only authenticated users can access the app
- Each user can only see their own data
