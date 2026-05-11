/**
 * File Upload Middleware — Multer + Cloudinary
 */

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const AppError = require('../utils/AppError');
const config = require('../config');

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Cloudinary storage factory
const createCloudinaryStorage = (folder, transformations = []) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `perch/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: transformations,
    },
  });

// File filter — images only
const imageFilter = (req, file, cb) => {
  if (config.upload.allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files (JPG, PNG, WebP) are allowed', 400), false);
  }
};

// Gallery uploads
const galleryUpload = multer({
  storage: createCloudinaryStorage('gallery', [
    { width: 1200, crop: 'limit', quality: 'auto' },
  ]),
  fileFilter: imageFilter,
  limits: { fileSize: config.upload.maxFileSize },
}).single('image');

// Service image uploads
const serviceUpload = multer({
  storage: createCloudinaryStorage('services', [
    { width: 800, crop: 'limit', quality: 'auto' },
  ]),
  fileFilter: imageFilter,
  limits: { fileSize: config.upload.maxFileSize },
}).single('image');

// Avatar uploads
const avatarUpload = multer({
  storage: createCloudinaryStorage('avatars', [
    { width: 200, height: 200, crop: 'fill', gravity: 'face', quality: 'auto' },
  ]),
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB for avatars
}).single('avatar');

// Generic upload
const genericUpload = multer({
  storage: createCloudinaryStorage('misc'),
  fileFilter: imageFilter,
  limits: { fileSize: config.upload.maxFileSize },
}).single('file');

// Delete from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    // Non-fatal
  }
};

module.exports = {
  cloudinary,
  galleryUpload,
  serviceUpload,
  avatarUpload,
  genericUpload,
  deleteFromCloudinary,
};
