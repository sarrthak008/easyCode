import { Router } from "express";

const quizRouter = Router()
import { postquiz, updateQuiz , getallquiz ,linkQuiz ,patchQuiz,getquestions ,getCourseQuiz} from "../controllers/quizControl.js";
import { verifyJWTAdmin } from "../middlewares/jwtVarify.js";


quizRouter.post("/addquiz",verifyJWTAdmin,postquiz);
quizRouter.put("/updatequiz/:id", updateQuiz);
quizRouter.get("/allquize",getallquiz);
quizRouter.post("/lickquiz",linkQuiz)
quizRouter.patch("/lockquiz",patchQuiz)
quizRouter.get('/getquestion/:id',getquestions)
quizRouter.get('/getcoursequiz/:courseId',getCourseQuiz)

 export { quizRouter};
