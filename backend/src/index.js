import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import albumRoutes from "./routes/album.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import songRoutes from "./routes/song.routes.js"
import statsRoutes from "./routes/stats.routes.js"
import { connectDB } from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express"
import fileUpload from "express-fileupload"
import path from "path"
import cors from "cors"
import { createServer } from "http"
import { initializeSocket } from "./lib/socket.js"
import fs from "fs"
import cron from "node-cron"


dotenv.config()

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
    origin: process.env.NODE_ENV === "development" 
        ? "http://localhost:5173"
        :true,
    credentials: true
}));

const httpServer = createServer(app);
initializeSocket(httpServer)

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

const tempDir = path.join(process.cwd(),"tmp")

cron.schedule("0 0 * * *",()=>{
    if(fs.existsSync(tempDir)){
       fs.readdir(tempDir,(err,files)=>{
        if(err){
            console.log("error",err);
            return;

        }
        for(const file of files){
            fs.unlink(path.join(tempDir,file),(err)=>{})
        }
       })
    }
})

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats",statsRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend", "dist", "index.html"));
    })
}


app.use((err,req,res,next)=>{
    res.status(500).json({message : process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message})
})


httpServer.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    connectDB()
})

