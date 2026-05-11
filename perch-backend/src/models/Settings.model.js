/**
 * Website Settings Model (singleton pattern)
 */

const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    value: { type: mongoose.Schema.Types.Mixed },
    description: { type: String },
    group: {
      type: String,
      enum: ['general', 'appearance', 'email', 'social', 'features', 'advanced'],
      default: 'general',
    },
    isPublic: { type: Boolean, default: false }, // can frontend read without auth?
  },
  { timestamps: true }
);

settingsSchema.statics.get = async function (key) {
  const doc = await this.findOne({ key });
  return doc ? doc.value : null;
};

settingsSchema.statics.set = async function (key, value, options = {}) {
  return this.findOneAndUpdate(
    { key },
    { $set: { value, ...options } },
    { upsert: true, new: true }
  );
};

settingsSchema.statics.getGroup = async function (group) {
  const docs = await this.find({ group });
  return docs.reduce((acc, doc) => ({ ...acc, [doc.key]: doc.value }), {});
};

const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;
