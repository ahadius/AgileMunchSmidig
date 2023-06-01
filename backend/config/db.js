const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once('open', () => {
	console.log('MongoDB connection is ready');
});
mongoose.connection.on('erro', err => {
	console.error(`something went wrong ${err}`);
});

const mangoConnect = async () => {
	mongoose.connect(MONGO_URL);
	mongoose.set('strictQuery', true);
};

const mangoDidsconnect = async () => {
	await mongoose.disconnect();
};

module.exports = {
	mangoConnect,
	mangoDidsconnect,
};
