import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos";

const router = express.Router();

router.get("/", getTodos);
router.post("/create", createTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
