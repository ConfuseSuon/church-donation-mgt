import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ message: "Access Denied (token required)" });

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = user;

      next();
    } catch (error) {
      res.status(401).json({ message: "Token expired" });
    }
  }
};
