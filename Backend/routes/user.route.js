import express from 'express';
import {user,updateUser,deleteUser,getUserListings,getUser} from '../controllers/user.controller.js'
import verifyToken from '../middleware/verifyUser.js';
const router = express.Router();


router.route('/').get(user)
router.route('/update/:id').patch(verifyToken, updateUser);
router.route('/delete/:id').delete(verifyToken,deleteUser);
router.route('/listings/:id').get(verifyToken,getUserListings);
router.route('/:id',verifyToken).get(getUser);

export default router;