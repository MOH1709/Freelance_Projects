import nodemailer from "nodemailer";
import smtpTransport from 'nodemailer-smtp-transport';

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_EMAIL_PASS
  }
}));

export function sendMail(options = {}) {
  var mailOptions = {
    from: process.env.USER_EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

