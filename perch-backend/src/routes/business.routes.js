/**
 * Business Routes — /api/business
 */

const router = require('express').Router();
const ctrl = require('../controllers/business.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', ctrl.getBusiness);
router.post('/', protect, authorize('superadmin', 'admin'), ctrl.createOrUpdateBusiness);
router.put('/hours', protect, authorize('superadmin', 'admin'), ctrl.updateBusinessHours);
router.put('/social', protect, authorize('superadmin', 'admin'), ctrl.updateSocialLinks);

module.exports = router;
