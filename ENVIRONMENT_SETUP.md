# Edulance AI - Environment Setup Guide

This guide walks you through setting up the `.env` configuration files for both frontend and backend.

## Backend Environment Setup

### File: `backend/.env`

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/edulance_ai
MONGODB_DB_NAME=edulance_ai

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here_change_in_production

# Google Gemini API (for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Environment Variables Explanation

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port on which the backend server runs | `5000` |
| `MONGODB_URI` | MongoDB connection string. Use local MongoDB or MongoDB Atlas | `mongodb://127.0.0.1:27017/edulance_ai` or `mongodb+srv://user:pass@cluster.mongodb.net/edulance_ai` |
| `MONGODB_DB_NAME` | Database name | `edulance_ai` |
| `JWT_SECRET` | Secret key for signing JWT tokens (use a strong random string) | Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `GEMINI_API_KEY` | Google Gemini API key for AI summarization | Get from [Google AI Studio](https://aistudio.google.com/app/apikey) |

### Notes

- **MongoDB:** If `MONGODB_URI` is not set, the backend will attempt to connect to a local MongoDB instance at `mongodb://127.0.0.1:27017/edulance_ai`
- **JWT_SECRET:** Must be at least 32 characters. Generate a secure key for production
- **GEMINI_API_KEY:** Required for AI PDF summarization features. Get a free API key from Google

---

## Frontend Environment Setup

### File: `frontend/.env.local`

Create a `.env.local` file in the `frontend/` directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Gemini API Key (optional, if frontend needs direct API access)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Environment Variables Explanation

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL for all HTTP requests | `http://localhost:5000/api` (development) or production URL |
| `VITE_GEMINI_API_KEY` | (Optional) Gemini API key if frontend makes direct API calls | Only needed if frontend calls Gemini directly |

### Notes

- **API Base URL:** Must match the backend server URL and port
- **Development:** Use `http://localhost:5000/api`
- **Production:** Use your production backend URL

---

## Setup Steps

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd EdulanceAI/backend
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your configuration:
   ```bash
   # On Windows
   notepad .env
   
   # On macOS/Linux
   nano .env
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the backend:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd EdulanceAI/frontend
   ```

2. Create `.env.local` file:
   ```bash
   # On Windows
   type nul > .env.local
   
   # On macOS/Linux
   touch .env.local
   ```

3. Edit `.env.local` with your configuration:
   ```bash
   # On Windows
   notepad .env.local
   
   # On macOS/Linux
   nano .env.local
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the frontend:
   ```bash
   npm run dev
   ```

---

## Getting API Keys

### Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API key"
3. Create a new API key or select existing project
4. Copy the API key
5. Paste into `.env` as `GEMINI_API_KEY`

### MongoDB Connection String

#### Local MongoDB

- Default connection: `mongodb://127.0.0.1:27017/edulance_ai`
- Requires local MongoDB server running

#### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com](https://mongodb.com)
2. Create a cluster
3. Get connection string from "Connect" button
4. Replace `<username>:<password>` and database name
5. Example: `mongodb+srv://user:pass@cluster.mongodb.net/edulance_ai?retryWrites=true&w=majority`

---

## JWT Secret Generation

Generate a secure JWT secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

Copy the output to `JWT_SECRET` in `.env`

---

## Troubleshooting

### Backend won't connect to MongoDB

- Verify MongoDB is running: `mongosh` (MongoDB Shell)
- Check `MONGODB_URI` format is correct
- Ensure MongoDB credentials are correct for Atlas

### Frontend can't reach backend

- Verify backend is running on port 5000
- Check `VITE_API_BASE_URL` matches backend URL
- Verify CORS is enabled in backend

### Gemini API errors

- Verify `GEMINI_API_KEY` is correct
- Check API key has "Generative Language API" enabled
- Ensure API key quotas haven't been exceeded

---

## Environment Variable Files Summary

```
EdulanceAI/
├── backend/
│   ├── .env                    ← Create this
│   ├── .env.example            ← Reference template
│   └── ...
├── frontend/
│   ├── .env.local              ← Create this
│   ├── .env.example            ← Reference template
│   └── ...
└── ...
```

All `.env` files should be **NEVER** committed to version control. They are listed in `.gitignore`.

---

## Production Deployment

For production deployment:

1. Use strong, random values for `JWT_SECRET`
2. Use MongoDB Atlas or managed MongoDB service
3. Update `VITE_API_BASE_URL` to production backend URL
4. Use separate API keys for production
5. Never expose `.env` files in repositories
6. Use environment variable management in hosting platform (e.g., Vercel, Heroku)

---

**Last Updated:** 2024
