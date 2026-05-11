/**
 * HTTP Request Logger Middleware
 */

const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    };

    if (res.statusCode >= 500) {
      logger.error('Request error', log);
    } else if (res.statusCode >= 400) {
      logger.warn('Client error', log);
    } else {
      logger.info('Request', log);
    }
  });

  next();
};

module.exports = { requestLogger };
