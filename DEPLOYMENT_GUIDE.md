# 🚀 CareerMentor - Deployment Guide

Deploy your app to a public URL in **5 minutes** for your 20+ testers!

---

## ⚡ FASTEST: Deploy to Vercel (Recommended)

**Why Vercel?**
- ✅ FREE forever for personal projects
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Perfect for Next.js apps
- ✅ Deploy in 2 minutes

### Step-by-Step:

1. **Install Vercel CLI** (Type 'y' when prompted):
```bash
cd /Users/I332255/Downloads/BMA5434_8thFebTry/career-mentor
npx vercel login
```

2. **Login/Signup**:
   - Opens browser automatically
   - Sign up with GitHub, GitLab, or Email (FREE)
   - Click "Continue" in the browser

3. **Deploy**:
```bash
npx vercel --prod
```

4. **Answer the prompts**:
   - Set up and deploy? **Y**
   - Which scope? **Press Enter** (your account)
   - Link to existing project? **N**
   - Project name? **Press Enter** (keep "career-mentor")
   - Directory? **Press Enter** (./)
   - Override settings? **N**

5. **Add Environment Variables**:
```bash
npx vercel env add GOOGLE_API_KEY
```
   - Paste your API key: `AIzaSyAVA3GJpKcBNdxvEg71aPWJDgfTm-YU7VU`
   - Select environments: **Production** (use arrow keys, press Space, then Enter)

6. **Redeploy with environment variables**:
```bash
npx vercel --prod
```

**Done!** You'll get a URL like: `https://career-mentor-abc123.vercel.app`

---

## 🔵 Alternative: Deploy to Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
netlify login
```

2. **Build the app**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod
```

4. **Add Environment Variable**:
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add `GOOGLE_API_KEY` = `AIzaSyAVA3GJpKcBNdxvEg71aPWJDgfTm-YU7VU`
   - Redeploy

---

## 🟢 Alternative: Deploy to Railway

1. **Go to**: https://railway.app
2. **Sign up** (free)
3. **Click**: "Deploy from GitHub repo"
4. **Select**: Your repository
5. **Add Environment Variables**:
   - `GOOGLE_API_KEY` = `AIzaSyAVA3GJpKcBNdxvEg71aPWJDgfTm-YU7VU`
6. **Deploy!**

---

## 📱 Quick Test URLs

Once deployed, share this URL with your testers:
```
https://your-app-name.vercel.app
```

**All testers can:**
- ✅ Access instantly (no login required)
- ✅ Upload CVs
- ✅ Use all 5 features
- ✅ Test simultaneously (unlimited users)

---

## 🔒 Security Note

Your Google API key is included in the deployment. For production:
1. Set up API key restrictions in Google Cloud Console
2. Restrict to your domain only
3. Set usage quotas

---

## 🐛 Troubleshooting

**Build fails?**
```bash
# Test build locally first
npm run build
```

**API not working?**
- Check environment variable is set correctly
- Redeploy after adding env vars

**Need help?**
Run: `npx vercel --help`

---

## 📊 Expected Deployment Time

- Vercel: ~2 minutes
- Netlify: ~3 minutes  
- Railway: ~4 minutes

**Current Status**: App is production-ready! 🎉
