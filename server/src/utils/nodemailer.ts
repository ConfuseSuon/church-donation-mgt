import nodemailer from "nodemailer";
import path from "path";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const mailSender = async (
  to: any,
  subject: any,
  from: any,
  html: any,
  attachmentPath?: any
) => {
  try {
    const attachments = [
      {
        path: attachmentPath ? attachmentPath : "",
      },
    ];

    const withAttachment = () => {
      const info = transporter.sendMail({
        from,
        to,
        subject,
        html,
        attachments,
      });
      return info;
    };

    const withoutAttachment = () => {
      const info = transporter.sendMail({
        from,
        to,
        subject,
        html,
      });
      return info;
    };

    if (attachmentPath) return withAttachment();
    return withoutAttachment();
  } catch (error) {
    console.error(error);
  }
};

export default mailSender;
