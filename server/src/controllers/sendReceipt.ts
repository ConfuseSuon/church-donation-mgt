import { Request, Response } from "express";
import { GENERIC_MSG } from "../utils/constant";
import mailSender from "../utils/nodemailer";

export const sendReceipt = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;

    const to = body?.email;
    const subject = "Church Donation Receipt";
    const from = "churchdonation@gmail.com";
    const html = `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 50px auto; padding: 30px; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #fc8e3c; font-size: 24px; margin-bottom: 5px;">Thank You for Your Donation!</h2>
            <p style="color: #333; font-size: 16px;">Your generosity makes a real difference.</p>
        </div>
        <div style="line-height: 1.5; margin-bottom: 15px;">
            <p>Dear ${body?.full_name},</p>
            <p>We are incredibly grateful for your recent donation. Your support will help us continue to serve our community.</p>
            <p>Thanks to the kindness of people like you, we can continue to fulfill our mission.</p>
            <table style="width: 100%; margin-bottom: 20px;">
                <tr>
                    <td style="font-weight: bold; width: 50%;">Donation Amount:</td>
                    <td>${body?.amount}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Donation Date:</td>
                    <td>${body?.donationDate}</td>
                </tr>
            </table>
            <p>We understand that giving back to the community is a personal choice, and we are truly honored by your decision to support our church. Your compassion and generosity inspire us all.</p>
            <p>May God bless you abundantly.</p>
        </div>
        <div style="text-align: right;">
            <p style="margin-top: 20px;">Sincerely,</p>
            <p>Sanchtech</p>
            <p>Church Donation Management</p>
        </div>
    </div>
</div>`;

    const htmls = `  <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 50px auto; padding: 30px; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #fc8e3c; font-size: 24px; margin-bottom: 5px;">Donation Receipt</h2>
            <p style="color: #333; font-size: 16px;">Thank you for your generosity!</p>
        </div>
        <div style="line-height: 1.5; margin-bottom: 15px;">
            <p>Dear ${body?.full_name},</p>
            <p>We at [Church Name] are incredibly grateful for your recent donation. Your support will help us continue to serve our community.</p>
            <p>Thanks to the kindness of people like you, we can continue to fulfill our mission.</p>
            <div style="width: 100%; margin-bottom: 20px;">
                <div style="display: inline-block; width: 50%; font-weight: bold;">Donation Amount:</div>
                <div style="display: inline-block;">${body?.amount}</div>
            </div>
            <div style="width: 100%; margin-bottom: 20px;">
                <div style="display: inline-block; width: 50%; font-weight: bold;">Donation Date:</div>
                <div style="display: inline-block;">${body?.donationDate}</div>
            </div>
            <p>We understand that giving back to the community is a personal choice, and we are truly honored by your decision to support our church. Your compassion and generosity inspire us all.</p>
            <p>May God bless you abundantly.</p>
        </div>
        <div style="text-align: right;">
            <p style="margin-top: 20px;">Sincerely,</p>
            <p>[Your Name/Title]</p>
            <p>[Church Name]</p>
        </div>
    </div>
</div>
`;

    const mailData = await mailSender(to, subject, from, html);
    return res
      .status(200)
      .json({ message: "Receipt send sucessfully", mailData });
  } catch (error) {
    return res.status(500).json({ message: GENERIC_MSG.Server_Error, error });
  }
};
