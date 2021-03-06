const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(email, pass, subj) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS, 
    },
  });

  //text 
  let html = "<br>Ваш email для входу: " + email + "<br>Ваш пароль для входу: " + pass

  // send mail 
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // sender address
      to: email, // receiver
      subject: subj, // Subject line
      html: html, // html body
    });

  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = { sendEmail }