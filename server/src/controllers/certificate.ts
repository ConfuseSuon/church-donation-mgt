import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import mailSender from "../utils/nodemailer";

// export const emailCertificate = async (req: Request, res: Response) => {
//   try {
//     const fileName = req.file?.filename;
//     const fileUrl = `${process.env.BASE_URL}/upload/image/${fileName}`;

//     const to = "sonupun500@gmail.com";
//     const subject = "Church -- Certificate";
//     const from = "churchdonation@gmail.com";
//     const html = `Keep certificate`;

//     console.log(fileName);

//     const mailData = await mailSender(to, subject, from, html);

//     return res.status(200).json({
//       message: "File uploaded sucessfully !",
//       data: { fileUrl },
//       mailData,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Error!", error });
//   }
// };

export const emailCertificate = async (req: Request, res: Response) => {
  try {
    const imageData = req.body.imageData;

    if (!imageData) {
      return res.status(400).json({ message: "Missing image data" });
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
      const to = "sonupun500@gmail.com";
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
