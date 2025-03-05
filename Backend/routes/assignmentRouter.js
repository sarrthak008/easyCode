import { Router } from "express";

const assignmentRouter = Router()

// Importing the controller functions
import {postassignment} from  "../controllers/assignmentControl.js";

// Routes
assignmentRouter.post("/addassignment", postassignment);

export { assignmentRouter }