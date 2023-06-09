const express = require('express');
const {
	saveImage,
	getImage,
} = require('../controllers/productControllers.js');
const { authUser } = require('../auth/auth.js');
const productRouter = express.Router();
productRouter.get('/', authUser, getImage);
productRouter.post('/', upload.single('file'), saveImage);
module.exports = productRouter;
