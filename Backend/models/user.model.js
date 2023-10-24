<<<<<<< HEAD
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
=======
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
>>>>>>> f8b4b3f (added middleware)
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

<<<<<<< HEAD

const User = mongoose.model('User',userSchema); // the name in model function given should be upper case and singular 
=======
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema); // the name in model function given should be upper case and singular
>>>>>>> f8b4b3f (added middleware)

export default User;
