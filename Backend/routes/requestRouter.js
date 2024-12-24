import { Router } from "express";
const requestRouter = Router()

import { postrequest ,acceptrequest,rejectrequest } from "../controllers/requestControl.js";
import { verifyJWTAssitant, verifyJwtUser } from "../middlewares/jwtVarify.js";

requestRouter.post("/reqcourse/:courseid",verifyJwtUser,postrequest)
requestRouter.post('/acceptreq',verifyJWTAssitant,acceptrequest)
requestRouter.post('/rejectreq',verifyJWTAssitant,rejectrequest)

export {requestRouter}