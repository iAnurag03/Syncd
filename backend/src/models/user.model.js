import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        default :"https://avatar.iran.liara.run/public/49"
    },
    clerkId:{
        type:String,
        required:true,
        unique:true
    }
},{timeseries:true});

export const User = mongoose.model("User", userSchema)
