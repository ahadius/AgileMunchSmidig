const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const generateKey = () => {
  return Math.random().toString(36).substring(2, 15);
}

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('createRoom', () => {
    const roomKey = generateKey();
    console.log('Room created with key:', roomKey);
    socket.emit('newRoom', roomKey);
  });

  socket.on('joinRoom', (roomKey) => {
    console.log(`User joined room with key: ${roomKey}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001,  () => {
  console.log('listening on *:3001');
});
