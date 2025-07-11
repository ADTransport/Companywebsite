//this is for sending emails for important files PLEASE DO NOT MESS WITH OR DELETE!!!!


// netlify/functions/send-email.js
const fetch = require("node-fetch"); // Use this for making API requests (e.g., to EmailJS)

exports.handler = async function(event, context) {
  const { email, message, fileUpload } = JSON.parse(event.body);

  // Your EmailJS Service ID, Template ID, and User ID
  const serviceId = 'your_service_id';
  const templateId = 'your_template_id';
  const userId = 'your_user_id'; // EmailJS user ID

  const data = {
    email: email,
    message: message,
    fileUpload: fileUpload, // You can customize this for attachments (if needed)
  };

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: data,
    }),
  });

  if (res.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'Failed to send email' }),
  };
};
