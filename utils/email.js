const nodemailer = require("nodemailer");
const sendEmail = async options => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

    const emailOptions = {
        from : 'Francisco Repillosa me@fr.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(emailOptions);
}

module.exports = sendEmail;

