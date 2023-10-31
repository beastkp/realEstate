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
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9eGFYCivWxzsYyDDOqgBlsgZr5IC5KgKkQ",
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

userSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = bcrypt.compare(candidatePassword,this.password);
  return isMatch;
}

const User = mongoose.model("User", userSchema); // the name in model function given should be upper case and singular

export default User;
