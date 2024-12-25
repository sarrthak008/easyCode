import { Router } from "express";
const requestRouter = Router()

import { postrequest ,acceptrequest,rejectrequest } from "../controllers/requestControl.js";
import { verifyJWTAssitant, verifyJWTOwner, verifyJwtUser } from "../middlewares/jwtVarify.js";

requestRouter.post("/reqcourse/:courseid",verifyJwtUser,postrequest)
requestRouter.post('/acceptreq',verifyJWTOwner,acceptrequest)
requestRouter.post('/rejectreq',verifyJWTAssitant,rejectrequest)

export {requestRouter}