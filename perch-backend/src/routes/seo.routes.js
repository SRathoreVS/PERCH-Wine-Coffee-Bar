const router = require('express').Router();
const ctrl = require('../controllers/seo.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', ctrl.getAllSEO);
router.get('/:page', ctrl.getSEOByPage);
router.post('/', protect, authorize('superadmin', 'admin'), ctrl.upsertSEO);
router.delete('/:id', protect, authorize('superadmin', 'admin'), ctrl.deleteSEO);

module.exports = router;
