/**
 * Newsletter Routes — /api/newsletter
 */

const router = require('express').Router();
const ctrl = require('../controllers/newsletter.controller');
const { protect, authorize } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validate');
const { body } = require('express-validator');

router.post('/subscribe', formLimiter, [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('name').optional().trim().isLength({ max: 60 }),
], validate, ctrl.subscribe);

router.get('/unsubscribe/:token', ctrl.unsubscribe);

// Admin
router.get('/', protect, authorize('superadmin', 'admin'), ctrl.getSubscribers);
router.delete('/:id', protect, authorize('superadmin', 'admin'), ctrl.deleteSubscriber);

module.exports = router;
