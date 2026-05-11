/**
 * Contact Message Model
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    phone: { type: String, trim: true },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },

    type: {
      type: String,
      enum: ['general', 'reservation', 'event', 'feedback', 'complaint', 'other'],
      default: 'general',
    },

    status: {
      type: String,
      enum: ['unread', 'read', 'replied', 'archived'],
      default: 'unread',
    },

    adminNotes: { type: String },
    repliedAt: { type: Date },
    readAt: { type: Date },

    ipAddress: { type: String },
    userAgent: { type: String },

    emailSent: { type: Boolean, default: false },
    adminNotified: { type: Boolean, default: false },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

contactSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
