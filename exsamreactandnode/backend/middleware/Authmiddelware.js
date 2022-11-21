const jwt = require('jsonwebtoken')
const AsyncHandler = require('express-async-handler');
const users = require('../models/users.js');
secret="ee229s6ds6ds66dsds66ds6dsrrre";  
const Protect = AsyncHandler(async(req, res, next) => {
     let token;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          try {
               token = req.headers.authorization.split(' ')[1]
               const decoded = jwt.verify(token, secret)
               req.use = await users.findById(decoded.id).select('-password')
               next()
          } catch (error) {
          console.log(error)
          res.status(401)
               throw new Error("not authorized")
          
          }
         }
     if(!token) {
          req.status(401)
          throw new Error("not authorized no token")
     }
})
module.exports = {
     Protect
}