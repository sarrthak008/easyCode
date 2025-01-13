import { Router } from "express";

const quizRouter = Router()
import { postquiz, updateQuiz , getallquiz } from "../controllers/quizControl.js";
import { verifyJWTAdmin } from "../middlewares/jwtVarify.js";


quizRouter.post("/addquiz",verifyJWTAdmin,postquiz);
quizRouter.put("/updatequiz/:id", updateQuiz);
quizRouter.get("/allquize",getallquiz)

 export { quizRouter};
