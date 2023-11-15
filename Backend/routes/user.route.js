import express from 'express';
import {user,updateUser,deleteUser} from '../controllers/user.controller.js'
import verifyToken from '../middleware/verifyUser.js';
const router = express.Router();


router.route('/').get(user)
router.route('/update/:id').patch(verifyToken, updateUser);
router.route('/delete/:id').delete(verifyToken,deleteUser);

export default router;