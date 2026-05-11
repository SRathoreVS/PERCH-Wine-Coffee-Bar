/**
 * JWT Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/AppError');
const config = require('../config');

// Verify access token
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(AppError.unauthorized('No token provided'));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.accessSecret);

    const user = await User.findById(decoded.id).select('+isActive');
    if (!user || !user.isActive) {
      return next(AppError.unauthorized('User no longer exists or is inactive'));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// Role-based access control
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return next(AppError.forbidden(`Role '${req.user?.role}' is not authorized`));
  }
  next();
};

// Optional auth (does not fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.accessSecret);
      req.user = await User.findById(decoded.id);
    }
  } catch {
    // Silently ignore invalid tokens
  }
  next();
};

module.exports = { protect, authorize, optionalAuth };
