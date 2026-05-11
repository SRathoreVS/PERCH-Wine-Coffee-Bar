/**
 * Newsletter Controller
 */

const Subscriber = require('../models/Subscriber.model');
const { successResponse, paginationMeta } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { getPagination } = require('../helpers/pagination');
const emailService = require('../emails/emailService');
const Analytics = require('../models/Analytics.model');

exports.subscribe = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const existing = await Subscriber.findOne({ email }).setOptions({ includeDeleted: true });
    if (existing) {
      if (existing.status === 'active') {
        return successResponse(res, { message: "You're already subscribed!" });
      }
      // Re-subscribe
      existing.status = 'active';
      existing.unsubscribedAt = undefined;
      existing.deletedAt = undefined;
      await existing.save();
    } else {
      const sub = await Subscriber.create({ email, name, ipAddress: req.ip });
      // Send welcome email
      emailService.sendNewsletterWelcome({ email, name, unsubscribeToken: sub.unsubscribeToken }).catch(() => {});
    }

    Analytics.create({ event: 'newsletter_signup', ipAddress: req.ip }).catch(() => {});

    return successResponse(res, {
      message: "You're subscribed! Check your email for a welcome note. 🥂",
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.unsubscribe = async (req, res, next) => {
  try {
    const { token } = req.params;
    const sub = await Subscriber.findOne({ unsubscribeToken: token });
    if (!sub) throw AppError.notFound('Subscription not found');

    sub.status = 'unsubscribed';
    sub.unsubscribedAt = new Date();
    await sub.save();

    return successResponse(res, { message: 'Unsubscribed successfully.' });
  } catch (err) {
    next(err);
  }
};

// Admin
exports.getSubscribers = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const [subscribers, total] = await Promise.all([
      Subscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Subscriber.countDocuments(filter),
    ]);

    return successResponse(res, {
      data: subscribers,
      meta: paginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteSubscriber = async (req, res, next) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    if (!sub) throw AppError.notFound('Subscriber not found');
    sub.deletedAt = new Date();
    await sub.save();
    return successResponse(res, { message: 'Subscriber removed' });
  } catch (err) {
    next(err);
  }
};
