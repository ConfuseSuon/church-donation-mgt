import mongoose, { Schema } from "mongoose";
import { IDonation } from "../types";

const donationSchema: Schema<IDonation> = new mongoose.Schema(
  {
    donationId: {
      type: String,
      required: true,
      unique: true,
    },
    donorId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: false,
    },
    mode: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    donationDate: {
      type: String,
      required: true,
    },
    donorDetails: {
      type: Object,
    },
    donationType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model<IDonation>("Donation", donationSchema);

export default Donation;
