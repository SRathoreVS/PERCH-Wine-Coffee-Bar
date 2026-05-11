// ── testimonials.routes.js ─────────────────────────────────────────────────

const router1 = require('express').Router();
const testimonialsCtrl = require('../controllers/testimonials.controller');
const { protect, authorize } = require('../middleware/auth');

router1.get('/', testimonialsCtrl.getTestimonials);
router1.post('/', protect, authorize('superadmin', 'admin', 'editor'), testimonialsCtrl.createTestimonial);
router1.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), testimonialsCtrl.updateTestimonial);
router1.delete('/:id', protect, authorize('superadmin', 'admin'), testimonialsCtrl.deleteTestimonial);

module.exports = router1;
