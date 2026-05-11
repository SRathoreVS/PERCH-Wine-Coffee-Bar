const { baseLayout } = require('./baseLayout');

const adminContactTemplate = ({ name, email, phone, subject, message, type }) => {
  const content = `
    <h2>New Contact Inquiry</h2>
    <p>A new <strong>${type}</strong> inquiry has been submitted via the PERCH website.</p>

    <div style="margin: 24px 0;">
      <div class="info-row"><span class="info-label">Name</span><span class="info-value">${name}</span></div>
      <div class="info-row"><span class="info-label">Email</span><span class="info-value">${email}</span></div>
      ${phone ? `<div class="info-row"><span class="info-label">Phone</span><span class="info-value">${phone}</span></div>` : ''}
      <div class="info-row"><span class="info-label">Type</span><span class="info-value">${type}</span></div>
      <div class="info-row"><span class="info-label">Subject</span><span class="info-value">${subject}</span></div>
    </div>

    <div class="highlight-box">
      <p><strong>Message:</strong></p>
      <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
    </div>

    <a href="mailto:${email}" class="btn">Reply to ${name}</a>

    <p style="color: #999; font-size: 13px;">This notification was sent from the PERCH admin system.</p>
  `;

  return baseLayout({ title: `[PERCH] New Inquiry from ${name}`, content });
};

module.exports = { adminContactTemplate };
