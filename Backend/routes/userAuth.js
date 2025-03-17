import { Router } from "express";

const authRouter = Router();


import { postSignup ,postVerifyEmail ,postLogin} from "../controllers/userLoginSignup.js";
import  {saveUserMobile} from "../controllers/userNumber.js"

authRouter.post('/signup',postSignup);
authRouter.post('/verify',postVerifyEmail);
authRouter.post('/login',postLogin);
authRouter.post('/linkmobile',saveUserMobile);

export {authRouter}
