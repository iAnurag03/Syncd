import {Server, Socket} from "socket.io"
import { Message } from "../models/message.model.js"
import { modelNames } from "mongoose"

export const initializeSocket=(server)=>{
    const io = new Server(server,
        {
            cors:{
                origin:"http://localhost:5173",
                credentials:true
            }
        }
    )
    const userSockets = new Map();   //userId : scoketID
    const userActivities = new Map(); //userId : activity

    

    io.on("connection", (socket)=>{     
         //socket.on is used for listening events(for both server and client)
        socket.on("user_connected", (userId)=>{   
            userSockets.set(userId, socket.id)
            userActivities.set(userId, "Idle")
             //broadcast to other sockets that this user just logged in
            io.emit("user_connected", userId)

            socket.emit("users_online",Array.from(userSockets.keys()))
            io.emit("activities", Array.from(userActivities.entries()))
        })

        socket.on("update_activity",({userId,activity})=>{
            userActivities.set(userId, activity);
            io.emit("activity_updated", {userId, activity})
        })

        socket.on("send_message", async (data)=>{
            try{
                const {senderId, receiverId, content} = data;

                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                })

                //if the reciever is active,(online), send them the message in realtime
                
                const recieverSocketId =  userSockets.get(receiverId);
                if(recieverSocketId){
                    io.to(recieverSocketId).emit("receive_message", message)
                }

                socket.emit("message_sent", message)
            }catch(error){
                console.log("Message error:", error)
                socket.emit("message_error", error.message)
            }
        })

        socket.on("disconnect",()=>{
            let disconnectedUserId;

            for(const [userId, scoketID] of userSockets.entries()){
                if(scoketID === socket.id){
                    disconnectedUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if(disconnectedUserId){
                io.emit("user_disconnected", disconnectedUserId)
            }
        })
    });
}