/**
 * Admin User Management Routes — /api/admin
 */

const router = require('express').Router();
const ctrl = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { body } = require('express-validator');

const createAdminRules = [
  body('name').notEmpty().trim().isLength({ max: 60 }).withMessage('Name required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/)
    .withMessage('Password must be 8+ chars with at least one uppercase and number'),
  body('role').optional().isIn(['admin', 'editor']).withMessage('Invalid role'),
];

// All admin routes require superadmin or admin
router.use(protect);

router.get('/', authorize('superadmin', 'admin'), ctrl.getAdmins);
router.post('/', authorize('superadmin'), createAdminRules, validate, ctrl.createAdmin);
router.put('/:id', authorize('superadmin', 'admin'), ctrl.updateAdmin);
router.delete('/:id', authorize('superadmin'), ctrl.deleteAdmin);
router.patch('/:id/toggle-status', authorize('superadmin'), ctrl.toggleAdminStatus);

module.exports = router;
