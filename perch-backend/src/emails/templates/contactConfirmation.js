const { baseLayout } = require('./baseLayout');

const contactConfirmationTemplate = ({ name, subject }) => {
  const content = `
    <h2>Hello, ${name} 👋</h2>
    <p>Thank you for reaching out to us. We've received your message and one of our team members will get back to you within <strong>24 hours</strong>.</p>

    <div class="highlight-box">
      <p><strong>Your Inquiry:</strong> ${subject}</p>
    </div>

    <p>In the meantime, feel free to explore our offerings and follow us on social media for the latest updates, events, and specials.</p>

    <p>We look forward to welcoming you to PERCH soon.</p>

    <p style="margin-top: 24px; color: #888; font-style: italic;">Warm regards,<br/>The PERCH Team</p>
  `;

  return baseLayout({ title: 'Message Received — PERCH', content });
};

module.exports = { contactConfirmationTemplate };
