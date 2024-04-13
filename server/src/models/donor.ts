import mongoose, { Schema } from "mongoose";
import { IDonor } from "../types";

const donorSchema: Schema<IDonor> = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    donorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model<IDonor>("Donor", donorSchema);

export default Donor;
