/**
 * SEO Controller
 */

const SEO = require('../models/SEO.model');
const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

exports.getSEOByPage = async (req, res, next) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page.toLowerCase(), isActive: true });
    if (!seo) throw AppError.notFound('SEO data not found for this page');
    return successResponse(res, { data: seo });
  } catch (err) { next(err); }
};

exports.getAllSEO = async (req, res, next) => {
  try {
    const seo = await SEO.find({ isActive: true });
    return successResponse(res, { data: seo });
  } catch (err) { next(err); }
};

exports.upsertSEO = async (req, res, next) => {
  try {
    const seo = await SEO.findOneAndUpdate(
      { page: req.body.page.toLowerCase() },
      req.body,
      { upsert: true, new: true, runValidators: true }
    );
    return successResponse(res, { message: 'SEO data saved', data: seo });
  } catch (err) { next(err); }
};

exports.deleteSEO = async (req, res, next) => {
  try {
    const seo = await SEO.findByIdAndDelete(req.params.id);
    if (!seo) throw AppError.notFound('SEO record not found');
    return successResponse(res, { message: 'SEO record deleted' });
  } catch (err) { next(err); }
};
