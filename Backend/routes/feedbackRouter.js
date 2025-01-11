import { Router } from "express";

/// import controllers...

import { postFeedback , getMyfeedBack, loadFeedbacks } from "../controllers/feedbackControl.js";
import { verifyJwtUser } from "../middlewares/jwtVarify.js";


const feedbackRouter = Router()

feedbackRouter.post('/addfeedback',verifyJwtUser,postFeedback);
feedbackRouter.get('/getfeedback',verifyJwtUser,getMyfeedBack)
feedbackRouter.get('/loadfeedback',loadFeedbacks)


export {feedbackRouter}