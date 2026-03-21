import nodeMailer from "nodemailer";

export const sendEmail = async ({email, subject, message}) => {
    const from = String(process.env.SMTP_MAIL || "").trim();
    const pass = String(process.env.SMTP_PASSWORD || "").trim();
    const host = String(process.env.SMTP_HOST || "").trim();
    const service = String(process.env.SMTP_SERVICE || "").trim();
    const port = Number(String(process.env.SMTP_PORT || "").trim() || 0) || undefined;

    const transporter = nodeMailer.createTransport({
        host,
        service,
        port,
        secure: port === 465,
        auth: {
            user: from,
            pass,
        },
    });

    const options = {
        from,
        to: email,
        subject,
        html: message
    };
    await transporter.sendMail(options);
};