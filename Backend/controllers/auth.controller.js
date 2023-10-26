import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const Signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = user.createJWT();

    res.status(201).send({ message: "Successfull",user:user,token });
    
  } catch (error) {
    next(error);
    console.log(error);
  }
};


