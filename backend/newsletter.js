// import nodeMailer from "nodemailer";
// import { config } from "dotenv";
// config();
// const transporter = nodeMailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });

// export const sendNewsletter = (email, subject, content) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: subject,
//         html: content,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error(error);
//         } else {
//             console.log('Newsletter sent: ' + info.response);
//         }
//     });
// };

import nodeMailer from "nodemailer";
import { config } from "dotenv";
config();

export const sendNewsletter = async (email, subject, content) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Newsletter sent:", info.response);
  } catch (error) {
    console.error("❌ Failed to send newsletter:", error);
  }
};


