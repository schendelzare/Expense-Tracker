const nodemailer = require("nodemailer");

const emailManager = async (email, text, html, subject) => {
  //node mailer
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3fa4395f252ca9",
      pass: "803fb864bf7de3",
    },
  });
   await transport.sendMail({
    to: email,
    from: "info@expensetracker.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
