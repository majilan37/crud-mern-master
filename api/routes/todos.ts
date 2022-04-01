import { Router, NextFunction } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos";
import protectedRoute from "../middleware/auth";
import { User } from "../types";

const router: Router = Router();

router.get(
  "/",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  getTodos
);
router.post(
  "/create",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  createTodo
);
router.put(
  "/update/:id",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  updateTodo
);
router.delete(
  "/delete/:id",
  (req: any & { user: User | null }, res, next: NextFunction) =>
    protectedRoute(req, res, next),
  deleteTodo
);

export default router;
