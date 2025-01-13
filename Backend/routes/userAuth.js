import { Router } from "express";

const authRouter = Router();


import { postSignup ,postVerifyEmail ,postLogin} from "../controllers/userLoginSignup.js";


authRouter.post('/signup',postSignup);
authRouter.post('/verify',postVerifyEmail);
authRouter.post('/login',postLogin);

export {authRouter}
