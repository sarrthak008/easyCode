import { Router } from "express";

const verifyRouter = Router()

//import controller
import { postrequestcourse } from "../controllers/requestController.js";

verifyRouter.post('/reqcourse/:user/:courseid',postrequestcourse)



export {verifyRouter}