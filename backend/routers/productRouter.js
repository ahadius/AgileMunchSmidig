const express = require('express');
const {
	saveImage,
	getImage,
	getImageById,
} = require('../controllers/productControllers.js');
const { authUser } = require('../middelwares/auth.js');

const productRouter = express.Router();
productRouter.get('/', getImage);
productRouter.post('/', authUser, saveImage);
productRouter.get(
	'/:id',
	authUser,
	productRouter.get(getImageById)
);
module.exports = productRouter;
