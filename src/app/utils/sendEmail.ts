import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.author_email,
      pass: config.author_email_password,
    },
  });

  await transporter.sendMail({
    from: config.author_email, // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minutes', // Subject line
    text: 'zero world?', // plain text body
    html, // html body
  });
};
