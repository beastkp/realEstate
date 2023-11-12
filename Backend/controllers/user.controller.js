import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { error } from "../middleware/error-handler.js";

export const user = (req, res) => {
  res.json({ message: "This is the controller" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.userId != req.params.id) {
    return next(error(401, "Not Authorized to access this "));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ); // you have to set this so that the changes are updated in the database

    if (!updatedUser) {
      return next(error(401, "Not Authorized to access this "));
    }

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json({ message: "User has been updated", user: rest });
  } catch (err) {
    console.log(err);
    next(error(401, "There was a error"));
  }
};
