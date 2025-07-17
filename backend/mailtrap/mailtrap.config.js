// // const { MailtrapClient } = require("mailtrap");
// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv"

// dotenv.config({ path: "../../.env" })

// const TOKEN = process.env.MAILTRAP;

// const client = new MailtrapClient({
//   token: TOKEN,
// });

// export const sender = {
//   email: "hello@demomailtrap.co",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "hargunkaur2863@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);


import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config(); // Make sure .env is in root

const client = new MailtrapClient({ token: process.env.MAILTRAP });

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

const recipients = [{ email: "hargunkaur2863@gmail.com" }];

client
  .send({
    from: sender,
    to: recipients,
    subject: "Test Email",
    text: "Mailtrap test successful.",
    category: "Integration Test",
  })
  .then(console.log)
  .catch((err) => {
    console.error("Failed:", err.response?.data || err.message);
  });
