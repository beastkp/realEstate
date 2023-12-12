import express from "express";
import verifyToken from "../middleware/verifyUser.js";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.route("/create").post(verifyToken, createListing);
router.route("/delete/:id").delete(verifyToken, deleteListing);
router.route("/update/:id").patch(verifyToken, updateListing);
router.route("/get/:id").get(getListing);
router.route("/get").get(getListings);

export default router;
