const router = require('express').Router();
const ctrl = require('../controllers/analytics.controller');
const { protect, authorize } = require('../middleware/auth');
const { generalLimiter } = require('../middleware/rateLimiter');

router.post('/track', generalLimiter, ctrl.trackEvent);
router.get('/dashboard', protect, authorize('superadmin', 'admin'), ctrl.getDashboardStats);
router.get('/pageviews', protect, authorize('superadmin', 'admin'), ctrl.getPageViewsChart);

module.exports = router;
