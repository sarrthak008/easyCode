import { Router } from "express";

const roleRouter = Router();

//controllers related courses...
import { getalluser} from "../controllers/roleControl.js";

roleRouter.get("/getrole", getalluser);



export { roleRouter };