const nodemailer = require("nodemailer");


async function sendEmail(email, pass, subj) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'carriers.admn@gmail.com', 
      pass: 'kuty@iscool1488', 
    },
  });

  //text 
  let html = "<br>Ваш email для входу: " + email + "<br>Ваш пароль для входу: " + pass

  // send mail 
  let info = await transporter.sendMail({
    from: 'carriers.admn@gmail.com', // sender address
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