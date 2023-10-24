import express from 'express';

import User from '../models/user.model.js';

export const user = (req,res)=>{
    res.json({message:"This is the controller"});
}

