import { Router } from "express";

const assignmentRouter = Router()

// Importing the controller functions
import {postassignment,getallcourseassignments} from  "../controllers/assignmentControl.js";

// Routes
assignmentRouter.post("/addassignment", postassignment);
assignmentRouter.get("/getallcourseassignments/:courseId", getallcourseassignments);

export { assignmentRouter }