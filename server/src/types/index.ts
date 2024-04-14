import { Document } from "mongoose";

export interface IAuth extends Document {
  full_name: string;
  email: string;
  currentPassword?: string;
  password: string;
  address?: string;
  contactNumber?: number;
  imageURL?: string;
}

export interface IDonor extends Document {
  donorId: string;
  full_name: string;
  email: string;
  contactNumber?: string;
  address?: string;
}

export interface IDonation extends Document {
  donationId: string;
  donorId: string;
  amount: string;
  mode: string;
  transactionId?: string;
  note?: string;
  donationDate: string;
  donorDetails?: object;
  donationType: string;
}
