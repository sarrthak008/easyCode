import { Router } from "express";
const marksRouter  = Router()

import {postMarks,getMarks,getTopStudentofQuiz} from "../controllers/marksControl.js";

marksRouter.post('/addmarks',postMarks);
marksRouter.post('/getmarks',getMarks);
marksRouter.post('/gettopstudent',getTopStudentofQuiz);


export {marksRouter}