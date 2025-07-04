import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { connectDB } from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express"
import fileUpload from "express-fileupload"
import path from "path"

dotenv.config()

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();


app.use(express.json());
app.use(clerkMiddleware()) //add an auth field to req obj(auth has fields like userId)
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname,"tmp"),
    createParentPath:true,
    limits:{
        fileSize : 10*1024*1024
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/albums", userRoutes);
app.use("/api/stats", userRoutes);

app.use((err,req,res,next)=>{
    res.status(500).json({message : process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message})
})


app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    connectDB();
})