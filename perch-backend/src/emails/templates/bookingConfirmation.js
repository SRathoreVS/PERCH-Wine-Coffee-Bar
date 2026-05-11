const { baseLayout } = require('./baseLayout');

const bookingConfirmationTemplate = ({ name, confirmationCode, date, time, partySize, type }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const content = `
    <h2>Your Reservation is Confirmed! 🥂</h2>
    <p>Hi ${name}, we're delighted to confirm your reservation at <strong>PERCH Wine &amp; Coffee Bar</strong>.</p>

    <div style="margin: 28px 0; background: #fdf8f0; border-radius: 8px; padding: 24px;">
      <div class="info-row"><span class="info-label">Confirmation #</span><span class="info-value" style="color: #8B0000; font-size:16px;">${confirmationCode}</span></div>
      <div class="info-row"><span class="info-label">Date</span><span class="info-value">${formattedDate}</span></div>
      <div class="info-row"><span class="info-label">Time</span><span class="info-value">${time}</span></div>
      <div class="info-row"><span class="info-label">Party Size</span><span class="info-value">${partySize} ${partySize === 1 ? 'guest' : 'guests'}</span></div>
      <div class="info-row"><span class="info-label">Type</span><span class="info-value">${type.replace(/_/g, ' ')}</span></div>
    </div>

    <p>Please bring this confirmation or your confirmation code to the venue. If you need to modify or cancel your reservation, please contact us at least 24 hours in advance.</p>

    <p style="margin-top: 24px; color: #888; font-style: italic;">We look forward to seeing you,<br/>The PERCH Team</p>
  `;

  return baseLayout({ title: `Booking ${confirmationCode} — PERCH`, content });
};

module.exports = { bookingConfirmationTemplate };
