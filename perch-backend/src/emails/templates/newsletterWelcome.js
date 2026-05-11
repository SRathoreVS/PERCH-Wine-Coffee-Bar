const { baseLayout } = require('./baseLayout');

const newsletterWelcomeTemplate = ({ name, unsubscribeUrl }) => {
  const content = `
    <h2>Welcome to the PERCH Inner Circle ☕🍷</h2>
    <p>Hi ${name || 'there'},</p>
    <p>You're now subscribed to exclusive updates from <strong>PERCH Wine &amp; Coffee Bar</strong>. Here's what you can expect:</p>

    <ul style="margin: 20px 0 20px 20px; line-height: 2; color: #444; font-size: 15px;">
      <li>🍷 Curated wine &amp; coffee pairings</li>
      <li>🎉 Exclusive event invitations</li>
      <li>🎁 Special member offers</li>
      <li>📖 Stories from our bar team</li>
    </ul>

    <div class="highlight-box">
      <p><strong>Follow us</strong> on Instagram for daily inspiration: <a href="#" style="color: #8B0000;">@perchwinebar</a></p>
    </div>

    <p style="margin-top: 24px; color: #888; font-style: italic;">Cheers,<br/>The PERCH Team</p>

    <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #bbb; text-align: center;">
      Don't want these emails? <a href="${unsubscribeUrl}" style="color: #8B0000;">Unsubscribe here</a>
    </p>
  `;

  return baseLayout({ title: 'Welcome to PERCH — Newsletter', content });
};

module.exports = { newsletterWelcomeTemplate };
