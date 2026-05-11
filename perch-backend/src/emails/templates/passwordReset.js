const { baseLayout } = require('./baseLayout');

const passwordResetTemplate = ({ name, resetUrl }) => {
  const content = `
    <h2>Password Reset Request</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset the password for your PERCH admin account. Click the button below to set a new password.</p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetUrl}" class="btn">Reset My Password</a>
    </div>

    <div class="highlight-box">
      <p><strong>⚠️ This link expires in 1 hour.</strong></p>
      <p style="margin-top:6px; font-size:13px; color:#666;">If you didn't request this, you can safely ignore this email — your password won't change.</p>
    </div>

    <p style="font-size: 13px; color: #999;">Or copy this URL into your browser:<br/><a href="${resetUrl}" style="color: #8B0000;">${resetUrl}</a></p>
  `;

  return baseLayout({ title: 'Password Reset — PERCH', content });
};

module.exports = { passwordResetTemplate };
