/**
 * FAQ Model
 */

const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
    category: {
      type: String,
      enum: ['general', 'reservations', 'menu', 'events', 'hours', 'other'],
      default: 'general',
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

faqSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
