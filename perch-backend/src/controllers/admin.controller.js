/**
 * Admin Controller — user management
 */

const User = require('../models/User.model');
const { successResponse, paginationMeta } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { getPagination } = require('../helpers/pagination');

exports.getAdmins = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(),
    ]);
    return successResponse(res, { data: users, meta: paginationMeta({ page, limit, total }) });
  } catch (err) { next(err); }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return successResponse(res, { message: 'Admin user created', data: user, statusCode: 201 });
  } catch (err) { next(err); }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    // Prevent password update via this route
    const { password, ...updates } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) throw AppError.notFound('User not found');
    return successResponse(res, { message: 'User updated', data: user });
  } catch (err) { next(err); }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      throw AppError.badRequest('You cannot delete your own account');
    }
    const user = await User.findById(req.params.id);
    if (!user) throw AppError.notFound('User not found');
    await user.softDelete();
    return successResponse(res, { message: 'User deleted' });
  } catch (err) { next(err); }
};

exports.toggleAdminStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw AppError.notFound('User not found');
    user.isActive = !user.isActive;
    await user.save();
    return successResponse(res, {
      message: `User ${user.isActive ? 'activated' : 'deactivated'}`,
      data: { isActive: user.isActive },
    });
  } catch (err) { next(err); }
};
