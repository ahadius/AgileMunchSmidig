const express = require('express');
const {
	saveImage,
	getImage,
} = require('../controllers/productControllers.js');
const { authUser } = require('../middelwares/auth.js');

const productRouter = express.Router();
productRouter.get('/', getImage);
productRouter.post('/', saveImage);
module.exports = productRouter;
