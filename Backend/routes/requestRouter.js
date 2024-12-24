import { Router } from "express";
const requestRouter = Router()

import { postrequest } from "../controllers/requestControl.js";
import { verifyJwtUser } from "../middlewares/jwtVarify.js";

requestRouter.post("/reqcourse/:courseid",verifyJwtUser,postrequest)

export {requestRouter}