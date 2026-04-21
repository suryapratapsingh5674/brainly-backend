import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import userModel from "../models/user.model.ts";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(401).json({
      message: "username, email, password have to be there",
    });
  }

  const jwtSecret = process.env.JWTSECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      message: "JWT secret is not configured",
    });
  }

  const hassedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign({ email, username }, jwtSecret, {
    expiresIn: "7d",
  });

  const user = await userModel.create({
    username,
    email,
    password: hassedPassword,
  });

  res.cookie("token", token, { httpOnly: true });
  return res.status(200).json({
    message: "user register successfullly",
    user,
  });
};

const loginUser = async (req: Request, res: Response)=>{
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(401).json({
      message: "email and password is required"
    })
  }

  const user = await userModel.findOne({email}).select("+password");

  if(!user){
    return res.status(401).json({
      message: "can't find user"
    })
  }

  const ispassword = await bcrypt.compare(password, user.password);

  if(!ispassword){
    return res.status(401).json({
      message:"password is incorrect"
    })
  }

  const jwtSecret = process.env.JWTSECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      message: "JWT secret is not configured",
    });
  }

  const token = await jwt.sign({email}, jwtSecret, {expiresIn: "7d"});

  res.cookie("token", token, {httpOnly:true});
  res.status(200).json({
    message:"signin successfully."
  })
}

const logoutUser = (req: Request, res: Response)=>{
  res.clearCookie("token");
  res.status(200).json({
    message:"logout successfully"
  })
}

const signedIn = (req: Request, res: Response)=>{

  // @ts-ignore
  const user = req.user;

   res.status(200).json({
    user
   })
}

export { registerUser, loginUser, logoutUser, signedIn };
