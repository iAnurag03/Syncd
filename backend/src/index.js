import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import { connectDB } from "./lib/db.js";
dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/albums", userRoutes);
app.use("/api/stats", userRoutes);


app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    connectDB();
})