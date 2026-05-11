/**
 * Contact API Integration Tests
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Contact = require('../../src/models/Contact.model');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/perch_test');
});

afterAll(async () => {
  await Contact.deleteMany({ email: 'jest@test.com' });
  await mongoose.connection.close();
});

describe('POST /api/contact', () => {
  const validPayload = {
    name: 'Jest Tester',
    email: 'jest@test.com',
    subject: 'Test subject',
    message: 'This is a test message with enough content.',
    type: 'general',
  };

  it('should accept a valid contact form', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send(validPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
  });

  it('should reject missing required fields', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'No Email' });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors.some(e => e.field === 'email')).toBe(true);
  });

  it('should reject invalid email format', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validPayload, email: 'not-an-email' });

    expect(res.status).toBe(400);
  });

  it('should reject a message that is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validPayload, message: 'Hi' });

    expect(res.status).toBe(400);
  });
});
