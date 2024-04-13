import { Request, Response } from "express";
import Auth from "../models/auth";
import { IAuth } from "../types";
import { GENERIC_MSG, LOGIN_MSG } from "../utils/constant";
import {
  decryptPassword,
  encryptPassword,
  generateJwtToken,
} from "../utils/help";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { full_name, email, password, address, contactNumber } =
      req.body as Pick<
        IAuth,
        "full_name" | "email" | "password" | "contactNumber" | "address"
      >;

    // Checking User
    const user = await Auth.findOne({ email });
    if (user) return res.status(400).send({ message: LOGIN_MSG.exist });

    // Hashing User Password
    const saltRounds = 10;
    const hashedPassword = await encryptPassword(password, saltRounds);

    // admin email
    const matchedAdminEmail = process.env.ADMIN_EMAIL?.includes(email);

    // Save User Into Database
    const userData = new Auth({
      full_name,
      email,
      password: hashedPassword,
      address,
      contactNumber,
    });

    const savedUserData = await userData.save();

    // Get userData without password
    const userDataWithoutPassword = {
      ...savedUserData.toObject(),
      password: undefined,
    };

    const token = await generateJwtToken(
      { id: savedUserData._id, full_name: savedUserData.full_name },
      "5m"
    );

    return res.status(200).json({
      accessToken: token,
      message: "Sucessfully, user registered",
      data: userDataWithoutPassword,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as Pick<IAuth, "email" | "password">;

    // Checking Existing User
    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    // Decrypt password
    const passwordMatched = await decryptPassword(password, user?.password);

    // Checking Valid User
    if (passwordMatched) {
      const token = await generateJwtToken(
        { id: user._id, full_name: user.full_name },
        "10m"
      );

      // user details excluding password
      (user as any).password = undefined;

      return res
        .status(200)
        .json({ accessToken: token, message: "Login sucessfull!", data: user });
    } else {
      return res.status(401).json({ message: LOGIN_MSG.notValid });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: GENERIC_MSG.Server_Error, error: error });
  }
};
