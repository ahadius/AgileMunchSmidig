const express = require('express');
const {
	loginUser,
} = require('../controllers/loginController.js');

const loginRouter = express.Router();

loginRouter.get('/', loginUser);
module.exports = loginRouter;
