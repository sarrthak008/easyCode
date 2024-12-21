import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT =  process.env.PORT || 3000;


// create routers....

import connectToDb from "./config/connectDB.js";
import { authRouter } from "./routes/userAuth.js";



//middlewares....
 app.use(express.json());
 app.use(urlencoded({extended:true}))

//routes..

app.use('/api/auth',authRouter)


app.get('/health',(req,res)=>{
     res.json({
         success: true,
          message: "server is runnig healthy..."
     }).status(200)
})

app.use("*",(req,res)=>{
     res.json({
         success:false,
         message: `${req.path} not found.`
     }).status(404)
})





app.listen(PORT,()=>{
     console.log(`app listen on port : ${PORT}`);
     connectToDb()
})






