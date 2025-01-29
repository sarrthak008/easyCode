import { Router } from "express";
const marksRouter  = Router()

import {postMarks} from "../controllers/marksControl.js";

marksRouter.post('/addmarks',postMarks);


export {marksRouter}