import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true],
      unique: [true],
    },
    email: {
      type: String,
      required: [true],
      unique: [true],
    },
    password: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_LIFETIME
  });
}

const User = mongoose.model("User", userSchema); // the name in model function given should be upper case and singular

export default User;
