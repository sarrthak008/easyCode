import { Router } from "express";
const requestRouter = Router()

import { postrequest ,acceptrequest,rejectrequest ,getallreq} from "../controllers/requestControl.js";
import { verifyJWTAdmin, verifyJwtUser } from "../middlewares/jwtVarify.js";

requestRouter.post("/reqcourse/:courseid",verifyJwtUser,postrequest)
requestRouter.post('/acceptreq',verifyJWTAdmin,acceptrequest);
requestRouter.post('/rejectreq',verifyJWTAdmin,rejectrequest);
requestRouter.post('/getallreq/:courseid',verifyJWTAdmin,getallreq);

export {requestRouter}