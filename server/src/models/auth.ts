import mongoose, { Schema } from "mongoose";
import { IAuth } from "../types";

const authSchema: Schema<IAuth> = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },

    imageURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model<IAuth>("Auth", authSchema);

export default Auth;
