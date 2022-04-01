import { NextFunction, Router } from "express";
import { User } from "../types";
import { getCurrentUser, login, register } from "../controllers/users";
import protectedRoute from "../middleware/auth";

const router: Router = Router();

router.post("/register", (req: any & { user: User | null }, res) =>
  register(req, res)
);
router.post("/login", (req: any & { user: User | null }, res) =>
  login(req, res)
);
router.get(
  "/getMe",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  (req: any & { user: User | null }, res) => getCurrentUser(req, res)
);

export default router;
