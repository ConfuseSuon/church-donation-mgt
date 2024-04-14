import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import mailSender from "../utils/nodemailer";

export const emailCertificate = async (req: Request, res: Response) => {
  try {
    const imageData = req.body.imageData;
    const email = req.body.email;

    console.log(email);

    if (!imageData || !email) {
      return res.status(400).json({ message: "Missing image or email data" });
    }

    // Decode base64 data and convert to buffer
    const buffer = Buffer.from(
      imageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const filename = Date.now() + ".png";
    const filePath = path.join("uploads/", filename);

    // Save the image to the uploads directory
    fs.writeFile(filePath, buffer, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving image", err });
      }
      const to = email;
      const subject = "Church -- Certificate";
      const from = "churchdonation@gmail.com";
      const html = `Keep certificate`;
      const attachmentPath = filePath;

      const mailData = await mailSender(
        to,
        subject,
        from,
        html,
        attachmentPath
      );

      res.json({ message: "Certificate send!", filename, mailData });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error!", error });
  }
};
