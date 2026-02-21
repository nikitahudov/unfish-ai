# 🦈 UnFish.ai - Migration Files

This directory contains all the files to migrate to your Next.js project on DigitalOcean.

## 📁 File Structure

```
unfish-ai/
├── app/
│   ├── globals.css          # Tailwind + custom styles
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Dashboard page
│   ├── wiki/
│   │   └── page.tsx         # Curriculum page with skills wheel
│   ├── assess/
│   │   └── page.tsx         # Assessment dashboard
│   ├── coach/
│   │   └── page.tsx         # AI Coach chat interface
│   └── progress/
│       └── page.tsx         # Progress tracking page
├── components/
│   ├── layout/
│   │   └── Navigation.tsx   # Sidebar navigation
│   └── wiki/
│       └── SkillsWheel.tsx  # Interactive skills wheel
├── data/
│   └── skills.ts            # Complete 96-skill data
├── lib/
│   └── progressStore.ts     # Zustand state management
└── tsconfig.json            # TypeScript configuration
```

## 🚀 How to Deploy to Your Server

### Option 1: Copy Files via SCP (Recommended)

From your LOCAL machine (not the server), run these commands:

```bash
# First, download the files from this output (or copy from Claude's response)
# Then upload to your server:

scp -r ./unfish-ai/* developer@YOUR_DROPLET_IP:~/projects/unfish-ai/
```

### Option 2: Copy-Paste via SSH

1. Connect to your server:
   ```bash
   ssh developer@YOUR_DROPLET_IP
   ```

2. Navigate to your project:
   ```bash
   cd ~/projects/unfish-ai
   ```

3. Create each file manually using `nano` or `cat`:
   ```bash
   # Example for one file:
   cat > app/page.tsx << 'EOF'
   [paste file contents here]
   EOF
   ```

### Option 3: Git Clone (If I push to a repo)

If these files are in a repository:
```bash
cd ~/projects/unfish-ai
git pull origin main
```

## 📋 After Copying Files

1. **Verify file structure:**
   ```bash
   ls -la app/
   ls -la components/
   ls -la data/
   ls -la lib/
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install zustand
   ```

3. **Start development server:**
   ```bash
   npm run dev -- -H 0.0.0.0
   ```

4. **View in browser:**
   ```
   http://YOUR_DROPLET_IP:3000
   ```

## ⚠️ Important Notes

- The `tsconfig.json` file should REPLACE the existing one (it adds path aliases)
- Make sure all directories exist before copying files
- The `globals.css` should REPLACE the default Next.js one

## 🔧 Troubleshooting

**Error: Module not found '@/...'**
- Make sure `tsconfig.json` has the correct paths configuration
- Restart the dev server after changing tsconfig

**Error: Cannot find module 'zustand'**
```bash
npm install zustand
```

**Styles not loading**
- Make sure `globals.css` is imported in `layout.tsx`
- Clear browser cache and restart dev server

## 📝 Next Steps After Migration

1. Test all pages work correctly
2. Add the QuizEngine component
3. Set up the Anthropic API for AI Coach
4. Create quiz data files for each skill
