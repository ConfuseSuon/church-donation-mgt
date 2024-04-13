import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import Auth from "../models/auth";

export const generateJwtToken = (
  jwtData: { id: Types.ObjectId; full_name: string },
  expireTime: string
) => {
  console.log(jwtData, expireTime);
  return jwt.sign(jwtData, process.env.JWT_SECRET as string, {
    expiresIn: expireTime,
  });
};

export const actionByUser = async (id: string) => {
  const actionBy = await Auth.findById(id);
  if (!actionBy) return null;
  return actionBy;
};

export const encryptPassword = async (password: string, saltRounds: number) => {
  return await bcrypt.hash(password, saltRounds);
};

export const decryptPassword = async (
  currentPassword: string,
  dbPassword: string
) => {
  return await bcrypt.compare(currentPassword, dbPassword);
};
