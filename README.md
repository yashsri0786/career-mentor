# CareerMentor - AI-Powered Career Advisory Platform

A production-ready, professional career mentoring application built with Next.js, TypeScript, and OpenAI's GPT-4. This platform helps users with resume analysis, ATS matching, industry mentorship, interview preparation, and career transition guidance.

## 🌟 Features

### 1. **Analyze CV**
- Upload resume in PDF, DOCX, or TXT format
- Get comprehensive AI-powered analysis
- Receive actionable insights and improvement suggestions
- Identify strengths, weaknesses, and missing information

### 2. **ATS Matching**
- Compare resume against job descriptions
- Get ATS compatibility score (0-100%)
- Visual circular progress indicator with color-coded scoring
- Detailed match report with missing keywords
- Specific recommendations to improve ATS compatibility

### 3. **Talk to Mentors**
- Connect with AI mentors from 10+ industries:
  - Finance (Fortune 50 Executive, 30+ yrs)
  - Technology (FAANG Veteran)
  - Consulting (Harvard MBA, Ex-McKinsey Senior Partner)
  - Pharma, Energy, BioTech
  - Marketing, Sales, Product Management
  - Digital Assets & Web3
- Personalized guidance based on your resume
- Industry-specific insights and career advice

### 4. **Interview Prep**
- Practice with AI interviewer
- Choose from multiple roles (Product Manager, Software Engineer, Consultant, etc.)
- Select interview type:
  - HR Round
  - Managerial Round
  - Behavioral Round
- Optional job description input for tailored questions
- Real-time feedback and follow-up questions

### 5. **Career Pivot Advisor**
- Expert guidance on career transitions
- International job market insights
- Visa and immigration pathways
- Industry transition strategies
- Upskilling recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd career-mentor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Add your OpenAI API key to `.env.local`:**
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI GPT-4
- **File Processing:** 
  - pdf-parse (PDF extraction)
  - mammoth (DOCX extraction)
- **UI Components:**
  - react-circular-progressbar (ATS score visualization)
  - Custom components with Tailwind CSS

## 📁 Project Structure

```
career-mentor/
├── app/
│   ├── api/                  # API routes
│   │   ├── analyze-cv/       # CV analysis endpoint
│   │   ├── ats-match/        # ATS matching endpoint
│   │   ├── career-pivot/     # Career pivot advisor
│   │   ├── extract-text/     # File text extraction
│   │   ├── interview-prep/   # Interview preparation
│   │   └── mentor-chat/      # Industry mentor chat
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── features/             # Feature components
│   │   ├── AnalyzeCV.tsx
│   │   ├── ATSMatching.tsx
│   │   ├── TalkToMentors.tsx
│   │   ├── InterviewPrep.tsx
│   │   └── CareerPivot.tsx
│   └── Header.tsx            # App header
├── lib/
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── .env.local.example        # Environment variables template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Features Walkthrough

### Resume Analysis
1. Navigate to "Analyze CV" tab
2. Upload your resume (PDF/DOCX/TXT)
3. Click "Analyze Resume"
4. Review comprehensive analysis with actionable insights

### ATS Matching
1. Go to "ATS Matching" tab
2. Upload your resume (or use previously uploaded)
3. Paste the job description
4. Click "Generate Match Report"
5. View match percentage and detailed recommendations

### Talk to Mentors
1. Select "Talk to Mentors" tab
2. Choose an industry (Finance, Tech, Consulting, etc.)
3. Chat with AI mentor specialized in that field
4. Get personalized career advice based on your resume

### Interview Practice
1. Open "Interview Prep" tab
2. Enter your name and select target role
3. Choose interview type (HR/Managerial/Behavioral)
4. Optionally paste job description
5. Click "Interview Me" to start practice session

### Career Pivot
1. Access "Career Pivot" tab
2. Chat with Global Career Transition Specialist
3. Get advice on career transitions, relocation, visa guidance, etc.

## 🔒 Environment Variables

Create a `.env.local` file with:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🤝 Contributing

This is a professional career mentoring platform. Contributions are welcome!

## 📄 License

This project is private and proprietary.

## 🙋 Support

For support or questions, please refer to the documentation or contact the development team.

## 🔮 Future Enhancements

- Resume templates and builder
- Cover letter generation
- Salary negotiation simulator
- Career path recommendations
- Job search tracking
- LinkedIn profile optimization
- Networking strategy advisor
- Mock assessment tests

## ⚠️ Important Notes

1. **API Costs:** This app uses OpenAI's GPT-4 API which incurs costs. Monitor your usage.
2. **Rate Limits:** Be aware of OpenAI API rate limits for your tier.
3. **Data Privacy:** User data is not stored permanently; all processing is real-time.
4. **File Size:** Resume uploads are limited by Next.js default limits (~4.5MB).

---

**Designed as part of BMA5434 Design Thinking and Business Innovations (Prof Emily) | Team 3**

Built with ❤️ for career success
