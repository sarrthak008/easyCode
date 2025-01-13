import {Router} from "express"

const courseRouter = Router()

import {verifyJwtUser,verifyJWTAdmin} from "../middlewares/jwtVarify.js"

//controllers related courses...
import  {getcourses,postcourse,getmycourse,putcourse, postSyallbus,getcoursesStudent} from "../controllers/courseControl.js"

courseRouter.get('/getcourse',getcourses);
courseRouter.post('/addcourse',verifyJWTAdmin,postcourse)
courseRouter.post('/getMycourse',verifyJwtUser,getmycourse)
courseRouter.put('/putcourse',verifyJWTAdmin,putcourse)
courseRouter.post('/postSyallbus',verifyJWTAdmin,postSyallbus)
courseRouter.get('/getcoursstudent',getcoursesStudent)




export {courseRouter}