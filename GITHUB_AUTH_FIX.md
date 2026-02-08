# 🔐 GitHub Authentication Fix

## ❌ The Problem
GitHub doesn't accept passwords anymore for Git operations. You need a **Personal Access Token (PAT)**.

---

## ✅ SOLUTION: Create a Personal Access Token

### Step 1: Create Your Token

1. **Go to GitHub**: https://github.com/settings/tokens
2. **Click**: "Generate new token" → "Generate new token (classic)"
3. **Fill in**:
   - Note: `career-mentor-deployment`
   - Expiration: `90 days` (or your choice)
   - **Select scopes** (check these boxes):
     - ✅ `repo` (all sub-options)
     - ✅ `workflow`
4. **Click**: "Generate token" (green button at bottom)
5. **IMPORTANT**: Copy your token immediately! It looks like:
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   ⚠️ **Save this somewhere safe** - you won't see it again!

---

### Step 2: Push to GitHub Using Your Token

Now use this command with your token:

```bash
cd /Users/I332255/Downloads/BMA5434_8thFebTry/career-mentor

git remote remove origin

git remote add origin https://github.com/yashsri0786/career-mentor.git

git push -u origin main
```

**When prompted**:
- Username: `yashsri0786@gmail.com`
- Password: **[Paste your token here]** (not your GitHub password!)

---

## 🎯 Alternative: Even Easier Method!

Use this ONE command that includes credentials:

```bash
git push https://yashsri0786@gmail.com:YOUR_TOKEN_HERE@github.com/yashsri0786/career-mentor.git main
```

**Replace `YOUR_TOKEN_HERE` with the actual token you copied.**

Example:
```bash
git push https://yashsri0786@gmail.com:ghp_ABC123xyz@github.com/yashsri0786/career-mentor.git main
```

---

## 💡 Save Your Token for Future Use

To avoid typing the token every time:

```bash
git config --global credential.helper store
```

Then push once with your token - it will be saved!

---

## ✅ After Successful Push

Once your code is on GitHub, continue with Vercel deployment:

1. Go to: https://vercel.com/new
2. Import your `career-mentor` repository
3. Add environment variable: `GOOGLE_API_KEY`
4. Deploy!

---

## 🆘 Still Having Issues?

If the token doesn't work:
1. Make sure you copied the ENTIRE token (starts with `ghp_`)
2. Check that you selected the `repo` scope when creating it
3. Make sure the token hasn't expired
4. Try creating a new token

**Your app is ready - just need to authenticate with GitHub!** 🚀
