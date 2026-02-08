# CareerMentor - Quick Setup Guide

## ✅ Installation Complete!

All dependencies have been installed successfully. Follow these final steps to get started:

## 🔑 Step 1: Configure OpenAI API Key

1. **Get your OpenAI API Key:**
   - Visit: https://platform.openai.com/api-keys
   - Create a new API key if you don't have one

2. **Create environment file:**
   ```bash
   cd /Users/I332255/Downloads/BMA5434_8thFebTry/career-mentor
   cp .env.local.example .env.local
   ```

3. **Edit `.env.local` and add your API key:**
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## 🚀 Step 2: Run the Application

### Development Mode
```bash
cd /Users/I332255/Downloads/BMA5434_8thFebTry/career-mentor
npm run dev
```

Then open: **http://localhost:3000**

### Production Mode
```bash
npm run build
npm start
```

## 📋 Features Overview

### 1. Analyze CV
- **Tab:** Analyze CV
- **Action:** Upload resume → Click "Analyze Resume"
- **Output:** Comprehensive AI analysis with actionable insights

### 2. ATS Matching
- **Tab:** ATS Matching
- **Action:** Upload resume + Paste JD → Click "Generate Match Report"
- **Output:** Match score (0-100%) with detailed recommendations

### 3. Talk to Mentors
- **Tab:** Talk to Mentors
- **Action:** Select industry → Chat with AI mentor
- **Industries Available:**
  - Finance (Fortune 50 Executive, 30+ yrs)
  - Technology (FAANG Veteran)
  - Consulting (Harvard MBA, Ex-McKinsey Senior Partner)
  - Pharma, Energy, BioTech
  - Marketing, Sales, Product Management
  - Digital Assets

### 4. Interview Prep
- **Tab:** Interview Prep
- **Action:** Enter name + Select role + Choose interview type → "Interview Me"
- **Types:** HR Round, Managerial Round, Behavioral Round
- **Output:** Interactive AI interview with real-time feedback

### 5. Career Pivot
- **Tab:** Career Pivot
- **Action:** Chat about career transitions
- **Topics:** International markets, visa guidance, industry pivots

## 🎨 Supported File Formats

- **PDF** (.pdf)
- **Word** (.docx, .doc)
- **Text** (.txt)

## 💡 Tips for Best Results

1. **Resume Quality:** Ensure your resume is well-formatted before uploading
2. **JD Details:** Paste complete job descriptions for better ATS matching
3. **Be Specific:** Ask specific questions to mentors for targeted advice
4. **Interview Practice:** Treat the AI interviewer like a real interview

## 🔧 Troubleshooting

### Issue: "Failed to analyze CV"
- **Solution:** Check your OpenAI API key is correct in `.env.local`
- **Solution:** Ensure you have credits in your OpenAI account

### Issue: "Cannot extract text from file"
- **Solution:** Ensure file is PDF, DOCX, or TXT format
- **Solution:** Check file is not corrupted or password-protected

### Issue: Port 3000 already in use
- **Solution:** Run on different port: `npm run dev -- -p 3001`

### Issue: TypeScript errors
- **Solution:** Restart VS Code or run: `npm run build`

## 📊 API Usage & Costs

This application uses OpenAI's GPT-4 API:
- **Model:** GPT-4 (for best quality responses)
- **Costs:** Variable based on token usage
- **Monitoring:** Check usage at https://platform.openai.com/usage

**Estimated costs per feature:**
- Analyze CV: ~$0.10-0.20 per analysis
- ATS Match: ~$0.15-0.25 per report
- Mentor Chat: ~$0.05-0.10 per message
- Interview Prep: ~$0.05-0.10 per question/answer

## 🎯 Next Steps

1. ✅ Start development server: `npm run dev`
2. ✅ Open http://localhost:3000
3. ✅ Upload a sample resume to test
4. ✅ Try each feature to familiarize yourself

## 📱 Mobile & Desktop Support

The application is fully responsive:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Keep your OpenAI API key private
- Monitor API usage regularly
- User data is not stored (all processing is real-time)

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Review error messages in browser console
- Check terminal output for backend errors

---

**Ready to launch!** 🚀 Run `npm run dev` to start your Career Mentor application.
