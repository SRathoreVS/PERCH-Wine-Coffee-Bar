/**
 * Email Service — Nodemailer
 */

const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
      tls: { rejectUnauthorized: false },
    });
  }

  async verify() {
    try {
      await this.transporter.verify();
      logger.info('✉️  Email service ready');
    } catch (err) {
      logger.warn('Email service not configured:', err.message);
    }
  }

  async send({ to, subject, html, text }) {
    if (!config.email.user) {
      logger.warn('Email not sent — SMTP not configured');
      return;
    }

    try {
      const info = await this.transporter.sendMail({
        from: config.email.from,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''),
      });
      logger.info(`Email sent: ${info.messageId} → ${to}`);
      return info;
    } catch (err) {
      logger.error('Email send failed:', err.message);
      throw err;
    }
  }

  // ─── Email Types ───────────────────────────────

  async sendContactConfirmation({ name, email, subject }) {
    const { contactConfirmationTemplate } = require('./templates/contactConfirmation');
    return this.send({
      to: email,
      subject: `We received your message — PERCH`,
      html: contactConfirmationTemplate({ name, subject }),
    });
  }

  async sendAdminContactNotification({ name, email, phone, subject, message, type }) {
    const { adminContactTemplate } = require('./templates/adminContact');
    return this.send({
      to: config.email.adminEmail,
      subject: `[PERCH] New ${type} inquiry from ${name}`,
      html: adminContactTemplate({ name, email, phone, subject, message, type }),
    });
  }

  async sendPasswordReset({ email, name, resetUrl }) {
    const { passwordResetTemplate } = require('./templates/passwordReset');
    return this.send({
      to: email,
      subject: 'Reset your PERCH account password',
      html: passwordResetTemplate({ name, resetUrl }),
    });
  }

  async sendBookingConfirmation({ email, name, confirmationCode, date, time, partySize, type }) {
    const { bookingConfirmationTemplate } = require('./templates/bookingConfirmation');
    return this.send({
      to: email,
      subject: `Booking confirmed — ${confirmationCode}`,
      html: bookingConfirmationTemplate({ name, confirmationCode, date, time, partySize, type }),
    });
  }

  async sendNewsletterWelcome({ email, name, unsubscribeToken }) {
    const { newsletterWelcomeTemplate } = require('./templates/newsletterWelcome');
    const unsubscribeUrl = `${config.frontend.url}/unsubscribe?token=${unsubscribeToken}`;
    return this.send({
      to: email,
      subject: `Welcome to PERCH — You're on the list`,
      html: newsletterWelcomeTemplate({ name, unsubscribeUrl }),
    });
  }
}

module.exports = new EmailService();
