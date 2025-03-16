import { Router } from "express";
import passport from "passport";

const googleAuthRouter = Router()

googleAuthRouter.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }))

googleAuthRouter.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
    (req, res) => {
        console.log(req.user)
        res.redirect(`http://localhost:5173/dashboard`);
    }
);


export {googleAuthRouter}