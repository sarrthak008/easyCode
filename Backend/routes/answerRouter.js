import { Router } from "express";

const answerRouter = Router()

// Importing the controller functions
import {postassignment,getallanswers} from "../controllers/answerControl.js";
import upload from "../middlewares/multer.js";

// Routes
answerRouter.post("/addassignment",upload.single("image"), postassignment);
answerRouter.get("/getallanswers/:assignmentID", getallanswers);


export { answerRouter }