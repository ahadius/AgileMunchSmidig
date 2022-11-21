const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userShema = new Schema({
     email: {
          type: String,
          required : true,
          unigue: true
     },
     password: {
          type: String,
          required : true
     },
     telephone: {
          type: Number,
          required : ['pleas inter your phone']
     }
     
}, {timestamps: true})
module.exports = mongoose.model('User', userShema)