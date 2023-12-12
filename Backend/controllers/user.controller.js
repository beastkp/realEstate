import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { error } from "../middleware/error-handler.js";
import Listing from '../models/listing.model.js'

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
    res.status(200).json( rest );
  } catch (err) {
    console.log(err);
    next(error(401, "There was a error"));
  }
};

export const deleteUser = async (req,res,next)=>{
  if(req.user.userId !== req.params.id){
    return next(error(401,'You can only delete your own account'));
  }
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token')
    res.status(200).json(deleted)
  } catch (err) {
    next(err);
  }
}

export const getUserListings = async(req,res,next)=>{
  if(req.user.userId === req.params.id){
    try {
      const listings = await Listing.find({userRef:req.params.id})
      res.status(200).json(listings);
    } catch (error) {
      next(error)
    }
  }else{
    return next(error(401,'You can only view your own listings'));
  }
}

export const getUser = async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
     if(!user){
      return next(error(404,'User not found'));
     }
     const {password:pass,...rest} = user._doc;
     res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
