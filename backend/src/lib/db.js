import mongoose, { mongo } from "mongoose"

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to db ${conn.connection.host}`)
    }catch(error){
         console.log("failed to connect to DB", error)
        process.exit(1);
       
    }
}