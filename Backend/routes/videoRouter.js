import { Router } from "express";

import { postVideo,getVideo } from "../controllers/videoControl.js";


const videoRouter = Router();

videoRouter.post("/uploadvideo", postVideo);
videoRouter.get("/getvideo/:courseId", getVideo);

export {videoRouter}

