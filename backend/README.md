# CareerForge — Backend

Node.js + Express + MongoDB (Mongoose) API with JWT auth and a job scraper.

## Setup

```bash
cd backend
npm install
cp .env.example .env     # then fill in MONGO_URI and JWT_SECRET
npm run dev              # or: npm start
```

`.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret        # required — the server won't start without it
JWT_EXPIRES_IN=7d
```

## API

| Method | Route | Auth | Notes |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | – | `{ name, email, password }` |
| POST | `/api/auth/login` | – | `{ email, password }` |
| GET | `/api/jobs` | – | `page, limit, search, location, jobType, company` |
| GET | `/api/jobs/companies` | – | companies with open-role counts (`search, limit`) |
| GET | `/api/jobs/:id` | – | single job |
| POST/PUT/DELETE | `/api/jobs[/:id]` | Bearer | manage jobs |
| GET/PUT | `/api/users/profile` | Bearer | `{ name, email, password }` |
| GET | `/api/users/saved-jobs` | Bearer | |
| POST/DELETE | `/api/users/saved-jobs/:jobId` | Bearer | |
| POST | `/api/contact` | – | `{ name, email, message }` |

Protected routes need `Authorization: Bearer <token>`.

## Scrapers

`scraper/cron.js` runs the Remotive and Indeed scrapers once on startup and then
every 6 hours. Jobs are upserted by `applyLink`. Indeed blocks scrapers, so it may
return 0 jobs; Remotive is the reliable source.
