import { Router } from "express";

const answerRouter = Router()

// Importing the controller functions
import {postassignment,getallanswers} from "../controllers/answerControl.js";
import upload from "../middlewares/multer.js";

import {verifyJwtUser} from "../middlewares/jwtVarify.js"

// Routes
answerRouter.post("/addassignment",upload.single("image"),verifyJwtUser, postassignment);
answerRouter.get("/getallanswers/:assignmentID", getallanswers);


export { answerRouter }