const nodemailer = require("nodemailer");

const emailManager = async (email, text, html, subject) => {
  //node mailer
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "19f34e1090d60f",
      pass: "71eaa9cb048aec",
    },
  });
  transport.sendMail({
    to: email,
    from: "info@expensetracker.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
