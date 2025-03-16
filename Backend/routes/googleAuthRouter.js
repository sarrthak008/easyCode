import express from "express";
import passport from "passport";
import { googleAuth } from "../controllers/auth.controller.js";

const googleAuthRouter = express.Router();

// Redirect user to Google authentication
googleAuthRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Handle callback from Google
googleAuthRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuth
);

export default router;
