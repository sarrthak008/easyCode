import { Router } from "express";
import passport from "passport";

const googleAuthRouter = Router()

googleAuthRouter.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }))



export {googleAuthRouter}