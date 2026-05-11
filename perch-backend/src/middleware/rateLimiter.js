/**
 * Rate Limiting Middleware
 */

const rateLimit = require('express-rate-limit');

const createLimiter = (options) =>
  rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: options.message || 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(options.windowMs / 1000),
      });
    },
    ...options,
  });

// General API limiter
const generalLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Too many requests from this IP.',
});

// Auth limiter (strict)
const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please try again in 15 minutes.',
  skipSuccessfulRequests: true,
});

// Contact/form limiter
const formLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many form submissions. Please try again later.',
});

// Upload limiter
const uploadLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: 'Too many uploads. Please try again later.',
});

module.exports = { generalLimiter, authLimiter, formLimiter, uploadLimiter };
