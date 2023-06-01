const express = require('express');
const productRouter = express.Router();
const {
	getproduct,
	saveProduct,
} = require('../controllers/product.js');

productRouter.get('./', getproduct);
productRouter.post('./', saveProduct);
module.exports = {
	productRouter,
};
