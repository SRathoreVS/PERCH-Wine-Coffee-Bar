/**
 * Testimonials Controller
 */

const Testimonial = require('../models/Testimonial.model');
const { successResponse, paginationMeta } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { getPagination, buildSortOptions } = require('../helpers/pagination');

exports.getTestimonials = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { featured, source, minRating } = req.query;

    const filter = { isActive: true };
    if (featured === 'true') filter.isFeatured = true;
    if (source) filter.source = source;
    if (minRating) filter.rating = { $gte: parseInt(minRating) };

    const sort = buildSortOptions(req.query.sort, ['order', 'rating', 'createdAt']);

    const [testimonials, total] = await Promise.all([
      Testimonial.find(filter).sort(sort).skip(skip).limit(limit),
      Testimonial.countDocuments(filter),
    ]);

    return successResponse(res, {
      data: testimonials,
      meta: paginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
};

exports.createTestimonial = async (req, res, next) => {
  try {
    const t = await Testimonial.create(req.body);
    return successResponse(res, { message: 'Testimonial created', data: t, statusCode: 201 });
  } catch (err) {
    next(err);
  }
};

exports.updateTestimonial = async (req, res, next) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!t) throw AppError.notFound('Testimonial not found');
    return successResponse(res, { message: 'Testimonial updated', data: t });
  } catch (err) {
    next(err);
  }
};

exports.deleteTestimonial = async (req, res, next) => {
  try {
    const t = await Testimonial.findById(req.params.id);
    if (!t) throw AppError.notFound('Testimonial not found');
    t.deletedAt = new Date();
    await t.save();
    return successResponse(res, { message: 'Testimonial deleted' });
  } catch (err) {
    next(err);
  }
};
