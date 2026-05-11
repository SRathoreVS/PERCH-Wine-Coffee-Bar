/**
 * Services API Integration Tests
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Service = require('../../src/models/Service.model');
const User = require('../../src/models/User.model');

let accessToken;
let createdServiceId;

const TEST_ADMIN = {
  name: 'Services Test Admin',
  email: 'servicestest@perchbar.com',
  password: 'TestAdmin@1234',
  role: 'superadmin',
  isActive: true,
  isEmailVerified: true,
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/perch_test');
  await User.deleteMany({ email: TEST_ADMIN.email });
  await User.create(TEST_ADMIN);

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: TEST_ADMIN.email, password: TEST_ADMIN.password });
  accessToken = loginRes.body.data.accessToken;
});

afterAll(async () => {
  if (createdServiceId) {
    await Service.findByIdAndDelete(createdServiceId);
  }
  await User.deleteMany({ email: TEST_ADMIN.email });
  await mongoose.connection.close();
});

describe('GET /api/services', () => {
  it('should return services list', async () => {
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toHaveProperty('total');
  });

  it('should support category filter', async () => {
    const res = await request(app).get('/api/services?category=wine');
    expect(res.status).toBe(200);
    res.body.data.forEach(s => expect(s.category).toBe('wine'));
  });

  it('should support pagination', async () => {
    const res = await request(app).get('/api/services?page=1&limit=2');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(2);
    expect(res.body.meta.limit).toBe(2);
  });
});

describe('POST /api/services', () => {
  it('should create a service when authenticated', async () => {
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Jest Test Service',
        description: 'This is a test service created by Jest.',
        category: 'other',
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('Jest Test Service');
    expect(res.body.data).toHaveProperty('slug');
    createdServiceId = res.body.data._id;
  });

  it('should reject without authentication', async () => {
    const res = await request(app)
      .post('/api/services')
      .send({ title: 'Unauthorized', description: 'Nope', category: 'other' });

    expect(res.status).toBe(401);
  });

  it('should reject missing title', async () => {
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ description: 'No title here' });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/services/:slug', () => {
  it('should return service by slug', async () => {
    const res = await request(app).get('/api/services/jest-test-service');
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Jest Test Service');
  });

  it('should 404 for unknown slug', async () => {
    const res = await request(app).get('/api/services/does-not-exist-xyz');
    expect(res.status).toBe(404);
  });
});
