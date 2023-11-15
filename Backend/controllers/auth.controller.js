import User from "../models/user.model.js";
import dotenv from "dotenv";
import customError from "../middleware/custom-error.js";
dotenv.config();

export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = user.createJWT();

    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(rest);
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
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // same as signin
      const token = user.createJWT();
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .json(rest);
    } else {
      // we have put the required password as true but when signing up with google you dont need passwrd, so we create a random password
      const generatedPassword = Math.random().toString(36).slice(-8);
      const createUser = await User.create({
        username: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: generatedPassword,
        avatar:req.body.photo
      });
      const token = createUser.createJWT();

      const { password: pass, ...rest } = createUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


export const Signout = async(req,res,next)=>{
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been Logged out');
  } catch (err) {
    next(err);
  }
}