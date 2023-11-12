import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

import {error} from "./middleware/error-handler.js";
import customError from "./middleware/custom-error.js";
// import verifyToken from "./middleware/verifyUser.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser()); // used to get information from the cookie

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.use(error);
// app.use(customError);
