import { Router } from "express";
import bcryptjs from "bcryptjs";
import Users from "../models/users";
import { User } from "../types";

const router: Router = Router();

router.post("/");
