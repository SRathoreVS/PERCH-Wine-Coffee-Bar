/**
 * Business Information Controller
 */

const Business = require('../models/Business.model');
const { successResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

exports.getBusiness = async (req, res, next) => {
  try {
    const business = await Business.findOne({ isActive: true });
    if (!business) throw AppError.notFound('Business information not found');
    return successResponse(res, { data: business });
  } catch (err) {
    next(err);
  }
};

exports.createOrUpdateBusiness = async (req, res, next) => {
  try {
    const existing = await Business.findOne({});
    let business;
    if (existing) {
      Object.assign(existing, req.body);
      business = await existing.save();
    } else {
      business = await Business.create(req.body);
    }
    return successResponse(res, {
      message: 'Business information saved',
      data: business,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBusinessHours = async (req, res, next) => {
  try {
    const business = await Business.findOne({});
    if (!business) throw AppError.notFound('Business not found');
    business.businessHours = req.body.businessHours;
    await business.save();
    return successResponse(res, { message: 'Business hours updated', data: business.businessHours });
  } catch (err) {
    next(err);
  }
};

exports.updateSocialLinks = async (req, res, next) => {
  try {
    const business = await Business.findOne({});
    if (!business) throw AppError.notFound('Business not found');
    business.socialLinks = req.body.socialLinks;
    await business.save();
    return successResponse(res, { message: 'Social links updated', data: business.socialLinks });
  } catch (err) {
    next(err);
  }
};
