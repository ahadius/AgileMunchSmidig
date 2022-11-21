const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routers/routerBlog.js');
const mongoose = require('mongoose');
const cors = require('cors')
const PORT =process.env.PORT || 4000;
const MONG_URL = 'mongodb+srv://node_mo:test123456@reactwithnode2022.fumjjyj.mongodb.net/node_mo?retryWrites=true&w=majority';

// this is what is known middelware
app.use(express.json())
app.use(
  cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST","PUT","DELETE"],
})
);

router.use((reg, res, next) => {
     next()
})
app.use('/api/blogs', router);  

const dataCanComeLate = async () => {
   try {
     await mongoose.connect(MONG_URL,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
     })
     console.log("Connected")
   } catch (error) {
     console.log(`something went wrong: ${error}`)
   }

}
dataCanComeLate();


app.listen(PORT,() => {
     console.log(`server is connected to ${PORT}`)
   })

