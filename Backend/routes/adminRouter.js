import { Router } from "express";

const adminRouter = Router()


//
import { getFindAdmin } from "../controllers/adminControl.js";

adminRouter.get('/alladmin',getFindAdmin)

export {adminRouter}