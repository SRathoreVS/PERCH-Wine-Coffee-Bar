/**
 * Booking Controller
 */

const Booking = require('../models/Booking.model');
const { successResponse, paginationMeta } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { getPagination, buildSortOptions } = require('../helpers/pagination');
const emailService = require('../emails/emailService');
const Analytics = require('../models/Analytics.model');

exports.createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      ipAddress: req.ip,
    });

    // Send confirmation email (non-blocking)
    emailService.sendBookingConfirmation({
      email: booking.email,
      name: booking.name,
      confirmationCode: booking.confirmationCode,
      date: booking.date,
      time: booking.time,
      partySize: booking.partySize,
      type: booking.type,
    }).then(async () => {
      booking.emailSent = true;
      await booking.save();
    }).catch(() => {});

    Analytics.create({ event: 'booking', ipAddress: req.ip }).catch(() => {});

    return successResponse(res, {
      message: 'Booking confirmed! Check your email.',
      data: {
        confirmationCode: booking.confirmationCode,
        id: booking._id,
      },
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingByCode = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ confirmationCode: req.params.code });
    if (!booking) throw AppError.notFound('Booking not found');
    return successResponse(res, { data: booking });
  } catch (err) {
    next(err);
  }
};

// Admin
exports.getBookings = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { status, type, from, to } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const sort = buildSortOptions(req.query.sort, ['date', 'createdAt', 'status']);

    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort(sort).skip(skip).limit(limit),
      Booking.countDocuments(filter),
    ]);

    return successResponse(res, {
      data: bookings,
      meta: paginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, adminNotes: req.body.adminNotes },
      { new: true, runValidators: true }
    );
    if (!booking) throw AppError.notFound('Booking not found');
    return successResponse(res, { message: 'Booking updated', data: booking });
  } catch (err) {
    next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw AppError.notFound('Booking not found');
    booking.deletedAt = new Date();
    await booking.save();
    return successResponse(res, { message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
};
