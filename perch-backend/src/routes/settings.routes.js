const router = require('express').Router();
const ctrl = require('../controllers/settings.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/public', ctrl.getPublicSettings);
router.get('/', protect, authorize('superadmin', 'admin'), ctrl.getAllSettings);
router.get('/:key', protect, authorize('superadmin', 'admin'), ctrl.getSetting);
router.post('/', protect, authorize('superadmin', 'admin'), ctrl.updateSettings);
router.delete('/:key', protect, authorize('superadmin'), ctrl.deleteSetting);

module.exports = router;
