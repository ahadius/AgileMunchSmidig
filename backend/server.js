const http = require('http');
const app = require('./app.js');
const dotenv = require('dotenv');
const roomserver = require('./roomserver/roomserver.js');
dotenv.config();
const PORT = process.env.PORT_NUMMER;
const mode = process.env.mode;

const { mangoConnect } = require('./config/db.js');

const server = http.createServer(app);
const startServer = async () => {
	await mangoConnect();
	await roomserver();
	server.listen(PORT, () => {
		console.log(
			`lisning port ${PORT} and  ${mode} mode...`
		);
	});
};
startServer();
