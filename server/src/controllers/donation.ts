import { Request, Response } from "express";
import Donor from "../models/donor";
import Donation from "../models/dontation";
import { IDonation } from "../types";
import { GENERIC_MSG } from "../utils/constant";

export const getDonations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const donationList: IDonation[] = await Donation.find();
    return res
      .status(200)
      .json({ message: GENERIC_MSG.Get_All, data: donationList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const getDonationById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;

    const donation: IDonation | null = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found", data: {} });
    }
    return res
      .status(200)
      .json({ message: GENERIC_MSG.Get_By_Id, data: donation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const addDonation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;

    if (!body?.donorId)
      return res.status(400).json({ message: "Donor id required", data: {} });

    // find donor
    const donorDetails: IDonation | null = await Donor.findOne({
      donorId: body?.donorId,
    });
    if (!donorDetails)
      return res.status(404).json({ message: "Donor not found", data: {} });

    const donationList: IDonation[] = await Donation.find();

    let donationIdValue: string;
    if (donationList?.length === 0) {
      donationIdValue = "700010";
    } else {
      donationIdValue = (
        +donationList.slice(-1)[0]?.donationId + 10
      ).toString();
    }

    // validate duplicate transaction ID

    if (body?.transactionId) {
      console.log("i run");
      const duplicateTransactionId = donationList.some(
        (donation) => donation.transactionId === body.transactionId
      );
      if (duplicateTransactionId)
        return res
          .status(409)
          .json({ message: "Duplicate transaction id found", data: {} });
    }

    // Save Into Database
    const data = new Donation({
      ...body,
      donationId: donationIdValue,
      donorDetails,
    });

    const addedDonation: IDonation | null = await data.save();

    return res
      .status(200)
      .json({ message: GENERIC_MSG.Add, data: addedDonation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const updateDonation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const { body } = req;

    const donationList: IDonation[] = await Donation.find();

    // validate duplicate transactionID

    if (body?.transactionId) {
      const duplicateTransactionId = donationList
        .filter((item) => item?._id?.toString() !== id)
        .some((donation) => donation.transactionId === body.transactionId);
      if (duplicateTransactionId)
        return res
          .status(409)
          .json({ message: "Duplicate transaction id found", data: {} });
    }

    const updatedDonation: IDonation | null = await Donation.findByIdAndUpdate(
      { _id: id },
      body
    );

    if (!updatedDonation)
      return res.status(400).json({ message: "Donation not found", data: {} });

    return res.status(200).json({
      message: GENERIC_MSG.Update,
      data: updatedDonation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const deleteDonation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const deletedDonation: IDonation | null = await Donation.findByIdAndDelete(
      id
    );

    if (!deletedDonation) {
      return res.status(404).json({ message: "Donation not found", data: {} });
    }
    return res.status(200).json({
      message: GENERIC_MSG.Delete,
      data: deletedDonation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};
