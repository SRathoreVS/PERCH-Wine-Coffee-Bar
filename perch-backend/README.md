# PERCH Wine & Coffee Bar — Backend API

Production-grade REST API built with **Node.js + Express + MongoDB** powering the PERCH Wine & Coffee Bar React frontend.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express.js 4 |
| Database | MongoDB 7 + Mongoose |
| Auth | JWT (access + refresh tokens) |
| File Storage | Cloudinary |
| Email | Nodemailer + Gmail SMTP |
| Real-time | Socket.io |
| Docs | Swagger / OpenAPI 3.0 |
| Logging | Winston |
| Testing | Jest + Supertest |
| Deployment | PM2, Docker, Nginx |

---

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/          # App configuration
│   ├── constants/       # App-wide constants & enums
│   ├── controllers/     # Route handlers (thin layer)
│   ├── database/        # MongoDB connection + seeder
│   ├── docs/            # Swagger/OpenAPI spec
│   ├── emails/          # Nodemailer service + HTML templates
│   ├── helpers/         # Pagination, sorting utils
│   ├── jobs/            # Scheduled tasks (cron)
│   ├── middleware/       # Auth, error handler, rate limiter, upload
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── services/        # Business logic layer
│   ├── sockets/         # Socket.io real-time events
│   ├── uploads/         # Temporary local uploads
│   ├── utils/           # Logger, AppError, response helpers
│   ├── validations/     # express-validator rule sets
│   └── app.js           # Express app setup
├── __tests__/           # Jest integration tests
├── server.js            # Entry point
├── ecosystem.config.js  # PM2 config
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .env.example
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- npm or yarn

### 1. Install

```bash
git clone <repo-url>
cd perch-backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

**Key values to set:**
```
MONGO_URI=mongodb://localhost:27017/perch_bar
JWT_ACCESS_SECRET=<random 32+ char string>
JWT_REFRESH_SECRET=<random 32+ char string>
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Seed Database

```bash
npm run seed
```

This creates:
- Superadmin user (`admin@perchbar.com` / `Admin@1234`)
- Business info
- 4 Services
- 3 Testimonials
- 5 FAQs
- SEO metadata
- Default settings

### 4. Start Development Server

```bash
npm run dev
```

API runs at: `http://localhost:5000`  
Swagger docs: `http://localhost:5000/api/docs`

---

## 📡 API Reference

### Base URL
```
Development: http://localhost:5000/api
Production:  https://api.perchbar.com/api
```

### Authentication
All protected routes require a Bearer token:
```
Authorization: Bearer <access_token>
```

---

### 🔐 Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | Public | Admin login |
| POST | `/auth/refresh` | Cookie | Refresh access token |
| POST | `/auth/logout` | ✅ | Logout & invalidate refresh token |
| GET | `/auth/me` | ✅ | Get current user |
| POST | `/auth/forgot-password` | Public | Send password reset email |
| POST | `/auth/reset-password/:token` | Public | Reset password |
| PUT | `/auth/change-password` | ✅ | Change password |

**Login Request:**
```json
POST /api/auth/login
{
  "email": "admin@perchbar.com",
  "password": "Admin@1234"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGci...",
    "user": {
      "_id": "...",
      "name": "PERCH Admin",
      "email": "admin@perchbar.com",
      "role": "superadmin"
    }
  }
}
```

---

### 🏢 Business

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/business` | Public | Get business info |
| POST | `/business` | Admin | Create/update business |
| PUT | `/business/hours` | Admin | Update business hours |
| PUT | `/business/social` | Admin | Update social links |

---

### 🛎️ Services

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/services` | Public | List services (filterable) |
| GET | `/services/:slug` | Public | Get service by slug |
| POST | `/services` | Admin | Create service |
| PUT | `/services/reorder` | Admin | Bulk reorder |
| PUT | `/services/:id` | Admin | Update service |
| DELETE | `/services/:id` | Admin | Soft delete service |

**Query params:** `?category=wine&featured=true&search=coffee&page=1&limit=10&sort=order:asc`

---

### 🖼️ Gallery

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/gallery` | Public | List images (filterable) |
| GET | `/gallery/categories` | Public | Get available categories |
| GET | `/gallery/:id` | Public | Get image by ID |
| POST | `/gallery` | Admin | Upload image (multipart/form-data) |
| PUT | `/gallery/:id` | Admin | Update metadata |
| DELETE | `/gallery/:id` | Admin | Soft delete + Cloudinary removal |

**Query params:** `?category=ambiance&featured=true&tag=wine&page=1&limit=12`

---

### 💬 Testimonials

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/testimonials` | Public | List testimonials |
| POST | `/testimonials` | Admin | Create testimonial |
| PUT | `/testimonials/:id` | Admin | Update testimonial |
| DELETE | `/testimonials/:id` | Admin | Soft delete |

**Query params:** `?featured=true&minRating=4&source=google`

---

### 📬 Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/contact` | Public | Submit contact form |
| GET | `/contact` | Admin | List all messages |
| GET | `/contact/:id` | Admin | Get message (marks as read) |
| PATCH | `/contact/:id/status` | Admin | Update status |
| DELETE | `/contact/:id` | Admin | Soft delete |

**Contact form request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-0123",
  "subject": "Reservation inquiry",
  "message": "I would like to book a table for 4 on Saturday...",
  "type": "reservation"
}
```

**Contact form response triggers:**
1. Message stored in MongoDB
2. Confirmation email sent to user
3. Notification email sent to admin
4. Analytics event tracked

---

### 📧 Newsletter

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/newsletter/subscribe` | Public | Subscribe |
| GET | `/newsletter/unsubscribe/:token` | Public | Unsubscribe via link |
| GET | `/newsletter` | Admin | List subscribers |
| DELETE | `/newsletter/:id` | Admin | Remove subscriber |

---

### ❓ FAQs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/faqs` | Public | List FAQs |
| POST | `/faqs` | Admin | Create FAQ |
| PUT | `/faqs/:id` | Admin | Update FAQ |
| DELETE | `/faqs/:id` | Admin | Delete FAQ |

**Query params:** `?category=reservations`

---

### 🔍 SEO

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/seo` | Public | Get all SEO data |
| GET | `/seo/:page` | Public | Get SEO for page |
| POST | `/seo` | Admin | Upsert SEO for page |
| DELETE | `/seo/:id` | Admin | Delete SEO record |

**Pages:** `home`, `gallery`, `contact`, `menu`, `events`

---

### 📅 Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/bookings` | Public | Create booking |
| GET | `/bookings/confirm/:code` | Public | Get booking by code |
| GET | `/bookings` | Admin | List all bookings |
| PATCH | `/bookings/:id/status` | Admin | Update status |
| DELETE | `/bookings/:id` | Admin | Delete booking |

**Query params:** `?status=pending&type=table&from=2025-01-01&to=2025-12-31`

---

### 📊 Analytics

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/analytics/track` | Public | Track event |
| GET | `/analytics/dashboard` | Admin | Dashboard stats |
| GET | `/analytics/pageviews` | Admin | Page views chart |

**Track event request:**
```json
{
  "event": "page_view",
  "page": "/gallery",
  "sessionId": "sess_abc123"
}
```

**Events:** `page_view`, `contact_form`, `newsletter_signup`, `booking`, `gallery_view`, `service_view`

---

### ⚙️ Settings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/settings/public` | Public | Get public settings |
| GET | `/settings` | Admin | Get all settings |
| GET | `/settings/:key` | Admin | Get single setting |
| POST | `/settings` | Admin | Batch update settings |
| DELETE | `/settings/:key` | Superadmin | Delete setting |

---

### 📤 Upload

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/upload/image` | Admin | Upload generic image |
| POST | `/upload/service-image` | Admin | Upload service image |
| POST | `/upload/avatar` | Admin | Upload user avatar |
| DELETE | `/upload` | Admin | Delete from Cloudinary |

All uploads use `multipart/form-data` with field `image` (or `avatar`/`file`).

---

### 👤 Admin Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin` | Admin | List admin users |
| POST | `/admin` | Superadmin | Create admin user |
| PUT | `/admin/:id` | Admin | Update user |
| DELETE | `/admin/:id` | Superadmin | Soft delete user |
| PATCH | `/admin/:id/toggle-status` | Superadmin | Activate/deactivate |

---

## 🔒 Security Features

- **Helmet** — Secure HTTP headers
- **CORS** — Strict origin whitelist
- **Rate Limiting** — Per-route (general: 200/15min, auth: 10/15min, forms: 5/hour)
- **JWT** — Short-lived access tokens (15m) + rotating refresh tokens (7d)
- **Bcrypt** — Password hashing (12 rounds)
- **Mongo Sanitize** — NoSQL injection prevention
- **XSS Clean** — Cross-site scripting protection
- **Account Lockout** — After 5 failed login attempts (2-hour lock)
- **Soft Delete** — Data preserved, excluded from queries

---

## 🗃️ Database Models

| Model | Key Fields |
|---|---|
| User | name, email, password, role, refreshTokens, loginAttempts |
| Business | name, address, businessHours, socialLinks, contact, theme |
| Service | title, slug, description, category, highlights, isFeatured |
| Gallery | imageUrl, cloudinaryId, category, tags, isFeatured |
| Testimonial | author, content, rating, source, isFeatured |
| Contact | name, email, message, type, status, emailSent |
| Subscriber | email, status, unsubscribeToken, source |
| FAQ | question, answer, category, order |
| SEO | page, metaTitle, metaDescription, ogImage, keywords |
| Booking | confirmationCode, date, time, partySize, status |
| Analytics | event, page, ipAddress, sessionId (capped collection) |
| Settings | key, value, group, isPublic |

All models include: `timestamps`, `isActive`, `deletedAt` (soft delete), `deletedAt` query filter via pre-hook.

---

## 🛠️ Available Scripts

```bash
npm run dev          # Start dev server with nodemon
npm start            # Start production server
npm run seed         # Seed database with sample data
npm run seed:destroy # Clear all seeded data
npm test             # Run Jest tests
npm run test:watch   # Jest in watch mode
npm run test:coverage # Jest with coverage report
npm run lint         # ESLint
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier
```

---

## 🐳 Docker

```bash
# Start all services (API + MongoDB + Redis)
docker-compose up -d

# Logs
docker-compose logs -f api

# Stop
docker-compose down
```

---

## 🖥️ Production Deployment

### PM2 (VPS / bare metal)

```bash
# Install PM2 globally
npm install -g pm2

# Start in production
pm2 start ecosystem.config.js --env production

# Save process list & enable auto-start
pm2 save
pm2 startup

# Monitor
pm2 monit
pm2 logs perch-api
```

### Nginx

```bash
sudo cp nginx.conf /etc/nginx/sites-available/perch
sudo ln -s /etc/nginx/sites-available/perch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Railway / Render

1. Connect GitHub repo
2. Set environment variables in dashboard
3. Set start command: `node server.js`
4. Deploy

---

## 📧 Email Setup (Gmail)

1. Enable 2FA on your Gmail account
2. Go to: Google Account → Security → App Passwords
3. Generate an "App Password" for "Mail"
4. Set in `.env`:
   ```
   SMTP_USER=your@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ```

---

## ☁️ Cloudinary Setup

1. Create free account at cloudinary.com
2. Copy Cloud Name, API Key, API Secret from dashboard
3. Set in `.env`

---

## 🔌 Socket.io Events (Admin Panel)

```js
// Frontend connection
const socket = io('http://localhost:5000', {
  auth: { token: accessToken }
});

// Listen for real-time notifications
socket.on('admin:new_message', (data) => { /* new contact form */ });
socket.on('admin:new_booking', (data) => { /* new booking */ });
socket.on('admin:new_subscriber', (data) => { /* new subscriber */ });
socket.on('admin:booking_updated', (data) => { /* booking status change */ });
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npx jest __tests__/auth.test.js

# With coverage
npm run test:coverage
```

Tests use a separate `perch_test` database and clean up after themselves.

---

## 📝 Standardized Response Format

**Success:**
```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Valid email required" }
  ]
}
```

---

## 🗺️ Roadmap / Future-Ready

- ✅ Socket.io real-time infrastructure (ready to extend)
- ✅ Booking system foundation
- 🔲 Redis caching layer
- 🔲 Payment integration (Stripe)
- 🔲 AI chatbot API
- 🔲 Multi-language support
- 🔲 Email campaign system
- 🔲 Advanced analytics dashboard
