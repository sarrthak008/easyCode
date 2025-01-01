import { Router } from "express";
const requestRouter = Router()

import { postrequest ,acceptrequest,rejectrequest ,getallreq} from "../controllers/requestControl.js";
import { verifyJWTAssitant, verifyJWTOwner, verifyJwtUser } from "../middlewares/jwtVarify.js";

requestRouter.post("/reqcourse/:courseid",verifyJwtUser,postrequest)
requestRouter.post('/acceptreq',verifyJWTOwner,acceptrequest);
requestRouter.post('/rejectreq',verifyJWTOwner,rejectrequest);
requestRouter.get('/getallreq/:courseid',verifyJWTOwner,getallreq);

export {requestRouter}