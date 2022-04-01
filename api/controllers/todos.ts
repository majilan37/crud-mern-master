import { Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Todos from "../models/todos";
import { User } from "../types";

const getTodos = expressAsyncHandler(
  async (req: any & { user: User | null }, res: Response): Promise<void> => {
    const todos = await Todos.find({ user: req.user._id });
    res.status(200).send(todos);
  }
);

const createTodo = expressAsyncHandler(
  async (req: any & { user: User | null }, res): Promise<void> => {
    const { text } = req.body;
    const { _id: id } = req.user;

    try {
      if (!text) {
        res.status(400).send("Text is required");
        throw new Error("Text is required");
      }

      await Todos.create({ user: id, text });

      res.send("Todo created");
    } catch (err: any) {
      console.log(err as Error);
      res.status(500).send(err.message);
    }
  }
);

const updateTodo = expressAsyncHandler(async (req, res): Promise<void> => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).send("Text is required");
    throw new Error("Text is required");
  }

  const updatedTodo = await Todos.findByIdAndUpdate(
    id,
    { text },
    { new: true }
  );
  res.send(updatedTodo);
});

const deleteTodo = expressAsyncHandler(async (req, res): Promise<void> => {
  const { id } = req.params;

  const todo = await Todos.findByIdAndDelete(id);
  res.send(todo);
});

export { getTodos, createTodo, updateTodo, deleteTodo };
