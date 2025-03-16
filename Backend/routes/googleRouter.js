import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const googleRouter = express.Router();

// Redirect user to Google OAuth
googleRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle Google Callback
googleRouter.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect("https://www.easycode.support/login?error=AuthenticationFailed");
    }

    // Generate JWT Token

    // console.log(req.user)

    const token = jwt.sign({
      _id: req.user._id,
      role: req.user.role,
      validateUser: req.user.validateUser,
      email: req.user.email,
      name: req.user.name,
      mobile: req.user?.mobile,
      isBan: req.user.isBan
    }, process.env.JWT_SERECT, { expiresIn: '1w' })

    res.cookie("token", token, {
      sameSite: 'None',
      secure: true,
      maxAge: 604800000,
      path: '/'
    });

    // Redirect to frontend with token
    res.redirect(`https://www.easycode.support/dashboard?token=${token}`);
  }
);

export { googleRouter };
