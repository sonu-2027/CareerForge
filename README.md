# CareerForge 🚀

CareerForge is a full-stack job-search platform: browse aggregated jobs, filter and
search them, explore companies, save jobs and manage your profile.

## Features

- 👤 Sign up / log in (JWT), protected pages, profile editing
- 💼 Job listings with search, location, job-type filters and pagination
- 🏢 Companies page built from live job data (with "View Jobs" per company)
- ❤️ Save / unsave jobs, job details page with apply link
- ✉️ Contact form stored in the database

## Tech stack

React 19 + Vite + Tailwind CSS 4 · Node.js + Express · MongoDB Atlas · Vercel (frontend) / Render (backend)

## Running locally

```bash
# backend  (see backend/README.md for the .env values)
cd backend && npm install && cp .env.example .env && npm run dev

# frontend
cd frontend && npm install && cp .env.example .env && npm run dev
```
