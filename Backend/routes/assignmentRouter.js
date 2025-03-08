import { Router } from "express";

const assignmentRouter = Router()

// Importing the controller functions
import {postassignment,getallcourseassignments, getuserassignments,getassignmentById} from  "../controllers/assignmentControl.js";

// Routes
assignmentRouter.post("/addassignment", postassignment);
assignmentRouter.get("/getallcourseassignments/:courseId", getallcourseassignments);
assignmentRouter.get("/getuserassignments/:courseID/:userID", getuserassignments);
assignmentRouter.get("/getassignmentById/:id", getassignmentById);

export { assignmentRouter }