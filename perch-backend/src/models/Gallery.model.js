/**
 * Gallery Model
 */

const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    thumbnailUrl: { type: String },
    altText: { type: String },

    category: {
      type: String,
      enum: ['ambiance', 'food', 'drinks', 'events', 'team', 'other'],
      default: 'other',
    },

    tags: [{ type: String, lowercase: true, trim: true }],

    cloudinaryId: { type: String },
    width: { type: Number },
    height: { type: Number },
    fileSize: { type: Number },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

gallerySchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

gallerySchema.index({ category: 1, isActive: 1 });
gallerySchema.index({ isFeatured: 1, order: 1 });
gallerySchema.index({ tags: 1 });

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;
