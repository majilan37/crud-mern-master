import mongoose from "mongoose";
import { Todo } from "../types";

const todoSchema = new mongoose.Schema<Todo>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
