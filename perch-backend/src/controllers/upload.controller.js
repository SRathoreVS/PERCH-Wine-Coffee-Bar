/**
 * Upload Controller
 */

const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { deleteFromCloudinary } = require('../middleware/upload');

exports.uploadSingle = async (req, res, next) => {
  try {
    if (!req.file) throw AppError.badRequest('No file uploaded');
    return successResponse(res, {
      message: 'File uploaded',
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    const { publicId } = req.body;
    if (!publicId) throw AppError.badRequest('publicId is required');
    await deleteFromCloudinary(publicId);
    return successResponse(res, { message: 'File deleted from cloud storage' });
  } catch (err) {
    next(err);
  }
};
