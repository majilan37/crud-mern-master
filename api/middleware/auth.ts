import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Users from "../models/users";
import { User } from "../types";

type Decoded = { id: string } | string | JwtPayload;

export default async function protectedRoute(
  req: Request & {
    user: User | null;
  },
  res: Response,
  next: NextFunction
) {
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    try {
      // * gettin the token from the header
      token = req.headers.authorization.split(" ")[1];

      // * verifying the token
      const decoded: Decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );

      // * getting user from the decoded token
      req.user = await Users.findById((decoded as { id: string }).id);

      next();
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid token");
      throw new Error("Invalid token");
    }
  }

  if (!token) {
    res.status(401).send("No authorization, token found");
    throw new Error("Invalid token");
  }
}
