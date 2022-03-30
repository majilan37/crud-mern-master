import mongoose from "mongoose";
import { Todo } from "../types";

const todoSchema = new mongoose.Schema<Todo>(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Todo>("Todo", todoSchema);
