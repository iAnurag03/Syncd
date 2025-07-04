import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true

    },
    clerkId:{
        type:String,
        required:true,
        unique:true
    }
},{timeseries:true});

export const User = mongoose.model("User", userSchema)
