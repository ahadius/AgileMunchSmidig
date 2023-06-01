const express = require('express');
const productRouter = express.Router();
const { getproduct } = require('../controllers/product.js');

productRouter.get('./', getproduct);
module.exports = {
	productRouter,
};
