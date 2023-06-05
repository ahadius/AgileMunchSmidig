const express = require('express');
const userRouter = express.Router();
const {
	getUser,
	saveUser,
} = require('../controllers/usersControllers.js');

userRouter.get('/', getUser);
userRouter.post('/', saveUser);
module.exports = {
	userRouter,
};
