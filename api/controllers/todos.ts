import expressAsyncHandler from "express-async-handler";
import Todos from "../models/todos";

const getTodos = expressAsyncHandler(async (req, res): Promise<void> => {
  const todos = await Todos.find();
  res.status(200).send(todos);
});

const createTodo = expressAsyncHandler(async (req, res): Promise<void> => {
  const { text } = req.body;

  try {
    if (!text) {
      res.status(400).send("Text is required");
      throw new Error("Text is required");
    }

    const todo = await Todos.create({ text });

    res.send(todo);
  } catch (err: any) {
    console.log(err as Error);
    res.status(500).send(err.message);
  }
});

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
