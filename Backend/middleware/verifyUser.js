import jwt from "jsonwebtoken";
// import error from "./middleware/error-handler.js";
import dotenv from "dotenv";
import {error} from "./error-handler.js";
dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token; // here access_token is the name of the ccookie
  if (!token) return next(error(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(error(403,'Forbidden'));
    }
    req.user = user; // the information from the token (including the ID is then transfered to req.user)
    next();
  });

  // const result = await jwt.verify(token, process.env.JWT_SECRET);
  // console.log(result);
  // if(!result){
  //   console.log("There is an error");
  // }
  // req.user = {userId:result.userId}
  // console.log(req.user);
  // next()
};

export default verifyToken;