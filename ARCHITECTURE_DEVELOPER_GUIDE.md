# EdulanceAI Student Dashboard Architecture - Developer Guide

## Quick Overview

The Student Dashboard is built with modern tech stack:
- **Frontend**: React.js (Vite) + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT-based

---

## Directory Structure

### Frontend (`/frontend/src/`)

```
src/
├── components/
│   └── dashboard/          # Dashboard-specific components
│       ├── DashboardLayout
│       ├── DashboardSidebar
│       ├── DashboardNavbar
│       ├── StatsCard
│       ├── ProfileCard
│       ├── QuickActionCard
│       └── SectionTitle
├── pages/                  # Page components
│   ├── StudentDashboardHome     # Main dashboard
│   ├── AIToolsPage              # AI tools (placeholder)
│   ├── ResumeBuilderPage        # Resume builder (placeholder)
│   ├── PlacementPrepPage        # Placement prep (placeholder)
│   ├── VideoLearningPage        # Videos (placeholder)
│   ├── SavedResourcesPage       # Saved resources (placeholder)
│   └── SettingsPage             # Settings
├── services/               # API service layer
│   ├── auth.ts             # Auth services
│   ├── axios.ts            # Axios config
│   └── student.ts          # Student API calls
├── routes/                 # Routing
│   └── AppRoutes.tsx       # Route definitions
├── context/                # Global state
│   └── AuthContext.tsx     # Auth state
└── main.tsx                # Entry point
```

### Backend (`/backend/src/`)

```
src/
├── controllers/            # Business logic
│   ├── authController.js   # Auth logic
│   └── studentController.js # Student logic
├── models/                 # Database schemas
│   └── User.js             # User model
├── routes/                 # API routes
│   ├── apiRoutes.js        # Main routes
│   ├── healthRoutes.js     # Health check
│   └── studentRoutes.js    # Student routes
├── middleware/             # Express middleware
│   ├── authMiddleware.js   # JWT verification
│   ├── roleMiddleware.js   # Role checking
│   └── errorMiddleware.js  # Error handling
├── config/                 # Configuration
│   └── db.js               # Database config
├── utils/                  # Utility functions
│   └── validate.js         # Input validation
├── app.js                  # Express setup
└── server.js               # Server entry point
```

---

## Component Hierarchy

```
DashboardLayout
├── DashboardNavbar
│   ├── Notifications
│   └── User Profile
├── DashboardSidebar
│   ├── Logo
│   ├── Navigation Items
│   └── Logout
└── Main Content
    ├── DashboardHeader
    ├── SectionTitle
    ├── ProfileCard
    ├── StatsCard (Multiple)
    ├── QuickActionCard (Multiple)
    └── Activity Section
```

---

## Data Flow

### Authentication Flow
```
1. User enters credentials on /login
2. Credentials sent to POST /api/auth/login
3. Backend validates and returns JWT token + user
4. Frontend stores token in localStorage
5. Token sent with subsequent requests
6. User redirected to /student/dashboard
```

### Dashboard Load Flow
```
1. User visits /student/dashboard
2. ProtectedRoute checks token validity
3. DashboardLayout renders with Sidebar + Navbar
4. StudentDashboardHome component mounts
5. Fetches user profile via GET /api/student/profile
6. Fetches stats via GET /api/student/dashboard-stats
7. Data displayed in cards
```

### API Call Flow
```
Component
├── Calls service function (e.g., getStudentProfile)
├── Service uses axios to make HTTP request
├── Request includes JWT token in header
├── Backend middleware verifies token and role
├── Controller processes request
├── Database query executed
├── Response sent to frontend
└── Component updates with data
```

---

## Key Concepts

### 1. Protected Routes
Only logged-in students can access `/student/*` routes

```typescript
<ProtectedRoute allowedRoles={['student']}>
  <YourComponent />
</ProtectedRoute>
```

### 2. Role-Based Access
User role is checked on backend to prevent unauthorized access

```javascript
router.use(protect, authorizeRoles('student'));
```

### 3. Responsive Design
Mobile-first approach using Tailwind CSS breakpoints

```html
<div className="hidden lg:block">Desktop only</div>
<div className="block lg:hidden">Mobile only</div>
```

### 4. Component Composition
Reusable components combined to build pages

```tsx
<DashboardLayout>
  <DashboardHeader title="Page Title" />
  <SectionTitle title="Section" />
  <StatsCard {...props} />
</DashboardLayout>
```

---

## Common Tasks

### Add New Dashboard Page

1. Create page file in `/frontend/src/pages/`

```tsx
// src/pages/NewFeaturePage.tsx
import { DashboardLayout, DashboardHeader } from '../components/dashboard';

const NewFeaturePage = () => (
  <DashboardLayout>
    <DashboardHeader title="New Feature" />
    {/* Your content */}
  </DashboardLayout>
);

export default NewFeaturePage;
```

2. Add route in `/frontend/src/routes/AppRoutes.tsx`

```tsx
<Route
  path="/student/new-feature"
  element={
    <ProtectedRoute allowedRoles={['student']}>
      <NewFeaturePage />
    </ProtectedRoute>
  }
/>
```

3. Add sidebar navigation in `DashboardSidebar.tsx`

```tsx
const navItems = [
  // ... existing items
  { label: 'New Feature', path: '/student/new-feature', icon: '✨' }
];
```

### Add New API Endpoint

1. Add method to `studentController.js`

```javascript
export const newFeature = async (req, res, next) => {
  try {
    // Your logic
    res.json({ data: 'result' });
  } catch (err) {
    next(err);
  }
};
```

2. Add route in `studentRoutes.js`

```javascript
router.post('/new-feature', newFeature);
```

3. Add service method in `services/student.ts`

```typescript
export const newFeature = () =>
  apiClient.post('/student/new-feature').then((res) => res.data);
```

### Update User Model

1. Edit `backend/src/models/User.js`

```javascript
const userSchema = new mongoose.Schema({
  // ... existing fields
  newField: { type: String, default: '' }
});
```

2. Use in controller

```javascript
user.newField = value;
await user.save();
```

---

## Styling System

### Tailwind Classes Used

**Spacing:**
- `p-4` = padding 16px
- `gap-4` = gap 16px
- `mt-2` = margin-top 8px

**Colors:**
- `bg-blue-600` = Primary color
- `text-slate-900` = Main text
- `text-slate-600` = Secondary text
- `border-slate-200` = Borders

**Layout:**
- `flex` = Flexbox
- `grid` = Grid layout
- `grid-cols-1 md:grid-cols-2` = Responsive columns

**Responsive:**
- `hidden lg:block` = Hidden on mobile, visible on desktop
- `block lg:hidden` = Visible on mobile, hidden on desktop

---

## State Management Pattern

```typescript
// In component
const { user, token } = useAuth();

// Update state
const login = async (email, password) => {
  setUser(response.user);
  setToken(response.token);
};

// Logout
const logout = () => {
  setUser(null);
  setToken(null);
};
```

---

## API Response Format

### Success Response
```json
{
  "user": {
    "id": "123",
    "fullName": "John",
    "email": "john@example.com",
    "role": "student"
  },
  "stats": {
    "resourcesSaved": 10,
    "aiUsageCount": 5
  }
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "error_code"
}
```

---

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (`.env`)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/edulance-ai
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## Debugging Tips

### Frontend
```javascript
// Check user data
console.log(useAuth());

// Check API calls
// Open DevTools Network tab → Look for requests

// Check console errors
// Press F12 → Console tab
```

### Backend
```javascript
// Add logging
console.log('User:', req.user);
console.log('Data:', req.body);

// Check database
// Use MongoDB Compass or Atlas UI
```

---

## Performance Tips

1. **Use React DevTools Profiler** - Check for unnecessary renders
2. **Lazy load pages** - Use React.lazy() for code splitting
3. **Memoize components** - Use React.memo for expensive components
4. **Optimize images** - Use proper formats and sizes
5. **Database indexes** - Create indexes on frequently queried fields

---

## Security Checklist

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ Role-based access control
- ✅ CORS configured
- ✅ Input validation
- ✅ Error messages don't leak info
- ✅ Sensitive data not in logs

---

## Testing Checklist

When adding new features:

- [ ] Component renders without errors
- [ ] API endpoint returns correct data
- [ ] Role-based access works
- [ ] Error handling works
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] No TypeScript errors

---

## Useful Resources

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Express.js**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **JWT**: https://jwt.io

---

## Getting Help

1. Check the documentation files
2. Review similar components
3. Check commit history
4. Search for error messages
5. Ask team members

---

## Version Info

- React: 18.x
- Node.js: 16+
- Express: 4.x
- MongoDB: 5.x+
- Tailwind CSS: 3.x

---

**Last Updated**: December 2024
**Difficulty Level**: Intermediate
**For Questions**: Refer to project documentation
