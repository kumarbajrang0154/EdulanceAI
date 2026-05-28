# EdulanceAI Student Dashboard - Integration & Setup Guide

## Quick Start Guide

### Prerequisites
- Node.js 16+ and npm/yarn installed
- MongoDB running locally or MongoDB Atlas connection
- Git repository set up

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Tailwind CSS Configuration
The dashboard uses Tailwind CSS for styling. Verify `tailwind.config.js` is properly configured:
```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Environment Variables
Create `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:3000/api
```

---

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create `.env` file in the backend directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/edulance-ai
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB server
mongod
```

#### Option B: MongoDB Atlas
1. Create account at mongodb.com/cloud/atlas
2. Create cluster and database
3. Get connection string
4. Update MONGODB_URI in .env

### 4. Start Backend Server
```bash
npm run dev
```

The backend will be available at `http://localhost:3000`

---

## Database Migration

### Update User Schema
The User model has been updated to include:
- `joinedDate`: Automatically set to current date on creation
- `preferences`: Object for storing notification and UI preferences
- `stats`: Object for tracking user activities
- `isActive`: Boolean flag for account status
- `isVerified`: Boolean flag for email verification

**Note**: Existing users will automatically get default values for new fields.

### Create Test User
```bash
# Via API or using MongoDB client:
db.users.insertOne({
  fullName: "John Student",
  email: "student@example.com",
  password: "hashed_password",
  role: "student",
  profileImage: "",
  joinedDate: new Date(),
  preferences: {
    theme: "light",
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false
  },
  stats: {
    resourcesSaved: 0,
    aiUsageCount: 0,
    resumeCount: 0,
    videosWatched: 0
  },
  isActive: true,
  isVerified: false
})
```

---

## Testing the Dashboard

### 1. Manual Testing Flow

#### Step 1: Sign Up as Student
```
URL: http://localhost:5173/signup
Email: test@student.com
Password: TestPassword123
Full Name: Test Student
Role: Student
```

#### Step 2: Login
```
URL: http://localhost:5173/login
Email: test@student.com
Password: TestPassword123
```

#### Step 3: Access Student Dashboard
```
URL: http://localhost:5173/student/dashboard
Expected: Dashboard home page with profile card and stats
```

#### Step 4: Test Navigation
- Click dashboard items in sidebar
- Verify each page loads correctly
- Test mobile menu on smaller screens

#### Step 5: Test API Integration
- Open browser DevTools (F12)
- Check Network tab for API calls
- Verify responses show correct data

### 2. API Testing with Postman

#### Authentication
1. Login to get JWT token
2. Copy token from response
3. Add to header: `Authorization: Bearer {token}`

#### Test Endpoints
```
1. GET /api/student/profile
   - Should return current student profile

2. GET /api/student/dashboard-stats
   - Should return stats object with all metrics

3. PUT /api/student/profile
   - Body: { "fullName": "New Name" }
   - Should update profile

4. PUT /api/student/preferences
   - Body: { "preferences": { "theme": "dark" } }
   - Should update preferences

5. POST /api/student/stats/aiUsageCount
   - Should increment aiUsageCount by 1
```

---

## Project File Structure

```
EdulanceAI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/              [NEW]
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── DashboardSidebar.tsx
│   │   │   │   ├── DashboardNavbar.tsx
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── ProfileCard.tsx
│   │   │   │   ├── QuickActionCard.tsx
│   │   │   │   ├── SectionTitle.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Alert.tsx
│   │   │   ├── AuthForm.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── RoleSelector.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── pages/
│   │   │   ├── StudentDashboardHome.tsx [UPDATED]
│   │   │   ├── AIToolsPage.tsx          [NEW]
│   │   │   ├── ResumeBuilderPage.tsx    [NEW]
│   │   │   ├── PlacementPrepPage.tsx    [NEW]
│   │   │   ├── VideoLearningPage.tsx    [NEW]
│   │   │   ├── SavedResourcesPage.tsx   [NEW]
│   │   │   ├── SettingsPage.tsx         [NEW]
│   │   │   └── [Other pages...]
│   │   ├── services/
│   │   │   ├── auth.ts
│   │   │   ├── axios.ts
│   │   │   └── student.ts               [NEW]
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx            [UPDATED]
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── studentController.js     [NEW]
│   │   ├── models/
│   │   │   └── User.js                  [UPDATED]
│   │   ├── routes/
│   │   │   ├── apiRoutes.js             [UPDATED]
│   │   │   ├── healthRoutes.js
│   │   │   └── studentRoutes.js         [NEW]
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── utils/
│   │   │   └── validate.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── STUDENT_DASHBOARD_DOCUMENTATION.md [NEW]
```

---

## Troubleshooting

### Frontend Issues

**Issue**: Pages not loading in dashboard
- Check browser console for errors
- Verify routes are correctly defined in AppRoutes.tsx
- Clear browser cache and reload

**Issue**: Sidebar not responsive on mobile
- Check viewport meta tag in index.html
- Verify Tailwind breakpoints are correct
- Test with browser DevTools device emulation

**Issue**: API calls failing (404 errors)
- Verify VITE_API_URL in .env matches backend URL
- Check backend server is running
- Verify routes are defined in backend

### Backend Issues

**Issue**: Cannot connect to MongoDB
- Check MongoDB service is running
- Verify MONGODB_URI in .env is correct
- Check network connectivity

**Issue**: JWT token errors
- Verify JWT_SECRET in .env is set
- Check token format in Authorization header
- Verify token hasn't expired

**Issue**: Role-based access denied
- Check user role is 'student'
- Verify authorizeRoles middleware is applied
- Check role middleware implementation

### Common Solutions

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 16+

# Kill port if already in use (Port 3000)
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

---

## Performance Tips

### Frontend
1. **Lazy load pages**: Dashboard pages can be lazy loaded
2. **Image optimization**: Use next/image or similar tools
3. **CSS optimization**: Tailwind purges unused styles in production
4. **Bundle analysis**: Use vite-plugin-visualization

### Backend
1. **Add indexes**: Create MongoDB indexes on frequently queried fields
```js
// In User model
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ joinedDate: -1 });
```

2. **Implement caching**: Use Redis for frequently accessed data
3. **Pagination**: Add pagination to list endpoints
4. **Rate limiting**: Implement express-rate-limit

---

## Security Checklist

- [ ] JWT_SECRET is strong and secure
- [ ] CORS is properly configured
- [ ] API endpoints validate user role
- [ ] Passwords are hashed with bcrypt
- [ ] No sensitive data in error messages
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints

---

## Development Commands

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Backend
```bash
npm run dev       # Start dev server with nodemon
npm start         # Start production server
npm test          # Run tests
```

---

## Next Steps for Upcoming Sprints

### Sprint 4 - AI Tools Module
- Implement Note Generator
- Implement Code Explainer
- Implement Question Generator
- Create AI service integration

### Sprint 5 - Resume Builder
- Build resume editor
- Implement templates
- Add PDF export
- Implement versioning

### Sprint 6 - Video System
- Implement video player
- Create playlist management
- Add progress tracking
- Implement recommendations

---

## Documentation References

- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Express.js**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **Mongoose**: https://mongoosejs.com

---

## Support

For issues or questions:
1. Check the documentation
2. Review the API responses
3. Check browser/server console for errors
4. Review commit history for changes
5. Test with Postman/Insomnia

---

**Last Updated**: December 2024
**Version**: 1.0
**Status**: Production Ready for Sprint 3
