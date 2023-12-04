import Listing from "../models/listing.model.js";
import { error } from "../middleware/error-handler.js";

export const createListing = async(req,res,next)=>{
    try {
        const newlisting = await Listing.create(req.body);
        return res.status(201).json({success:'true',message:'Listing created successfully',data:newlisting});
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(error(404,'Listing not found'));
    }
    if(req.user.userId!==listing.userRef){
        return next(error(401,'You can delete only your listings!'))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Deleted Successfully",success:true})
    } catch (error) {
        next(error)
    }
}

export const updateListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(error(404,'Listing not found'));
    }
    if(req.user.userId !== listing.userRef){
        return next(error(401,'You can update only your listings!'))
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async (req,res,next)=>{
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return next(error(404,'Listing not found'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}