const nodemailer = require('nodemailer');

const sendEmail = async ({ userEmail, subject, text, html }) => {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Optional: verify connection
    transporter.verify((err, success) => {
      if (err) console.log('❌ Error connecting to mail server:', err);
      else console.log('✅ Mail server connected successfully!');
    });

    // 2. Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,    // your email
      to: process.env.EMAIL_USER,      // receive to same inbox
      replyTo: userEmail,              // so you can reply to the sender
      subject,
      text,
      html,
    };

    // 3. Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent: ', info.response);
  } catch (err) {
    console.error('❌ Error sending email: ', err);
    throw err;
  }
};

module.exports = sendEmail;
