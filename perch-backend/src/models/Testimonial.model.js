/**
 * Testimonials Model
 */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    role: { type: String, trim: true },
    avatar: { type: String },

    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
      maxlength: [1000, 'Content cannot exceed 1000 characters'],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    source: {
      type: String,
      enum: ['google', 'yelp', 'tripadvisor', 'direct', 'other'],
      default: 'direct',
    },
    sourceUrl: { type: String },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

testimonialSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

testimonialSchema.index({ isActive: 1, isFeatured: 1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;
