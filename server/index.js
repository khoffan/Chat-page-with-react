const express = require("express");
const app = express()
const http = require("http");
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");
const PORT = 4000


app.use(cors())

const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",
        method: ["GET","POST"]
    }
})


app.get('/',(req,res) => {
    res.send("Hello world");
})

io.on('connection', (socket) => {
    console.log(`User conncet ID: ${socket.id}`);

    socket.on("join_room", (data) =>{
        socket.join(data)
        console.log(`User id ${socket.id} join room ${data}`);
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recives_message",data);
    })
    socket.on('disconnect', () => {
        console.log("User disconnected",socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`SERVER ON PORT ${PORT}`);
})