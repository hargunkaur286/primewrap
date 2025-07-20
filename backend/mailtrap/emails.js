import { sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const TOKEN = process.env.MAILTRAP;
const client = new MailtrapClient({ token: TOKEN });

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "504f3f54-5686-410c-872f-a91e6a07221f",
      template_variables: {
        company_info_name: "PrimeWrap",
        name: name,
      }
    });
    console.log("Welcome email sent successfully", response);
  }
  catch(error){
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
}