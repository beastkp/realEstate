import User from "../models/user.model.js";
import dotenv from "dotenv";
import customError from "../middleware/custom-error.js";
dotenv.config();

export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = user.createJWT();

    const {password:pass,...rest} = usr._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(rest)
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(customError(404, "User not found!"));
    }
    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      res
        .status(401)
        .send({ message: "You are not authorized, wrong credentials " });
    }
    const token = user.createJWT();
    const {password:pass,...rest} = user._doc
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
