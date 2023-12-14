import Listing from "../models/listing.model.js";
import { error } from "../middleware/error-handler.js";

export const createListing = async (req, res, next) => {
  try {
    const newlisting = await Listing.create(req.body);
    return res.status(201).json({
      success: "true",
      message: "Listing created successfully",
      data: newlisting,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(error(404, "Listing not found"));
  }
  if (req.user.userId !== listing.userRef) {
    return next(error(401, "You can delete only your listings!"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(error(404, "Listing not found"));
  }
  if (req.user.userId !== listing.userRef) {
    return next(error(401, "You can update only your listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(error(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === false) {
      offer = { $in: [true, false] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [true, false] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [true, false] };
    }

    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['rent', 'sale'] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt"; // any property can be sorted, if nothing is mentioned then sort by createdAt
    const order = req.query.order || "desc";
    // console.log(type);
    const listings = await Listing.find(
        {
      name: { $regex: searchTerm, $options: "i" }, // find anything that matches searchTerm and options i means case insensitive
      offer,
      furnished,
      parking,
      type,
    }
    )
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);
    //   console.log(listings);
      return res.status(200).json(listings)
  } catch (error) {
    next(error);
  }
};
