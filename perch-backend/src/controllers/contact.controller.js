/**
 * Contact Controller
 */

const Contact = require('../models/Contact.model');
const { successResponse, paginationMeta } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { getPagination, buildSortOptions } = require('../helpers/pagination');
const emailService = require('../emails/emailService');
const Analytics = require('../models/Analytics.model');

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;

    const contact = await Contact.create({
      name, email, phone, subject, message, type,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Fire-and-forget email notifications
    Promise.all([
      emailService.sendContactConfirmation({ name, email, subject }).then(() => {
        contact.emailSent = true;
        contact.save();
      }),
      emailService.sendAdminContactNotification({ name, email, phone, subject, message, type }).then(() => {
        contact.adminNotified = true;
        contact.save();
      }),
      Analytics.create({ event: 'contact_form', metadata: { type }, ipAddress: req.ip }),
    ]).catch(() => {}); // Non-blocking

    return successResponse(res, {
      message: "Thank you for reaching out! We'll get back to you within 24 hours.",
      data: { id: contact._id },
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

// Admin: get all messages
exports.getMessages = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { status, type } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const sort = buildSortOptions(req.query.sort, ['createdAt', 'status']);

    const [messages, total] = await Promise.all([
      Contact.find(filter).sort(sort).skip(skip).limit(limit),
      Contact.countDocuments(filter),
    ]);

    return successResponse(res, {
      data: messages,
      meta: paginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) throw AppError.notFound('Message not found');

    if (message.status === 'unread') {
      message.status = 'read';
      message.readAt = new Date();
      await message.save();
    }

    return successResponse(res, { data: message });
  } catch (err) {
    next(err);
  }
};

exports.updateMessageStatus = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, ...(req.body.adminNotes && { adminNotes: req.body.adminNotes }) },
      { new: true, runValidators: true }
    );
    if (!message) throw AppError.notFound('Message not found');
    return successResponse(res, { message: 'Status updated', data: message });
  } catch (err) {
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) throw AppError.notFound('Message not found');
    message.deletedAt = new Date();
    await message.save();
    return successResponse(res, { message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
