import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model.ts";

type AuthRequest = Request & {
  user?: unknown;
};

const isuserSigned = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token is required.",
    });
  }

  const jwtSecret = process.env.JWTSECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      message: "JWT secret is not configured",
    });
  }

  try {
    const verify = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!verify) {
      return res.status(401).json({
        message: "token is not valid.",
      });
    }

    const user = await userModel.findOne({ email: verify.email });

    if (!user) {
      return res.status(401).json({
        message: "user not found.",
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      message: "token is not valid.",
    });
  }
};

export default isuserSigned;
