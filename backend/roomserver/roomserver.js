/*const express = require("express");
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
});*/



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
let history = [];


const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running.');
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001", // or any port your React app is running on
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('drawing', (data) => {
        history.push(data);

      socket.broadcast.emit('drawingData', data); 
    });
    socket.on('undo', () => {
        history.pop();

      socket.broadcast.emit('undo'); // Broadcast 'undo' event to other clients
    });
  
    socket.on('clear', () => {
        history = [];

      socket.broadcast.emit('clear'); // Broadcast 'clear' event to other clients
    });

    socket.on('startLine', (data) => {
        socket.broadcast.emit('startLine', data);
    });
    
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });
    
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
