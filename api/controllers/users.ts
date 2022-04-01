import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/users";
import { User } from "../types";
import bcryptjs from "bcryptjs";
import { Types } from "mongoose";

// register
async function register(req: Request & { user: User | null }, res: Response) {
  const { username, email, password }: Omit<User, "id"> = req.body;

  if (!username || !password || !email) {
    res.status(400).send("Missing username, email or password");
    return;
  }

  //   Check if the user is already existing
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    res.status(400).send("User already exists");
    return;
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
    return;
  }
  res
    .status(201)
    .send({ ...(user._doc as User), token: generateJWT(user._id) });
}

// login
async function login(req: Request & { user: User | null }, res: Response) {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    res.status(400).send("Missing email or password");
    return;
  }

  //   Check if the user is already existing
  const user = await Users.findOne({ email });

  if (!user) {
    res.status(400).send("User does not exist");
    return;
  }

  //   Check if the password is correct
  const isPasswordValid = await bcryptjs.compare(password, user!.password);

  if (!isPasswordValid) {
    res.status(400).send("Invalid password");
    return;
  }

  res
    .status(201)
    .send({ ...(user!._doc as User), token: generateJWT(user!._id) });
}

// get data of the current user
async function getCurrentUser(
  req: Request & { user: User | null },
  res: Response
) {
  const user = await Users.findById(req.user!._id);

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.status(200).send(user);
}

export { register, login, getCurrentUser };

// Generate JWT
function generateJWT(id: Types.ObjectId): string {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
}
