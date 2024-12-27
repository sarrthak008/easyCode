import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser  from "cookie-parser"
dotenv.config()


const app = express();
const PORT =  process.env.PORT || 3000;


// create routers....

import connectToDb from "./config/connectDB.js";
import { responder } from "./utils/responder.js";
import { authRouter } from "./routes/userAuth.js";
import {courseRouter} from "./routes/courseRoute.js";
import { requestRouter } from "./routes/requestRouter.js";

//import middle wares




//middlewares....
 app.use(express.json());
 app.use(urlencoded({extended:true}))
 app.use(cors())
 app.use(cookieParser())
 

//routes..
app.use('/api/auth',authRouter);
app.use('/api/course',courseRouter);
app.use('/api/request',requestRouter)


app.get('/health',(req,res)=>{
     responder(res,true,'server is running healthy',null,200);
})

app.get('/connect',(req,res)=>{
     responder(res,true,'connected to server',null,200)
})

app.use("*",(req,res)=>{
  responder(res,false,`${req.baseUrl} not found`,null,404)
})



app.listen(PORT,()=>{
     console.log(`app listen on port : ${PORT}`);
     connectToDb()
})






