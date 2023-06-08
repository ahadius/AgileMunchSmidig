const express = require('express');
const {
	loginUser,
} = require('../controllers/loginController.js');
const loginRouters = express.Router();
loginRouters.post('/', loginUser);
module.exports = loginRouters;
