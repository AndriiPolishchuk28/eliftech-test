import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventsRouter from "./routes/eventsRouter.js";

dotenv.config();

const { DB_HOST, PORT } = process.env;

const app = express();

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/events", eventsRouter);
// app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
