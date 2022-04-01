import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todosRoutes from "./routes/todos";
import usersRoutes from "./routes/users";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// app config
const app: Application = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to the API");
// });

app.use("/api/todos", todosRoutes);
app.use("/api/users", usersRoutes);

// Db config
mongoose.connect(process.env.MONGO_URI as string, () =>
  console.log("Connected to DB")
);

// server frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send('Please run "npm run build" to build the frontend');
  });
}

// listener
app.listen(PORT as string, () => console.log(`Server started on port ${PORT}`));
