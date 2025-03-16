import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import user from "../models/user.model.js";
import bcrypt from "bcrypt"

let googleStatargy = (passport) =>{
 
    console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRECT)

    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRECT,
            callbackURL: "https://easycode-1-ka1u.onrender.com/api/gauth/callback", // Backend callback
          },
          async (accessToken, refreshToken, profile, done) => {
            // console.log(profile);
            try {
              let existingUser = await user.findOne({ email: profile.emails[0].value });
      
              if (!existingUser) {
                
                         const salt = await bcrypt.genSalt(10)
                         const hashPass = await bcrypt.hash(profile.emails[0].value, salt);


                existingUser = new user({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  profilePic: profile.photos[0]?.value,
                  password:hashPass,
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