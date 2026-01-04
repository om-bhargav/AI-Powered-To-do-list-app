import type { Request, Response } from "express";
import { prisma } from "../db/db.js";
import {
  hashPassword,
  comparePassword,
} from "../handlers/password-handlers.js";
import jwt from "jsonwebtoken";
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const data = await prisma.user.findFirst({
    where: { email: email },
  });
  if (data && (await comparePassword(password, data.password))) {
    const token = jwt.sign({ _id: data.id ,name:data.name,email:data.email}, process.env.JWT_SECRET as string, {
      expiresIn: "3h",
    });
    return res.status(200).json({
      success: true,
      message: "User Login Successful",
      token: token,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Entered Credentials are Invalid",
    });
  }
}

export async function signup(req: Request, res: Response) {
  const { name, email, password,cpass } = req.body;
  if(password.trim()==="" || password!==cpass){
    return res.status(400).json({
      success: false,
      message: "Passwords don't Match!",
    });    
  }
  const pass = await hashPassword(password);
  const exist = await prisma.user.findFirst({ where: { email: email } });
  if (exist) {
    return res.status(404).json({
      success: false,
      message: "Email Already Exists",
    });
  }
  await prisma.user.create({
    data: {
      name: name,
      password: pass,
      email: email,
    },
  });
  return res.status(200).json({
    success: true,
    message: "Account Created Successfully!",
  });
}
