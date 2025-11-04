
const itemModel = require('../models/contact.cjs');
const sendEmail = require('../utils/sendmail.cjs');

const fillCon = async (req, res) => {
  try {
    console.log("✅ Request Body:", req.body);

    // Destructure the data
    const { name, email, phone, services, comment } = req.body; 

    // Save to database
    const newCon = new itemModel({ name, email, phone, services, comment });
    await newCon.save();
    console.log("✅ Saved to MongoDB:", newCon._id);

    // --- 1. Notification Email to You (The Admin/Sales Team) ---
    // This email tells your sales team that a new form has been submitted.
    const subjectAdmin = 'New Contact Form Submission Received';
    const htmlAdmin = `
      <h3>New Contact Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services}</p>
      <p><strong>Comment:</strong> ${comment || 'N/A'}</p>
    `;

    // **CHANGE MADE HERE:** Sending the notification to the desired sales email.
    await sendEmail({
      to: 'sales@windowinnovationz.com', // <-- YOUR SALES EMAIL
      subject: subjectAdmin,
      text: `New contact form submission from ${name}`,
      html: htmlAdmin,
    });
    console.log("✅ Notification Email sent to Sales Team!");

    // --- 2. Confirmation Email to the Client (Form Submitter) ---
    // This email confirms receipt to the person who filled out the form.
    const subjectClient = 'Thank You for Contacting Us!';
    const htmlClient = `
        <h3>Dear ${name},</h3>
        <p>Thank you for submitting your contact form. We have successfully received your inquiry and will get back to you shortly.</p>
        <p>Here is a summary of the information you provided:</p>
        <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Services Requested:</strong> ${Array.isArray(services) ? services.join(', ') : services}</li>
            <li><strong>Your Comment:</strong> ${comment || 'N/A'}</li>
        </ul>
        <p>Best Regards,</p>
        <p>The Window Innovationz Team</p>
    `;

    // Sending the confirmation to the client's submitted email.
    await sendEmail({
      to: email, // <-- Client's Email Address
      subject: subjectClient,
      text: `Thank you, ${name}. We received your contact form.`,
      html: htmlClient,
    });
    console.log("✅ Confirmation Email sent to Client!");
    
    // Send success response
    res.status(200).json({
      message: 'Form submitted, and both notification and confirmation emails sent successfully!',
      success: true,
      data: newCon,
    });

  } catch (err) {
    console.error("❌ Controller Error:", err);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: err.message,
    });
  }
};

module.exports = fillCon;