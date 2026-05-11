/**
 * Settings Controller
 */

const Settings = require('../models/Settings.model');
const { successResponse } = require('../utils/apiResponse');

exports.getPublicSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find({ isPublic: true });
    const result = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
    return successResponse(res, { data: result });
  } catch (err) { next(err); }
};

exports.getAllSettings = async (req, res, next) => {
  try {
    const { group } = req.query;
    const filter = group ? { group } : {};
    const settings = await Settings.find(filter);
    const result = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
    return successResponse(res, { data: result });
  } catch (err) { next(err); }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body; // [{ key, value, group, isPublic }]
    const ops = settings.map(({ key, value, group, description, isPublic }) =>
      Settings.set(key, value, { group, description, isPublic })
    );
    await Promise.all(ops);
    return successResponse(res, { message: 'Settings saved' });
  } catch (err) { next(err); }
};

exports.getSetting = async (req, res, next) => {
  try {
    const value = await Settings.get(req.params.key);
    return successResponse(res, { data: { key: req.params.key, value } });
  } catch (err) { next(err); }
};

exports.deleteSetting = async (req, res, next) => {
  try {
    await Settings.findOneAndDelete({ key: req.params.key });
    return successResponse(res, { message: 'Setting deleted' });
  } catch (err) { next(err); }
};
