const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"HealthApp" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

const getVerificationEmailTemplate = (name, verificationUrl, role) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background-color: #f9f9f9; }
        .button { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: white; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 8px; 
          display: inline-block; 
          margin: 20px 0; 
          font-weight: bold;
        }
        .footer { background-color: #333; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 Welcome to HealthApp!</h1>
        </div>
        <div class="content">
          <h2>Hello Dr. ${name}${role === 'doctor' ? ' (Doctor)' : ' (Patient)'}!</h2>
          <p>Thank you for joining our healthcare platform. Please verify your email address to get started:</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          <p>Or copy this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
          <p><strong>This link expires in 24 hours.</strong></p>
          <p>Once verified, you'll have access to your ${role === 'doctor' ? 'doctor dashboard' : 'patient dashboard'}.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 HealthApp. Secure Healthcare Management.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { sendEmail, getVerificationEmailTemplate };