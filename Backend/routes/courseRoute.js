import {Router} from "express"

const courseRouter = Router()

//controllers related courses...
import  {getcourses} from "../controllers/courseControl.js"

courseRouter.get('/getcourse',getcourses)





export {courseRouter}