import { Router } from "express";

const quizRouter = Router()
import { postquiz } from "../controllers/quizControl.js";

quizRouter.post("/addquiz",postquiz)

 export { quizRouter}