import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import user from "../models/user.model.js";

let googleStatargy = (passport) =>{
 
    console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRECT)

    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRECT,
            callbackURL: "http://localhost:3000/api/glogin/callback", // Backend callback
          },
          async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
              let existingUser = await user.findOne({ email: profile.emails[0].value });
      
              if (!existingUser) {
                existingUser = new user({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  profilePic: profile.photos[0]?.value,
                  password: "",
                  validateUser: true,
                });
      
                await existingUser.save();
              }
      
              return done(null, existingUser);
            } catch (error) {
              return done(error, null);
            }
          }
        )
      );            
}


export default googleStatargy;