/**
 * Analytics / Page View Model
 */

const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
      enum: ['page_view', 'contact_form', 'newsletter_signup', 'booking', 'gallery_view', 'service_view'],
    },
    page: { type: String },
    referrer: { type: String },
    userAgent: { type: String },
    ipAddress: { type: String },
    country: { type: String },
    city: { type: String },
    sessionId: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true, capped: { size: 50 * 1024 * 1024, max: 100000 } }
);

analyticsSchema.index({ event: 1, createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
