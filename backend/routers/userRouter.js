const express = require('express');
const {
	SigUpNewUser,
} = require('../controllers/usersControllers.js');
const signupRouters = express.Router();
signupRouters.post('/', SigUpNewUser);
module.exports = signupRouters;
