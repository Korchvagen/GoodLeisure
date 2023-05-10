import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOD_LEISURE_EMAIL,
    pass: process.env.GOOD_LEISURE_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

export function sendConfirmationCode(email, code) {
  try {
    const mailOptions = {
      from: process.env.GOOD_LEISURE_EMAIL,
      to: email,
      subject: 'Код подтверждения',
      text: `Ваш код подтверждения: ${code}`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return false;
      }
    });
    
    return true;
  } catch (err) {
    return false;
  }
}