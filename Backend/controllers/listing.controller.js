import Listing from "../models/listing.model.js";

export const createListing = async(req,res,next)=>{
    try {
        const newlisting = await Listing.create(req.body);
        return res.status(201).json({success:'true',message:'Listing created successfully',data:newlisting});
    } catch (error) {
        next(error);
    }
}