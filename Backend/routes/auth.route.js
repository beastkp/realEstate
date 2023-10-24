import express from 'express';

const router = express.Router();
import {Signup} from '../controllers/auth.controller.js'

router.route('/signup').post(Signup)

export default router;