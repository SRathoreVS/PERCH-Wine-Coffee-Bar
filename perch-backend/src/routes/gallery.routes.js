/**
 * Gallery Routes — /api/gallery
 */

const router = require('express').Router();
const ctrl = require('../controllers/gallery.controller');
const { protect, authorize } = require('../middleware/auth');
const { galleryUpload } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');

// Public
router.get('/', ctrl.getGallery);
router.get('/categories', ctrl.getCategories);
router.get('/:id', ctrl.getImageById);

// Admin
router.post(
  '/',
  protect,
  authorize('superadmin', 'admin', 'editor'),
  uploadLimiter,
  galleryUpload,
  ctrl.uploadImage
);
router.put('/:id', protect, authorize('superadmin', 'admin', 'editor'), ctrl.updateImage);
router.delete('/:id', protect, authorize('superadmin', 'admin'), ctrl.deleteImage);

module.exports = router;
