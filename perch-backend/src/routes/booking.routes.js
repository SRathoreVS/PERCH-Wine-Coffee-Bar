const router = require('express').Router();
const ctrl = require('../controllers/booking.controller');
const { protect, authorize } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validate');
const { body } = require('express-validator');

const bookingRules = [
  body('name').notEmpty().trim().withMessage('Name required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('date').isISO8601().withMessage('Valid date required'),
  body('time').notEmpty().withMessage('Time required'),
  body('partySize').isInt({ min: 1, max: 50 }).withMessage('Party size must be 1–50'),
];

// Public
router.post('/', formLimiter, bookingRules, validate, ctrl.createBooking);
router.get('/confirm/:code', ctrl.getBookingByCode);

// Admin
router.get('/', protect, authorize('superadmin', 'admin'), ctrl.getBookings);
router.patch('/:id/status', protect, authorize('superadmin', 'admin'), ctrl.updateBookingStatus);
router.delete('/:id', protect, authorize('superadmin', 'admin'), ctrl.deleteBooking);

module.exports = router;
