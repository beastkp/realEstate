import express from 'express';

const router = express.Router();
import {Signin, Signup, google} from '../controllers/auth.controller.js'

router.route('/signup').post(Signup)
router.route('/signin').post(Signin)
router.route('/google').post(google);

export default router;