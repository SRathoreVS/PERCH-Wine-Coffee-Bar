/**
 * Analytics Controller
 */

const Analytics = require('../models/Analytics.model');
const Contact = require('../models/Contact.model');
const Subscriber = require('../models/Subscriber.model');
const Booking = require('../models/Booking.model');
const { successResponse } = require('../utils/apiResponse');

exports.trackEvent = async (req, res, next) => {
  try {
    await Analytics.create({
      event: req.body.event,
      page: req.body.page,
      referrer: req.headers.referer,
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip,
      sessionId: req.body.sessionId,
      metadata: req.body.metadata,
    });
    return successResponse(res, { message: 'Event tracked' });
  } catch (err) {
    next(err);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      totalMessages,
      unreadMessages,
      newMessagesThisMonth,
      newMessagesLastMonth,
      totalSubscribers,
      activeSubscribers,
      newSubscribersThisMonth,
      totalBookings,
      pendingBookings,
      bookingsThisMonth,
      recentMessages,
      recentBookings,
      eventCounts,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      Contact.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Contact.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      Subscriber.countDocuments(),
      Subscriber.countDocuments({ status: 'active' }),
      Subscriber.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Contact.find({ status: 'unread' }).sort({ createdAt: -1 }).limit(5).select('name email subject createdAt'),
      Booking.find({ status: { $in: ['pending', 'confirmed'] } }).sort({ date: 1 }).limit(5),
      Analytics.aggregate([
        { $match: { createdAt: { $gte: startOfMonth } } },
        { $group: { _id: '$event', count: { $sum: 1 } } },
      ]),
    ]);

    // Page views last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const dailyViews = await Analytics.aggregate([
      { $match: { event: 'page_view', createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return successResponse(res, {
      data: {
        messages: {
          total: totalMessages,
          unread: unreadMessages,
          thisMonth: newMessagesThisMonth,
          lastMonth: newMessagesLastMonth,
          growth: newMessagesLastMonth > 0
            ? Math.round(((newMessagesThisMonth - newMessagesLastMonth) / newMessagesLastMonth) * 100)
            : 100,
        },
        subscribers: {
          total: totalSubscribers,
          active: activeSubscribers,
          thisMonth: newSubscribersThisMonth,
        },
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          thisMonth: bookingsThisMonth,
        },
        recentMessages,
        recentBookings,
        eventCounts: eventCounts.reduce((acc, { _id, count }) => ({ ...acc, [_id]: count }), {}),
        dailyViews,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getPageViewsChart = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const data = await Analytics.aggregate([
      { $match: { event: 'page_view', createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          views: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return successResponse(res, { data });
  } catch (err) {
    next(err);
  }
};
