import { Router } from "express";

const quizRouter = Router()
import { postquiz, updateQuiz , getallquiz } from "../controllers/quizControl.js";

quizRouter.post("/addquiz",postquiz);
quizRouter.put("/updatequiz/:id", updateQuiz);
quizRouter.get("/allquize",getallquiz)

 export { quizRouter};
