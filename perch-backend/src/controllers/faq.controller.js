/**
 * FAQ Controller
 */

const FAQ = require('../models/FAQ.model');
const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

exports.getFAQs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: 1 });
    return successResponse(res, { data: faqs });
  } catch (err) { next(err); }
};

exports.createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    return successResponse(res, { message: 'FAQ created', data: faq, statusCode: 201 });
  } catch (err) { next(err); }
};

exports.updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) throw AppError.notFound('FAQ not found');
    return successResponse(res, { message: 'FAQ updated', data: faq });
  } catch (err) { next(err); }
};

exports.deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) throw AppError.notFound('FAQ not found');
    faq.deletedAt = new Date();
    await faq.save();
    return successResponse(res, { message: 'FAQ deleted' });
  } catch (err) { next(err); }
};
