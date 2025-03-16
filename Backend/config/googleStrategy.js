import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import { responder } from "../utils/responder.js";

const googleStrategyConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "https://www.easycode.support/dashboard",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google Profile:", profile);

          // Extract user info from Google profile
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;
          const profilePic = profile.photos?.[0]?.value || "";

          if (!email) {
            return done(null, false, { message: "Email not found in Google profile" });
          }

          // Check if the user already exists in DB
          let existingUser = await user.findOne({ email });

          if (!existingUser) {
            // If user doesn't exist, create a new one
            existingUser = new user({
              name,
              email,
              profilePic,
              password: "", // No password as it's OAuth
              validateUser: true, // Mark as validated since it's Google login
            });

            await existingUser.save();
          }

          // Generate JWT token (same as your login flow)
          const token = jwt.sign(
            {
              _id: existingUser._id,
              role: existingUser.role,
              validateUser: existingUser.validateUser,
              email: existingUser.email,
              name: existingUser.name,
              mobile: existingUser.mobile,
              isBan: existingUser.isBan,
            },
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
          );

          // Attach token to user object
          const userWithToken = { ...existingUser.toObject(), token };

          return done(null, userWithToken);
        } catch (error) {
          console.error("Error in Google Auth:", error);
          return done(error, null);
        }
      }
    )
  );

  // ✅ Store only `_id` in session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // ✅ Retrieve full user data using `_id`
  passport.deserializeUser(async (id, done) => {
    try {
      const foundUser = await user.findById(id);
      done(null, foundUser);
    } catch (error) {
      done(error, null);
    }
  });
};

export default googleStrategyConfig;
