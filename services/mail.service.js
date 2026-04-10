const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail/mail.config');

const transporter = nodemailer.createTransport(mailConfig);

// Verify connection (optional but useful)
transporter.verify((err, success) => {
  if (err) {
    console.error('Mail server error:', err);
  } else {
    console.log('Mail server ready');
  }
});

const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail };