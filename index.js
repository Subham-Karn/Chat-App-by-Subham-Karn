require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const cors = require("cors");
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const Message = require("./schemas/Message")
const channelRoutes = require("./routes/channelRoutes");
const PORT = process.env.PORT || 4000;

//Mongo Db Config
const mongoUrl = process.env.mongoUrl;
mongoose.connect(mongoUrl).then(()=>{
    console.log("MongoDb is Connected!")
}).catch(()=>{
    console.log("MongoDb is Nott Connected!");
})


//middlewares
app.use(cors());
app.use(express.json());
app.use("/auth" , authRoutes);
app.use("/channel",channelRoutes);

// Socket Server
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods:["POST","GET"],
        credentials: true
    }
});

// SOCKET + AUTH
io.use((client , next)=>{
    let token = client.handshake?.auth?.token;
    if (!token) {
    const authHeader = client.handshake?.headers?.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    console.warn("Socket auth failed: token not provided (socket id:", client.id, ")");
    return next(new Error("Auth error: token missing"));
  }
    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        client.userId = payload.id;
        next();
    } catch (error) {
        console.error(error);
    }
});

// Socket Connection
io.on("connection" , (client)=>{
    console.log("User Connected!: ", client.id);
    // Socket Join Channel
    client.on("join-channel" , async ({channelId})=>{
        client.join(channelId);
        const message = await Message.find(channelId)
        .sort({ createdAt: 1 })
        .limit(100);
        client.emit("channel-message" , message)
    });
    // Send Message by Socket
    client.on("send-message", async ({channelId , text , senderName})=>{
      const message = await Message.create({
       channelId:channelId,
       senderId: client.userId,
       senderName:senderName,
       text:text,
      });
      io.to(channelId).emit("new-message" ,message);
    });
//   Disconnect Socket
    socket.on("disconnect", () => {
    console.log("User disconnected:", socket.userId);
  });
})

app.get("/" , (req , res)=>{
    res.send("Chat Web App Server is Live Now!");
})

server.listen(PORT , ()=>{
    console.log(`PORT: ${PORT} RUNNING!`);
})

