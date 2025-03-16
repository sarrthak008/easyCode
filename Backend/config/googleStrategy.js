import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import user from "../models/user.model.js";

const googleStrategyConfig =(passport)=>{
   

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRECT, // ensure this is your correct secret variable
    callbackURL: 'https://www.easycode.support/dashboard'
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('Google profile:', profile);
    return done(null, profile);
  }
));

// Serialize the whole user object into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize the user object out of the session
passport.deserializeUser((user, done) => {
  done(null, user);
});
}

export default googleStrategyConfig