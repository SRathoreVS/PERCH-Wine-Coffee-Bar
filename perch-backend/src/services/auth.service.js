/**
 * Authentication Service
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User.model');
const config = require('../config');
const AppError = require('../utils/AppError');
const emailService = require('../emails/emailService');

class AuthService {
  generateAccessToken(userId, role) {
    return jwt.sign({ id: userId, role }, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiry,
    });
  }

  generateRefreshToken(userId) {
    return jwt.sign({ id: userId }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiry,
    });
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, config.jwt.refreshSecret);
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select('+password +refreshTokens +loginAttempts +lockUntil');

    if (!user) throw AppError.unauthorized('Invalid email or password');
    if (user.isLocked()) throw AppError.unauthorized('Account locked due to too many failed attempts. Try again in 2 hours.');
    if (!user.isActive) throw AppError.unauthorized('Account is deactivated');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incrementLoginAttempts();
      throw AppError.unauthorized('Invalid email or password');
    }

    // Reset on success
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();

    const accessToken = this.generateAccessToken(user._id, user.role);
    const refreshToken = this.generateRefreshToken(user._id);

    user.refreshTokens = [...(user.refreshTokens || []).slice(-4), refreshToken];
    await user.save();

    return { user, accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) throw AppError.unauthorized('No refresh token');

    let decoded;
    try {
      decoded = this.verifyRefreshToken(refreshToken);
    } catch {
      throw AppError.unauthorized('Invalid or expired refresh token');
    }

    const user = await User.findById(decoded.id).select('+refreshTokens');
    if (!user || !user.refreshTokens?.includes(refreshToken)) {
      throw AppError.unauthorized('Refresh token not recognised');
    }

    const newAccessToken = this.generateAccessToken(user._id, user.role);
    const newRefreshToken = this.generateRefreshToken(user._id);

    user.refreshTokens = user.refreshTokens
      .filter((t) => t !== refreshToken)
      .concat(newRefreshToken);
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId, refreshToken) {
    const user = await User.findById(userId).select('+refreshTokens');
    if (user) {
      user.refreshTokens = (user.refreshTokens || []).filter((t) => t !== refreshToken);
      await user.save();
    }
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) return; // Silently return to prevent enumeration

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${config.frontend.url}/admin/reset-password/${resetToken}`;
    await emailService.sendPasswordReset({ email: user.email, name: user.name, resetUrl });
  }

  async resetPassword(token, newPassword) {
    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) throw AppError.badRequest('Token is invalid or has expired');

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = [];
    await user.save();
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) throw AppError.notFound('User not found');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw AppError.badRequest('Current password is incorrect');

    user.password = newPassword;
    user.refreshTokens = [];
    await user.save();
  }
}

module.exports = new AuthService();
