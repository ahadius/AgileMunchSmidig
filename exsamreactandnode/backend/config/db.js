const mongoose = require('mongoose')
const MONG_URL_USERS='mongodb+srv://mohyus:mohyus@users.8bpinb7.mongodb.net/mernapp?retryWrites=true&w=majority'
const getUserMethode = async () => {
     try {
          const con = await mongoose.connect(MONG_URL_USERS)
          console.log("connection was ok")
          
     } catch (error) {
          console.log("disconned",+ error)
     }

}
   
   
module.exports =getUserMethode


