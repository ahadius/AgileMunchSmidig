const express = require('express');
const ratingRouter = express.Router();
const {
	givRating,
} = require('../controllers/RatingController.js');

//userRouter.get('/', getUser);
ratingRouter.post('/', givRating);
module.exports = {
	ratingRouter,
};
