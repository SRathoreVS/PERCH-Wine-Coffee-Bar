/**
 * SEO Metadata Model — per page/route
 */

const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // e.g. 'home', 'menu', 'gallery', 'contact'
    },
    metaTitle: { type: String, maxlength: 70 },
    metaDescription: { type: String, maxlength: 160 },
    keywords: [{ type: String }],

    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    ogType: { type: String, default: 'website' },

    twitterCard: { type: String, default: 'summary_large_image' },
    twitterTitle: { type: String },
    twitterDescription: { type: String },
    twitterImage: { type: String },

    canonicalUrl: { type: String },
    robots: { type: String, default: 'index, follow' },
    structuredData: { type: mongoose.Schema.Types.Mixed },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SEO = mongoose.model('SEO', seoSchema);
module.exports = SEO;
