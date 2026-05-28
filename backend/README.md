# Edulance AI - Backend README

Complete setup and architecture guide for the EdulanceAI backend.

## Overview

EdulanceAI backend is a Node.js + Express.js application providing REST APIs for:
- User authentication (JWT-based)
- Student dashboard management
- AI-powered PDF summarization (Gemini API)
- Note storage and history

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **AI Service:** Google Generative AI (Gemini)
- **File Upload:** Multer
- **PDF Processing:** pdf-parse

## Project Structure

```
backend/
├── src/
│   ├── app.js                      # Express app configuration
│   ├── server.js                   # Server entry point
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Auth endpoints (signup, login, profile)
│   │   ├── studentController.js    # Student data endpoints
│   │   ├── aiController.js         # AI/PDF endpoints
│   │   └── healthController.js     # Health check endpoint
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── roleMiddleware.js       # Role-based authorization
│   │   ├── uploadMiddleware.js     # File upload config (Multer)
│   │   └── errorMiddleware.js      # Error handling
│   ├── models/
│   │   ├── User.js                 # User schema & auth methods
│   │   └── Note.js                 # AI note schema
│   ├── routes/
│   │   ├── apiRoutes.js            # Main API router
│   │   ├── authRoutes.js           # Auth routes (implicit in apiRoutes)
│   │   ├── studentRoutes.js        # Student routes
│   │   ├── aiRoutes.js             # AI/PDF routes
│   │   └── healthRoutes.js         # Health check routes
│   ├── services/
│   │   ├── jwtService.js           # JWT token operations
│   │   ├── aiService.js            # Gemini API wrapper
│   │   └── pdfService.js           # PDF extraction utilities
│   └── utils/
│       └── validate.js             # Input validation
├── uploads/                         # Temp PDF storage
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file in `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/edulance_ai
MONGODB_DB_NAME=edulance_ai
JWT_SECRET=your_secure_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

See [ENVIRONMENT_SETUP.md](../ENVIRONMENT_SETUP.md) for detailed instructions.

### 3. Ensure MongoDB is Running

Local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas for cloud database.

### 4. Start Development Server

```bash
npm run dev
```

Server will start at `http://localhost:5000`

## API Endpoints

### Health & Status
- `GET /api/health` → Health check

### Authentication
- `POST /api/auth/signup` → User registration
- `POST /api/auth/login` → User login
- `GET /api/auth/profile` → Get current user (protected)
- `POST /api/auth/logout` → Logout (protected)
- `GET /api/auth/student-dashboard` → Student dashboard (protected, student role)
- `GET /api/auth/freelancer-dashboard` → Freelancer dashboard (protected, freelancer role)
- `GET /api/auth/admin-dashboard` → Admin dashboard (protected, admin role)

### Student Profile
- `GET /api/student/profile` → Get student profile (protected)
- `GET /api/student/stats` → Get student statistics (protected)
- `PATCH /api/student/profile` → Update profile (protected)
- `PATCH /api/student/preferences` → Update preferences (protected)

### AI & PDF Features
- `POST /api/ai/upload-pdf` → Upload PDF and generate summary (protected, student role)
- `GET /api/ai/history` → Get summary history (protected, student role)
- `GET /api/ai/history/:id` → Get summary details (protected, student role)
- `DELETE /api/ai/history/:id` → Delete summary (protected, student role)
- `GET /api/ai/stats` → Get AI usage statistics (protected, student role)

## Authentication Flow

1. User signs up with email/password
2. Password is hashed with bcrypt (salt rounds: 12)
3. User logs in and receives JWT token (expires in 7 days)
4. Token is sent in `Authorization: Bearer <token>` header
5. Protected endpoints verify token and decode user info

## PDF Processing Flow

1. User uploads PDF file (max 25MB)
2. Multer validates file type and size
3. PDF text is extracted using pdf-parse
4. Text is validated (min 50 characters)
5. Note record created with "processing" status
6. Gemini API generates summary/concepts/tips
7. Note updated with AI response and "completed" status
8. Temporary file is deleted
9. Response sent to frontend

## Database Schemas

### User Model
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'student', 'freelancer', 'admin'),
  profileImage: String,
  preferences: {
    theme: String,
    emailNotifications: Boolean,
    pushNotifications: Boolean,
    twoFactorAuth: Boolean
  },
  stats: {
    resourcesSaved: Number,
    aiUsageCount: Number,
    resumeCount: Number,
    videosWatched: Number
  },
  isActive: Boolean,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Note Model
```javascript
{
  studentId: ObjectId (ref: User),
  originalFileName: String,
  extractedText: String,
  aiSummary: String,
  keyConcepts: [String],
  importantPoints: [String],
  examTips: String,
  textLength: Number,
  summaryLength: Number,
  processingTime: Number,
  status: String (enum: 'processing', 'completed', 'failed'),
  errorMessage: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Available Scripts

```bash
# Development server with auto-reload
npm run dev

# Start production server
npm start

# Run linter
npm run lint

# Run authentication flow test
npm run test:auth
```

## Error Handling

- **400 Bad Request** - Invalid input/file validation
- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

All errors return JSON format:
```json
{
  "message": "Error description",
  "error": "Detailed error info (development)"
}
```

## AI Service Configuration

The backend uses Google's Generative AI (Gemini) for PDF summarization:

- **Model:** `gemini-pro`
- **Features:**
  - Note summarization
  - Key concept extraction
  - Important points highlighting
  - Exam preparation tips
  - Practice question generation

**Note:** Ensure `GEMINI_API_KEY` is set in `.env`

## File Upload Configuration

PDFs are uploaded using Multer:

- **Max file size:** 25MB
- **Upload directory:** `uploads/pdf/`
- **Allowed types:** `application/pdf`
- **Filename format:** `{name}-{timestamp}.pdf`

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control (RBAC)
- CORS enabled for frontend
- Helmet.js for security headers
- Morgan for request logging
- Input validation and sanitization
- File type validation for uploads

## Testing Authentication Flow

Run the included test script:

```bash
npm run test:auth
```

This tests:
1. User registration
2. User login
3. Token generation
4. Profile retrieval

## Deployment

For production deployment:

1. Build/compile if necessary
2. Set environment variables on hosting platform
3. Ensure MongoDB Atlas/managed service is configured
4. Use production-grade server (PM2, etc.)
5. Enable HTTPS
6. Set strong `JWT_SECRET`
7. Configure CORS for frontend domain

Example deployment with PM2:
```bash
npm install -g pm2
pm2 start src/server.js --name "edulance-api"
pm2 startup
pm2 save
```

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running locally or Atlas credentials
- Check `MONGODB_URI` format
- Ensure network access (Atlas)

### Gemini API Errors
- Verify `GEMINI_API_KEY` is valid
- Check API usage quota
- Ensure API is enabled in Google Cloud

### JWT Token Issues
- Ensure `JWT_SECRET` is set
- Token expires after 7 days
- Verify `Authorization` header format: `Bearer <token>`

### File Upload Issues
- Check file is valid PDF
- Verify file size < 25MB
- Ensure `uploads/pdf/` directory exists

## Support & Documentation

- [Google Generative AI Docs](https://ai.google.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** Production Ready (Sprint 4)
