import { Router } from "express";

const answerRouter = Router()

// Importing the controller functions
import {postassignment,getallanswers} from "../controllers/answerControl.js";

// Routes
answerRouter.post("/addassignment", postassignment);
answerRouter.get("/getallanswers/:assignmentID", getallanswers);


export { answerRouter }