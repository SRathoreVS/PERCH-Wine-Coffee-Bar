/**
 * Auth Routes — /api/auth
 */

const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validate');
const { body } = require('express-validator');

// Validation rules
const loginRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];

const passwordRules = [
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/).withMessage('Password must contain at least one uppercase letter and one number'),
];

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 */
router.post('/login', authLimiter, loginRules, validate, authCtrl.login);
router.post('/refresh', authCtrl.refreshToken);
router.post('/logout', protect, authCtrl.logout);
router.get('/me', protect, authCtrl.getMe);
router.post('/forgot-password', authLimiter, [
  body('email').isEmail().normalizeEmail(),
], validate, authCtrl.forgotPassword);
router.post('/reset-password/:token', passwordRules, validate, authCtrl.resetPassword);
router.put('/change-password', protect, [
  body('currentPassword').notEmpty(),
  ...passwordRules.map(r => r),
], validate, authCtrl.changePassword);

module.exports = router;
