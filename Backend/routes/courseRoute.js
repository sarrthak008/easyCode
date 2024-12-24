import {Router} from "express"

const courseRouter = Router()

import {verifyJwt} from "../middlewares/jwtVarify.js"

//controllers related courses...
import  {getcourses,postcourse} from "../controllers/courseControl.js"

courseRouter.get('/getcourse',verifyJwt,getcourses);
courseRouter.post('/addcourse',postcourse)





export {courseRouter}