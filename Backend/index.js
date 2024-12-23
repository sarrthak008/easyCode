import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT =  process.env.PORT || 3000;


// create routers....

import connectToDb from "./config/connectDB.js";
import { responder } from "./utils/responder.js";
import { authRouter } from "./routes/userAuth.js";



//middlewares....
 app.use(express.json());
 app.use(urlencoded({extended:true}))

//routes..

app.use('/api/auth',authRouter)


app.get('/health',(req,res)=>{
     responder(res,true,'server is running healthy',null,200);
})

app.use("*",(req,res)=>{
  responder(res,false,`${req.baseUrl} not found`,null,404)
})





app.listen(PORT,()=>{
     console.log(`app listen on port : ${PORT}`);
     connectToDb()
})






