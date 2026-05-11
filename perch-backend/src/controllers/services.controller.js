/**
 * Services Controller
 */

const Service = require('../models/Service.model');
const { successResponse, paginationMeta } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');
const { getPagination, buildSearchFilter, buildSortOptions } = require('../helpers/pagination');

exports.getServices = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { category, featured, search } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (search) Object.assign(filter, buildSearchFilter(search, ['title', 'description', 'shortDescription']));

    const sort = buildSortOptions(req.query.sort, ['title', 'order', 'createdAt']);

    const [services, total] = await Promise.all([
      Service.find(filter).sort(sort).skip(skip).limit(limit),
      Service.countDocuments(filter),
    ]);

    return successResponse(res, {
      data: services,
      meta: paginationMeta({ page, limit, total }),
    });
  } catch (err) {
    next(err);
  }
};

exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) throw AppError.notFound('Service not found');
    return successResponse(res, { data: service });
  } catch (err) {
    next(err);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    return successResponse(res, { message: 'Service created', data: service, statusCode: 201 });
  } catch (err) {
    next(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!service) throw AppError.notFound('Service not found');
    return successResponse(res, { message: 'Service updated', data: service });
  } catch (err) {
    next(err);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) throw AppError.notFound('Service not found');
    service.deletedAt = new Date();
    await service.save();
    return successResponse(res, { message: 'Service deleted' });
  } catch (err) {
    next(err);
  }
};

exports.reorderServices = async (req, res, next) => {
  try {
    const { order } = req.body; // [{ id, order }, ...]
    await Promise.all(order.map(({ id, order: o }) =>
      Service.findByIdAndUpdate(id, { order: o })
    ));
    return successResponse(res, { message: 'Services reordered' });
  } catch (err) {
    next(err);
  }
};
