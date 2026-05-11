/**
 * PERCH Wine & Coffee Bar — Express Application
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const { generalLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');
const swaggerSpec = require('./docs/swagger');
const logger = require('./utils/logger');

// Route imports
const authRoutes = require('./routes/auth.routes');
const businessRoutes = require('./routes/business.routes');
const servicesRoutes = require('./routes/services.routes');
const galleryRoutes = require('./routes/gallery.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');
const contactRoutes = require('./routes/contact.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const faqRoutes = require('./routes/faq.routes');
const seoRoutes = require('./routes/seo.routes');
const uploadRoutes = require('./routes/upload.routes');
const adminRoutes = require('./routes/admin.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const bookingRoutes = require('./routes/booking.routes');
const settingsRoutes = require('./routes/settings.routes');

const app = express();

// ─────────────────────────────────────────
// Security Middleware
// ─────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
    },
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Refresh-Token'],
  credentials: true,
}));

app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss());            // Prevent XSS attacks

// ─────────────────────────────────────────
// Body Parsing & Compression
// ─────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// ─────────────────────────────────────────
// Logging
// ─────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

// ─────────────────────────────────────────
// Rate Limiting
// ─────────────────────────────────────────
app.use('/api/', generalLimiter);

// ─────────────────────────────────────────
// Static Files
// ─────────────────────────────────────────
app.use('/uploads', express.static('src/uploads'));

// ─────────────────────────────────────────
// API Documentation
// ─────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'PERCH API Docs',
  customCss: '.swagger-ui .topbar { background-color: #1a0a00; }',
}));

// ─────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PERCH API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// ─────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────
const API = '/api';

app.use(`${API}/auth`, authRoutes);
app.use(`${API}/business`, businessRoutes);
app.use(`${API}/services`, servicesRoutes);
app.use(`${API}/gallery`, galleryRoutes);
app.use(`${API}/testimonials`, testimonialsRoutes);
app.use(`${API}/contact`, contactRoutes);
app.use(`${API}/newsletter`, newsletterRoutes);
app.use(`${API}/faqs`, faqRoutes);
app.use(`${API}/seo`, seoRoutes);
app.use(`${API}/upload`, uploadRoutes);
app.use(`${API}/admin`, adminRoutes);
app.use(`${API}/analytics`, analyticsRoutes);
app.use(`${API}/bookings`, bookingRoutes);
app.use(`${API}/settings`, settingsRoutes);

// ─────────────────────────────────────────
// Error Handling
// ─────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
