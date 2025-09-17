# Digital Guidance Platform - Backend API

## Overview
Complete backend implementation for the Digital Guidance Platform with JWT authentication, MongoDB integration, and AI-powered chatbot.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Database**: MongoDB
- **Authentication**: JWT with bcryptjs
- **AI Integration**: Vercel AI SDK with OpenAI
- **TypeScript**: Full type safety

## Environment Setup

1. Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Update environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secure random string for JWT signing
- `OPENAI_API_KEY`: OpenAI API key for chatbot functionality

## Database Setup

1. **Install MongoDB** (local) or use **MongoDB Atlas** (cloud)

2. **Seed the database**:
\`\`\`bash
npx tsx scripts/seed-database.ts
\`\`\`

This creates:
- Admin user (admin@guidance.com / admin123)
- Sample courses for all streams
- Sample counselors with availability

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `POST /api/courses` - Create course (admin only)

### Counselors
- `GET /api/counselors` - Get all counselors
- `POST /api/counselors` - Add counselor (admin only)

### AI Chatbot
- `POST /api/chat` - Send message to AI counselor

## Authentication Flow

1. **Signup/Login**: Returns JWT token
2. **Protected Routes**: Include `Authorization: Bearer <token>` header
3. **Role-based Access**: Admin-only endpoints for content management

## Usage Examples

### User Registration
\`\`\`javascript
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student'
  })
})
\`\`\`

### Get Courses with Filters
\`\`\`javascript
const response = await fetch('/api/courses?subject=Computer&stream=science')
\`\`\`

### Chat with AI
\`\`\`javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'What career options are available after 12th science?'
  })
})
\`\`\`

## Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- MongoDB injection protection

## Development
\`\`\`bash
npm run dev
\`\`\`

The API will be available at `http://localhost:3000/api`
