const express = require('express');
const routerUser = require('./routers/user.js')
 require('dotenv').config();
const port = process.env.port || 5000;
const app = express();
const cors = require('cors')
const connectionDB = require('./config/db.js')
connectionDB()
app.use(express.json())
app.use(
     cors({
     origin: "http://localhost:3000",
     methods: ["GET","POST","PUT","DELETE"],
   })
   );
app.use(express.urlencoded({
     extended:false
}))
app.use('/api/users', routerUser); 

routerUser.use((req, res, next) => {
     next()
   })




app.listen(port, () => console.log(`server starter, ${port}`))