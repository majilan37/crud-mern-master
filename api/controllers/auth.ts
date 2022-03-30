import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/users";
import { User } from "../types";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

// register
async function register(req: Request & { user: User | null }, res: Response) {
  const { username, email, password }: Omit<User, "id"> = req.body;

  if (!username || !password || !email) {
    res.status(400).send("Missing username, email or password");
    throw new Error("Missing username, email or password");
  }

  //   Check if the user is already existing
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    res.status(400).send("User already exists");
    throw new Error("User already exists");
  }

  //  Hash the password
  const slat = bcryptjs.genSaltSync(10);
  const hashedPassword = await bcryptjs.hash(password, slat);

  //   Create the user
  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!user) {
    res.status(500).send("Cannot create user");
    throw new Error("User not created");
  }
  res.send({ ...user, token: generateJWT(user._id) });
}

// Generate JWT
function generateJWT(id: mongoose.Types.ObjectId): string {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
}
