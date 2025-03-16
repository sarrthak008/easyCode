import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import user from "../models/user.model.js"; // Ensure correct model import

const googleStrategyConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET, // Fixed typo (GOOGLE_SECRECT → GOOGLE_SECRET)
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

          if (existingUser) {
            return done(null, existingUser);
          }

          // If user doesn't exist, create a new one
          const newUser = new user({
            name,
            email,
            profilePic,
            password: "", // No password as it's OAuth
            validateUser: true, // Mark as validated since it's Google login
          });

          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          console.error("Error in Google Auth:", error);
          return done(error, null);
        }
      }
    )
  );

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default googleStrategyConfig;
