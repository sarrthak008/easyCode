import { Router } from "express";

const authRouter = Router();


import { postSignup } from "../controllers/userLoginSignup.js";

authRouter.post('/signup',postSignup)

export {authRouter}