import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const token = (id)=>{
  return jwt.sign(id,process.env.JWT_SECRET,{
    expiresIn:'60d'
  });
}

export const Signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).send({ message: "Successfull",user:user });
    
  } catch (error) {
    next(error);
  }
};


