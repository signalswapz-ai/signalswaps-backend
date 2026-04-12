const transporter = require('../config/mail/mail.config');

// Verify connection ONCE when server starts
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ Mail server error:', err);
  } else {
    console.log('✅ Mail server ready');
  }
});

const sendMail = async ({ to, subject, html }) => {
  try {
    console.log('📧 Sending email to:', to);

    const info = await transporter.sendMail({
      from: `"SignalSwaps" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('✅ Email sent:', info.response);
    return info;

  } catch (error) {
    console.error('❌ Email failed:', error);
    throw error;
  }
};

module.exports = { sendMail };