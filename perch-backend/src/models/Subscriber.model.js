/**
 * Newsletter Subscriber Model
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    name: { type: String, trim: true },

    status: {
      type: String,
      enum: ['pending', 'active', 'unsubscribed', 'bounced'],
      default: 'active',
    },

    source: {
      type: String,
      enum: ['website', 'admin', 'import', 'other'],
      default: 'website',
    },

    confirmToken: {
      type: String,
      default: () => crypto.randomBytes(32).toString('hex'),
      select: false,
    },
    confirmedAt: { type: Date },
    unsubscribedAt: { type: Date },
    unsubscribeToken: {
      type: String,
      default: () => crypto.randomBytes(32).toString('hex'),
    },

    tags: [{ type: String }],
    ipAddress: { type: String },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

subscriberSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

subscriberSchema.index({ email: 1 });
subscriberSchema.index({ status: 1 });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;
