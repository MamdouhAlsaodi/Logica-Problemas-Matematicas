# 🎓 Math Problems Interactive Platform

A full-stack web application for managing and solving mathematical problems.

## 🚀 Features
- **Problem Management**: Create, view, and delete math problems.
- **Filtering**: Filter problems by difficulty (Easy, Medium, Hard).
- **User Management**: Basic CRUD for user profiles and levels.
- **Responsive Design**: Clean and modern UI.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React, Axios
- **Styling**: CSS3

## 📦 Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
# Create a .env file with MONGODB_URI=mongodb://localhost:27017/math_platform
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📑 API Endpoints

### Problems (`/api/problems`)
- `GET /` - Fetch all problems (Optional query: `?difficulty=easy|medium|hard`)
- `POST /` - Create a new problem
- `GET /:id` - Get problem details
- `PUT /:id` - Update a problem
- `DELETE /:id` - Remove a problem

### Users (`/api/users`)
- `GET /` - Fetch all users
- `POST /` - Create a new user
- `GET /:id` - Get user details
- `PUT /:id` - Update user profile
- `DELETE /:id` - Remove user

## 🧪 Testing
Refer to `backend/API_TEST_PLAN.md` for detailed test cases and sample JSON data.
