import express from 'express';

const router = express.Router();
// const {user} = require('../controllers/user.controller.js')
import {user} from '../controllers/user.controller.js'

router.route('/').get(user)

export default router;