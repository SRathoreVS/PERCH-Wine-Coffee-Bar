/**
 * Contact Routes — /api/contact
 */

const router = require('express').Router();
const ctrl = require('../controllers/contact.controller');
const { protect, authorize } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validate');
const { body } = require('express-validator');

const contactRules = [
  body('name').notEmpty().trim().isLength({ max: 100 }).withMessage('Name is required (max 100 chars)'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('subject').notEmpty().isLength({ max: 200 }).withMessage('Subject required'),
  body('message').notEmpty().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters'),
  body('type').optional().isIn(['general', 'reservation', 'event', 'feedback', 'complaint', 'other']),
];

// Public
router.post('/', formLimiter, contactRules, validate, ctrl.submitContact);

// Admin
router.get('/', protect, authorize('superadmin', 'admin'), ctrl.getMessages);
router.get('/:id', protect, authorize('superadmin', 'admin'), ctrl.getMessage);
router.patch('/:id/status', protect, authorize('superadmin', 'admin'), ctrl.updateMessageStatus);
router.delete('/:id', protect, authorize('superadmin', 'admin'), ctrl.deleteMessage);

module.exports = router;
