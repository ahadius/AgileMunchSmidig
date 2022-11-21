const User = require('../models/users.js')
const bcrypt = require('bcrypt')
const validate = require('validator')
const jwt = require('jsonwebtoken')
secret="ee229s6ds6ds66dsds66ds6dsrrre"; 

const generateToken =(id) => {
     return  jwt.sign({ id }, secret, 
          {expiresIn: '100d',
     })
 } 
const signup = async(req, res) => { 
const { email, password, telephone} = req.body;
if(!email || !password){
     res.status(400)
     throw Error ('All feilds must be filled')
}
if(!validate.isEmail(email)){
     res.status(400)
     throw Error ("email is not valid")
}
if(!validate.isStrongPassword(password)){
     res.status(400)
     throw Error ("password is not strong enough")

}
const exists = await User.findOne({email})
if(exists){
     res.status(400)
     throw Error("Email already is in use")
}
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password, salt);
const newUserCreated = await User.create({ email, password: hash, telephone})
if(newUserCreated) {
     res.status(201).json({
          _id: newUserCreated.id,
          email: newUserCreated.email,
          telephone: newUserCreated.telephone,
          toke: generateToken(newUserCreated._id),
     })    
} else {
     res.status(400)
throw new Error("invalid login user")
     
}
}


const login  = async(req, res) => {
     const { email, password} = req.body;
     const user = await User.findOne({email})
     const compirePassword = await bcrypt.compare(password, user.password);
     if(user && compirePassword){
          res.status(201).json({
               _id: user.id,
               email: user.email,
               password: user.password,
               toke: generateToken(user._id),
          })  
     } else {
          res.status(400)
          throw new Error('invalid user')
          
     }
     }

     const getMe = async(req, res) => {
          const {_id, email, password} = await User.findById(req.user.id)
          res.status(200).json({id: _id,email, password })
          }
      
module.exports ={
     login,
    signup,
    getMe,

}