import {Router} from "express"

const courseRouter = Router()

import {verifyJwtUser,verifyJWTOwner, verifyJWTAssitant} from "../middlewares/jwtVarify.js"

//controllers related courses...
import  {getcourses,postcourse,getmycourse,putcourse, postSyallbus} from "../controllers/courseControl.js"

courseRouter.get('/getcourse',getcourses);
courseRouter.post('/addcourse',verifyJWTOwner,postcourse)
courseRouter.get('/getMycourse',verifyJwtUser,getmycourse)
courseRouter.put('/putcourse',verifyJWTOwner,putcourse)
courseRouter.post('/postSyallbus',verifyJWTOwner,postSyallbus)
//courseRouter.get('/getcoursstudent',verifyJWTAssitant,getcoursesStudent)




export {courseRouter}