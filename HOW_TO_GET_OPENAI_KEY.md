# How to Get Your OpenAI API Key

## 📝 Step-by-Step Guide

### 1. Create an OpenAI Account
1. Visit: **https://platform.openai.com/signup**
2. Sign up with your email or Google/Microsoft account
3. Verify your email address

### 2. Add Payment Method
⚠️ **Important:** You need to add a payment method to use the API
1. Go to: **https://platform.openai.com/account/billing/overview**
2. Click "Add payment method"
3. Enter your credit card details
4. You may need to add initial credits ($5-$20 recommended)

### 3. Generate API Key
1. Visit: **https://platform.openai.com/api-keys**
2. Click **"+ Create new secret key"**
3. Give it a name (e.g., "CareerMentor App")
4. **IMPORTANT:** Copy the key immediately - you won't see it again!
5. The key will look like: `sk-proj-xxxxxxxxxxxxxxxxxxxxx`

### 4. Add Key to Your Application

**Option A: Using Text Editor**
1. Open: `/Users/I332255/Downloads/BMA5434_8thFebTry/career-mentor/.env.local`
2. Replace `your_openai_api_key_here` with your actual key:
   ```
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```
3. Save the file

**Option B: Using Terminal**
```bash
cd /Users/I332255/Downloads/BMA5434_8thFebTry/career-mentor
nano .env.local
# Edit the file, save with Ctrl+X, Y, Enter
```

### 5. Restart the Application
After adding your key:
```bash
# Press Ctrl+C in the terminal running the app
# Then restart:
npm run dev
```

## 💰 Pricing Information

**GPT-4 API Costs (as of 2024):**
- Input: ~$0.03 per 1K tokens (~750 words)
- Output: ~$0.06 per 1K tokens (~750 words)

**Estimated costs for this app:**
- Resume Analysis: $0.10-0.20 per analysis
- ATS Matching: $0.15-0.25 per report
- Mentor Chat: $0.05-0.10 per message
- Interview Prep: $0.05-0.10 per Q&A

**Tips to manage costs:**
- Start with $10 credit (enough for ~50-100 interactions)
- Set spending limits in OpenAI dashboard
- Monitor usage at: https://platform.openai.com/usage

## 🔐 Security Best Practices

1. **Never share your API key** publicly
2. **Never commit `.env.local`** to Git (already in .gitignore)
3. **Rotate keys periodically** for security
4. **Set spending limits** in OpenAI dashboard
5. **Monitor usage regularly**

## 🆘 Troubleshooting

### Error: "Invalid API Key"
- Double-check you copied the entire key
- Ensure no extra spaces before/after the key
- Verify the key hasn't been deleted in OpenAI dashboard

### Error: "Insufficient Credits"
- Add credits at: https://platform.openai.com/account/billing/overview
- Minimum $5 recommended to start

### Error: "Rate Limit Exceeded"
- Wait a few minutes and try again
- Upgrade to paid tier for higher limits
- Check: https://platform.openai.com/account/rate-limits

## 📞 Need More Help?

- OpenAI Documentation: https://platform.openai.com/docs
- OpenAI Support: https://help.openai.com
- API Status: https://status.openai.com

---

## Quick Start After Getting Key

1. Add key to `.env.local`
2. Restart the app (Ctrl+C, then `npm run dev`)
3. Open http://localhost:3000
4. Test with a resume upload!

🎉 You're ready to use CareerMentor!
