import express from "express";

const router = express.Router();
import { Signin, Signup, google,Signout } from "../controllers/auth.controller.js";

router.route("/signup").post(Signup);
router.route("/signin").post(Signin);
router.route("/google").post(google);
router.route('/sign-out').get(Signout);

export default router;
