# Laddressa.ai - AI-Powered Address Intelligence Platform

## Features
- 🔍 Business address search with RapidAPI integration
- 📊 Lead scoring and company intelligence
- 📧 CSV export for professional users
- 🔐 OAuth authentication (Google, LinkedIn, Facebook)
- 💳 Tiered pricing: Free (10 searches/day), Pro ($5/month for 50 searches/day)

## Tech Stack
- Frontend: HTML, Tailwind CSS, JavaScript
- Backend: Cloudflare Workers
- Database: Cloudflare D1
- API: RapidAPI for business data
- Hosting: Cloudflare Pages

## Deployment Steps

1. **Deploy to GitHub:**
```bash
git init
git add .
git commit -m "Initial MVP"
git remote add origin https://github.com/telamal/laddressa-ai.git
git push -u origin main
```

2. **Deploy Worker:**
```bash
npx wrangler deploy api-worker.js
```

3. **Deploy to Pages:**
- Connect GitHub repo to Cloudflare Pages
- Set custom domain: laddressa.ai

## API Key
RapidAPI Key: 80f60ed0a9mshe8e73fb42c00c33p15bca5jsn295aaf5c4976

## Live URL
https://laddressa.ai
