import {Router} from "express"

const courseRouter = Router()

import {verifyJwtUser,verifyJWTOwner} from "../middlewares/jwtVarify.js"

//controllers related courses...
import  {getcourses,postcourse} from "../controllers/courseControl.js"

courseRouter.get('/getcourse',getcourses);
courseRouter.post('/addcourse',verifyJWTOwner,postcourse)





export {courseRouter}