import { Router } from "express";

const quizRouter = Router()
import { postquiz, updateQuiz } from "../controllers/quizControl.js";

quizRouter.post("/addquiz",postquiz);
quizRouter.put("/updatequiz/:id", updateQuiz);

 export { quizRouter};
