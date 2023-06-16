const http = require('http');
const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT_NUMMER;
const mode = process.env.mode;

const { mangoConnect } = require('./config/db.js');

const server = http.createServer(app);
const startServer = async () => {
	await mangoConnect();

	server.listen(PORT, () => {
		console.log(
			`lisning port ${PORT} and  ${mode} mode...`
		);
	});
};
startServer();
