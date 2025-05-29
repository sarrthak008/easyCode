import user from "../models/user.model.js";
import otp from "../models/otp.model.js";
import unverifiedUser from "../models/unverifieduser.model.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

// import my routes or controller or configg.
import { responder } from "../utils/responder.js";


const postSignup = async (req, res) => {

    // create a function that create OTP of four digit 
    const getOtp = () => {
        return Math.floor(1000 + Math.random() * 9000);
    }


    // create a SMTP server or Transporter..
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "easycode2324@gmail.com",
            pass: process.env.LESS_SECURITY_PASS,
        }
    });


    try {

        let { email, password, name, mobile } = req.body;
        const requiredData = ["email", "password", "name", "mobile"];

        for (const element of requiredData) {
            if (!req.body[element]) {
                return responder(res, false, `${element} is required`, null, 400)
            }
        }

        let alreadyExitUser = await user.findOne({ email });

        // if user already exist send responce as user already exist...

        if (alreadyExitUser) {
            return responder(res, false, 'email is already exist', null, 400);
        }

        // hash the password for security ....
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt);

        // storing the user into db

        const newUser = new unverifiedUser({
            email: email,
            password: hashPass,
            name: name,
            mobile: mobile
        });

        const createduser = await newUser.save();
        //checks the user is successfully created or not ...

        //console.log(createduser)

        if (!createduser) {
            return responder(res, false, 'something went wrong', null, 400);
        } else {

            //create and send OTP...
            const OTP = getOtp()

            /// send and store hashed OTP in db...

            const info = await transporter.sendMail({
                from: 'easycode2324@gmail.com',
                    to: `${email}`,
                    subject: `hello this message is regarding to signup please dont share your OTP`,
                    text: "hello student keep learning",
                    html: `<h2>your otp is : <h1><b> ${OTP} </b></h1></h2>`,
                });

            const newOtp = new otp({
                userId: createduser._id,
                otp: OTP,
            })

            const sendedOTP = await newOtp.save()
            if (!sendedOTP) {
                await unverifiedUser.findByIdAndDelete(createduser._id);
                return responder(res, false, 'cant send mail try again', null, 400)
            }

            return responder(res, true, 'OTP send sucessfully please check your mail', null, 200)
        }

    } catch (error) {

        return responder(res, false, `${error.message}`, null, 400);
    }
}

const postVerifyEmail = async (req, res) => {
    let { email, myotp } = req.body;
    try {
        const requireddata = ["email", "myotp"];

        // Validate input
        for (const element of requireddata) {
            if (!req.body[element]) {
                return responder(res, false, `${element} is required`, null, 400);
            }
        }

        // Find the unverified user
        let findedUser = await unverifiedUser.findOne({ email });
        if (!findedUser) {
            return responder(res, false, `Account not found`, null, 400);
        }

        // Find the OTP
        let otpInfo = await otp.findOne({ otp: myotp, userId: findedUser._id });
        if (!otpInfo) {
            return responder(res, false, `Invalid OTP`, null, 400);
        }

        // Check if OTP is expired
        if (otpInfo.expireAt <= new Date()) {
            await otp.deleteOne({ _id: otpInfo._id });
            return responder(res, false, `OTP has expired`, null, 400);
        }

        // Save the user in main user db
        const mainUser = new user({
            name: findedUser.name,
            email: findedUser.email,
            password: findedUser.password,
            mobile: findedUser.mobile,
        });

        await mainUser.save();

        // Delete unverified user and OTP
        await unverifiedUser.deleteOne({ _id: findedUser._id });
        await otp.deleteOne({ _id: otpInfo._id });

        return responder(res, true, `Account verified successfully`, null, 200);
    } catch (error) {
        console.error(error);
        return responder(res, false, `Something went wrong`, null, 500);
    }
};



const postLogin = async (req, res) => {

    const { email, password } = req.body
    try {
        const LoginUser = await user.findOne({ email });
        if (!LoginUser) {
            return responder(res, false, 'cant find account please signup', null, 400);
        }

        // matching the pass..
        let isPassMatch = await bcrypt.compare(password, LoginUser.password)
        if (!isPassMatch) {
            return responder(res, false, 'please check creandials', null, 400);
        }

        // making the JWT token that store user info..
        const token = jwt.sign({
            _id: LoginUser._id,
            role: LoginUser.role,
            validateUser: LoginUser.validateUser,
            email: LoginUser.email,
            name: LoginUser.name,
            mobile: LoginUser.mobile,
            isBan:LoginUser.isBan
        }, process.env.JWT_SERECT, { expiresIn: '1w' })

        res.cookie("token", token, {
            sameSite: 'None',
            secure: true,
            maxAge: 604800000,
            path: '/'
        });

        return responder(res, true, "login sucessfully", token, 200);

    } catch (error) {
        return responder(res, false, `${error.message}`, null, 404);
    }
}


export { postSignup, postVerifyEmail, postLogin }