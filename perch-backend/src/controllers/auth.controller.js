/**
 * Authentication Controller
 */

const authService = require('../services/auth.service');
const { successResponse } = require('../utils/apiResponse');

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login({ email, password });

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    return successResponse(res, {
      message: 'Login successful',
      data: { user, accessToken },
    });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken || req.headers['x-refresh-token'];
    const { accessToken, refreshToken } = await authService.refreshAccessToken(token);

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

    return successResponse(res, {
      message: 'Token refreshed',
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken || req.headers['x-refresh-token'];
    await authService.logout(req.user._id, token);

    res.clearCookie('refreshToken');
    return successResponse(res, { message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    return successResponse(res, { data: req.user });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    return successResponse(res, {
      message: 'If that email is registered, you will receive a reset link shortly.',
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password);
    return successResponse(res, { message: 'Password reset successfully' });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user._id, currentPassword, newPassword);
    return successResponse(res, { message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};
