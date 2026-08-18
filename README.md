# Techbits — Next.js + Sanity starter

This repository was bootstrapped by an automated assistant with a minimal Next.js (App Router) blog wired to Sanity Studio.

Structure:
- web/ — Next.js app (TypeScript, App Router)
- studio/ — Sanity Studio (schemas + config)

Quick start
1. In /web: copy your Sanity project ID into web/.env.local (or set env vars in Vercel):

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN= # optional, server-only for preview

2. Install and run the web app:
   cd web
   npm install
   npm run dev

3. Setup and run the studio:
   cd studio
   npm install
   # link or init a project: sanity init (if needed)
   npm run dev

Deploy
- Deploy the web app to Vercel and set the NEXT_PUBLIC_* env vars.
- You can deploy the Studio separately (also on Vercel) or serve it locally.

