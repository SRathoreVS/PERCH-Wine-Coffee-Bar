/**
 * Services Model
 */

const mongoose = require('mongoose');
const { slugify } = require('../utils/slugify');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 200 },
    icon: { type: String }, // icon name or SVG
    image: { type: String },
    images: [{ type: String }],

    category: {
      type: String,
      enum: ['wine', 'coffee', 'food', 'events', 'private', 'other'],
      default: 'other',
    },

    highlights: [{ type: String }],
    price: {
      from: { type: Number },
      to: { type: Number },
      label: { type: String },
    },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },

    // SEO
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Auto-generate slug
serviceSchema.pre('validate', async function (next) {
  if (this.isNew || this.isModified('title')) {
    const base = slugify(this.title);
    const count = await mongoose.model('Service').countDocuments({ slug: new RegExp(`^${base}`) });
    this.slug = count === 0 ? base : `${base}-${count}`;
  }
  next();
});

serviceSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isFeatured: 1, order: 1 });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
