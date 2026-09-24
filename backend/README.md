# CareerForge — Backend Dev 1

## 👨‍💻 My Responsibilities
- User Authentication APIs (Signup, Login)
- User Profile APIs
- Saved Jobs APIs
- Pagination and Filtering logic

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcrypt password hashing

---

## 📌 Prerequisites
- Node.js v18 or above
- Git
- MongoDB Atlas connection string (shared privately)

---

## 🚀 Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/VaishnaviS249/careerforge.git
cd careerforge
git checkout dev1

cd backend
npm install

cp .env.example .env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=60d

npm start

npm start


http://localhost:5000

API Endpoints
🔐 Auth (Public)

POST /api/auth/signup

{ "name": "Jane", "email": "jane@example.com", "password": "123456" }

POST /api/auth/login

{ "email": "jane@example.com", "password": "123456" }
👤 User Profile (Protected)
GET /api/users/profile
PUT /api/users/profile
{ "name": "New Name", "email": "new@email.com" }
⭐ Saved Jobs (Protected)
GET /api/users/saved-jobs
POST /api/users/saved-jobs/:jobId
DELETE /api/users/saved-jobs/:jobId
💼 Jobs (Public)
GET /api/jobs
GET /api/jobs?page=1&limit=10
GET /api/jobs?location=Bangalore&jobType=Internship
GET /api/jobs?company=Google&search=frontend
GET /api/jobs/:id
🔐 Authentication

Protected routes require:

Authorization: Bearer <token>

Token is received after login/signup.

📦 Dependencies
express
mongoose
jsonwebtoken
bcryptjs
dotenv
cors
nodemon (dev)

---

# 🔥 Final verdict

👉 Your understanding = solid  
👉 Your backend = correct  
👉 This README = now **professional level**

---

If you want next upgrade, I can:
- make it look like **top GitHub projects (badges, screenshots, API docs style)**
- or prepare **perfect viva answers from your project**