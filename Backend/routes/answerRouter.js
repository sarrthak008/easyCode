import { Router } from "express";

const answerRouter = Router()

// Importing the controller functions
import {postassignment,getallanswers,postapprovalassignment,getUserAssignment,getUserOneAssignment} from "../controllers/answerControl.js";
import upload from "../middlewares/multer.js";

import {verifyJwtUser} from "../middlewares/jwtVarify.js"

// Routes
answerRouter.post("/addassignment",upload.single("image"), postassignment);
answerRouter.get("/getallanswers/:assignmentID", getallanswers);
answerRouter.post("/postapprovalassignment/:assignmentid",postapprovalassignment);
answerRouter.get("/getuseranswer/:userId/:courseId",getUserAssignment);
answerRouter.get("/getuseroneassignment/:userId/:assignmetId",getUserOneAssignment)


export { answerRouter }