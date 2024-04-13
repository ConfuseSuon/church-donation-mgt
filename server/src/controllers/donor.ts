import { Request, Response } from "express";
import { uid } from "uid";
import Donor from "../models/donor";
import { IDonor } from "../types";
import { GENERIC_MSG } from "../utils/constant";

export const getDonors = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const donorList: IDonor[] = await Donor.find();

    return res
      .status(200)
      .json({ message: GENERIC_MSG.Get_All, data: donorList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const getDonorById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;

    const donor: IDonor | null = await Donor.findById(id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found", data: {} });
    }
    return res
      .status(200)
      .json({ message: GENERIC_MSG.Get_By_Id, data: donor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const addDonor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;

    const donorList: IDonor[] = await Donor.find();

    let donorIdValue: string;
    if (donorList?.length === 0) {
      donorIdValue = "100010";
    } else {
      donorIdValue = (+donorList.slice(-1)[0]?.donorId + 10).toString();
    }

    // validate duplicate email and contact

    const duplicateEmail = donorList.some(
      (donor) => donor.email === body.email
    );
    const duplicateContactNumber = donorList.some(
      (donor) => donor.contactNumber === body.contactNumber
    );

    if (duplicateEmail)
      return res
        .status(409)
        .json({ message: "Duplicate email found", data: {} });

    if (duplicateContactNumber)
      return res
        .status(409)
        .json({ message: "Duplicate contact number found", data: {} });

    // Save Into Database
    const data = new Donor({ ...body, donorId: donorIdValue });

    const addedDonor: IDonor | null = await data.save();

    return res.status(200).json({ message: GENERIC_MSG.Add, data: addedDonor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const updateDonor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const { body } = req;

    const donorList: IDonor[] = await Donor.find();

    // validate duplicate email and contact

    const duplicateEmail = donorList
      .filter((item) => item?._id?.toString() !== id)
      ?.some((donor) => donor.email === body.email);

    const duplicateContactNumber = donorList
      .filter((item) => item?._id?.toString() !== id)
      ?.some((donor) => donor.contactNumber === body.contactNumber);

    if (duplicateEmail)
      return res
        .status(409)
        .json({ message: "Duplicate email found", data: {} });

    if (duplicateContactNumber)
      return res
        .status(409)
        .json({ message: "Duplicate contact number found", data: {} });

    const updatedDonor: IDonor | null = await Donor.findByIdAndUpdate(
      { _id: id },
      body
    );

    if (!updatedDonor)
      return res.status(400).json({ message: "Donor not found", data: {} });

    return res.status(200).json({
      message: GENERIC_MSG.Update,
      data: updatedDonor,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const deleteDonor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const deletedDonor: IDonor | null = await Donor.findByIdAndDelete(id);

    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found", data: {} });
    }
    return res.status(200).json({
      message: GENERIC_MSG.Delete,
      data: deletedDonor,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};
