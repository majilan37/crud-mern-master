import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todosRoutes from "./routes/todos";
import dotenv from "dotenv";

// app config
const app: Application = express();
const PORT = process.env.PORT;
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

app.use("/api/todos", todosRoutes);

// Db config
mongoose.connect(process.env.MONGO_URI as string, () =>
  console.log("Connected to DB")
);

// listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
