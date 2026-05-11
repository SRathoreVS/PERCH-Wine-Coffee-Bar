/**
 * Business Information Model
 */

const mongoose = require('mongoose');

const businessHoursSchema = new mongoose.Schema({
  day: { type: String, required: true },
  open: { type: String },
  close: { type: String },
  closed: { type: Boolean, default: false },
}, { _id: false });

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // instagram, facebook, twitter, etc.
  url: { type: String, required: true },
  icon: { type: String },
}, { _id: false });

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    tagline: { type: String, trim: true },
    description: { type: String, trim: true },
    shortDescription: { type: String, trim: true, maxlength: 300 },

    logo: { type: String },
    favicon: { type: String },
    heroImage: { type: String },
    heroVideo: { type: String },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String, default: 'USA' },
      mapUrl: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },

    contact: {
      phone: { type: String },
      email: { type: String },
      whatsapp: { type: String },
    },

    businessHours: [businessHoursSchema],
    socialLinks: [socialLinkSchema],

    established: { type: Number },
    theme: {
      primaryColor: { type: String, default: '#8B0000' },
      accentColor: { type: String, default: '#D4AF37' },
      font: { type: String, default: 'Playfair Display' },
    },

    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },

    // SEO
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
      ogImage: { type: String },
    },
  },
  { timestamps: true }
);

businessSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeDeleted) this.where({ deletedAt: null });
  next();
});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
