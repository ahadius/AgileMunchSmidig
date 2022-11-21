const express = require("express")
const routerUser= express.Router();
const {login, signup, getMe} = require('../controllers/userControllers.js')
const {Protect} = require('../middleware/Authmiddelware.js') 
routerUser.post('/login',login)
routerUser.post('/signup', signup)
routerUser.get('/me',Protect,getMe)
module.exports = routerUser