/**
 * Gallery Controller
 */

const Gallery = require('../models/Gallery.model');
const { successResponse, paginationMeta } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { getPagination, buildSearchFilter, buildSortOptions } = require('../helpers/pagination');
const { deleteFromCloudinary } = require('../middleware/upload');

exports.getGallery = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { category, featured, tag, search } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (tag) filter.tags = tag;
    if (search) Object.assign(filter, buildSearchFilter(search, ['title', 'description', 'altText']));

    const sort = buildSortOptions(req.query.sort, ['order', 'createdAt', 'title']);

    const [images, total] = await Promise.all([
      Gallery.find(filter).sort(sort).skip(skip).limit(limit).populate('uploadedBy', 'name'),
      Gallery.countDocuments(filter),
    ]);

    return successResponse(res, {
      data: images,
      meta: paginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
};

exports.getImageById = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) throw AppError.notFound('Image not found');
    return successResponse(res, { data: image });
  } catch (err) {
    next(err);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) throw AppError.badRequest('No image file provided');

    const image = await Gallery.create({
      ...req.body,
      imageUrl: req.file.path,
      cloudinaryId: req.file.filename,
      uploadedBy: req.user._id,
    });

    return successResponse(res, { message: 'Image uploaded', data: image, statusCode: 201 });
  } catch (err) {
    next(err);
  }
};

exports.updateImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!image) throw AppError.notFound('Image not found');
    return successResponse(res, { message: 'Image updated', data: image });
  } catch (err) {
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) throw AppError.notFound('Image not found');

    // Delete from Cloudinary
    if (image.cloudinaryId) await deleteFromCloudinary(image.cloudinaryId);

    image.deletedAt = new Date();
    await image.save();

    return successResponse(res, { message: 'Image deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Gallery.distinct('category', { isActive: true });
    return successResponse(res, { data: categories });
  } catch (err) {
    next(err);
  }
};
