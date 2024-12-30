import { Router } from "express";
import upload from "../middlewares/multer.js";

import { postUploadrpofilePic } from "../controllers/profileUpload.js";
import {verifyJwtUser} from "../middlewares/jwtVarify.js"




const uploadRouter = Router()

uploadRouter.post("/upload", upload.single("image"),verifyJwtUser,postUploadrpofilePic);



export {uploadRouter}