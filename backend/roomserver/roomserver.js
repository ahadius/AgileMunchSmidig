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
		origin: 'http://localhost:3001', // or any port your React app is running on
		methods: ['GET', 'POST'],
	},
});

io.on('connection', socket => {
	console.log('New client connected');

	socket.on('drawing', data => {
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

	socket.on('startLine', data => {
		socket.broadcast.emit('startLine', data);
	});

	socket.on('drawing', data => {
		socket.broadcast.emit('drawing', data);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

const port = process.env.PORT || 3001;
server.listen(port, () =>
	console.log(`Listening on port ${port}`)
);
module.exports = {
	roomserver: server,
};
