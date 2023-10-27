import express from 'express';

const router = express.Router();
import {Signin, Signup} from '../controllers/auth.controller.js'

router.route('/signup').post(Signup)
router.route('/signin').post(Signin)

export default router;