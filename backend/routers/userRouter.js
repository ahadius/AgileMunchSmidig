const express = require('express');
const {
	SigUpNewUser,
} = require('../controllers/usersControllers.js');

const userRouter = express.Router();
userRouter.post('/', SigUpNewUser);
module.exports = userRouter;
