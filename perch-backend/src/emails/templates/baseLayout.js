/**
 * Base Email Layout — used by all templates
 */

const baseLayout = ({ title, content, year = new Date().getFullYear() }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', serif; background: #f5f0eb; color: #1a1a1a; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1a0a00 0%, #2d1500 100%); padding: 40px 40px 30px; text-align: center; }
    .header h1 { color: #D4AF37; font-size: 28px; letter-spacing: 3px; text-transform: uppercase; font-weight: normal; }
    .header p { color: #c9b49a; font-size: 13px; letter-spacing: 2px; margin-top: 6px; text-transform: uppercase; }
    .divider { width: 60px; height: 2px; background: #D4AF37; margin: 16px auto 0; }
    .body { padding: 40px; }
    .body h2 { font-size: 22px; color: #1a0a00; margin-bottom: 16px; font-weight: normal; }
    .body p { font-size: 15px; line-height: 1.8; color: #444; margin-bottom: 14px; }
    .highlight-box { background: #fdf8f0; border-left: 3px solid #D4AF37; padding: 20px 24px; margin: 24px 0; border-radius: 0 6px 6px 0; }
    .highlight-box p { margin: 0; }
    .highlight-box strong { color: #1a0a00; }
    .btn { display: inline-block; padding: 14px 32px; background: #8B0000; color: #fff !important; text-decoration: none; border-radius: 4px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 20px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0ebe3; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #888; }
    .info-value { color: #1a1a1a; font-weight: bold; }
    .footer { background: #1a0a00; padding: 30px 40px; text-align: center; }
    .footer p { color: #a09080; font-size: 12px; line-height: 1.8; }
    .footer a { color: #D4AF37; text-decoration: none; }
    .social-links { margin: 16px 0; }
    .social-links a { color: #D4AF37; text-decoration: none; margin: 0 8px; font-size: 13px; }
    @media (max-width: 600px) {
      .wrapper { margin: 0; border-radius: 0; }
      .body, .header, .footer { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>PERCH</h1>
      <p>Wine &amp; Coffee Bar</p>
      <div class="divider"></div>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <div class="social-links">
        <a href="#">Instagram</a> · <a href="#">Facebook</a> · <a href="#">Yelp</a>
      </div>
      <p>© ${year} PERCH Wine &amp; Coffee Bar. All rights reserved.</p>
      <p style="margin-top:8px;">You're receiving this email because you interacted with us.</p>
    </div>
  </div>
</body>
</html>`;

module.exports = { baseLayout };
