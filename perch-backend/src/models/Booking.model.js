/**
 * Booking / Reservation Model (future-ready)
 */

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    confirmationCode: {
      type: String,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },

    date: { type: Date, required: true },
    time: { type: String, required: true },
    partySize: { type: Number, required: true, min: 1, max: 50 },

    type: {
      type: String,
      enum: ['table', 'private_event', 'wine_tasting', 'other'],
      default: 'table',
    },

    specialRequests: { type: String, maxlength: 500 },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
      default: 'pending',
    },

    source: {
      type: String,
      enum: ['website', 'phone', 'walkin', 'admin'],
      default: 'website',
    },

    adminNotes: { type: String },
    emailSent: { type: Boolean, default: false },

    ipAddress: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Auto-generate confirmation code
bookingSchema.pre('save', function (next) {
  if (!this.confirmationCode) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.confirmationCode = 'PERCH-' + Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  }
  next();
});

bookingSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

bookingSchema.index({ date: 1, status: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ confirmationCode: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
