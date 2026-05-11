const router = require('express').Router();
const ctrl = require('../controllers/faq.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', ctrl.getFAQs);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), ctrl.createFAQ);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), ctrl.updateFAQ);
router.delete('/:id', protect, authorize('superadmin', 'admin'), ctrl.deleteFAQ);

module.exports = router;
