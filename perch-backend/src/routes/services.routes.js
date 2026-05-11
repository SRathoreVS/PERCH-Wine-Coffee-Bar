/**
 * Services Routes — /api/services
 */

const router = require('express').Router();
const ctrl = require('../controllers/services.controller');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { body } = require('express-validator');

const serviceRules = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').optional().isIn(['wine', 'coffee', 'food', 'events', 'private', 'other']),
];

// Public
router.get('/', ctrl.getServices);
router.get('/:slug', ctrl.getServiceBySlug);

// Admin
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), serviceRules, validate, ctrl.createService);
router.put('/reorder', protect, authorize('superadmin', 'admin'), ctrl.reorderServices);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), ctrl.updateService);
router.delete('/:id', protect, authorize('superadmin', 'admin'), ctrl.deleteService);

module.exports = router;
