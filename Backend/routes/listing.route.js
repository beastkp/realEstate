import express from 'express';
import verifyToken from '../middleware/verifyUser.js';
import { createListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.route('/create').post(verifyToken, createListing);

export default router