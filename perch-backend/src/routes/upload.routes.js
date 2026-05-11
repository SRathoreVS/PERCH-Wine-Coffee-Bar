/**
 * Upload Routes — /api/upload
 */

const router = require('express').Router();
const ctrl = require('../controllers/upload.controller');
const { protect, authorize } = require('../middleware/auth');
const { genericUpload, serviceUpload, avatarUpload } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.post(
  '/image',
  protect,
  authorize('superadmin', 'admin', 'editor'),
  uploadLimiter,
  genericUpload,
  ctrl.uploadSingle
);

router.post(
  '/service-image',
  protect,
  authorize('superadmin', 'admin', 'editor'),
  uploadLimiter,
  serviceUpload,
  ctrl.uploadSingle
);

router.post(
  '/avatar',
  protect,
  uploadLimiter,
  avatarUpload,
  ctrl.uploadSingle
);

router.delete(
  '/',
  protect,
  authorize('superadmin', 'admin'),
  ctrl.deleteFile
);

module.exports = router;
