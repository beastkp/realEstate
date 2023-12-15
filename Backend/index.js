import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
import path from 'path';
dotenv.config();

import {error} from "./middleware/error-handler.js";



mongoose
.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB!");
})
.catch((err) => {
  console.log(err);
});

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://bigcity-realestate.onrender.com",
    credentials: true,
    //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(cookieParser()); // used to get information from the cookie

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));

//  if you get any endpoint apart from the above mentioned endpoints
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')); 
})

app.use(error);
