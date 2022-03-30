import mongoose from "mongoose";

interface Todo {
  text: string;
}

const todoSchema = new mongoose.Schema<Todo>({
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Todo>("Todo", todoSchema);
