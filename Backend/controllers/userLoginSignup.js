import user from "../models/user.model.js";
import otp from "../models/otp.model.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

// import my routes or controller or configg..


const postSignup = async (req, res) => {

    // create a function that create OTP of four digit 
    const getOtp = () => {
        return (Math.floor(1000 + Math.random() * 9999))
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

        let { email, password } = req.body;
        const requiredData = ["email", "password"];
        // checks the req.body cntainig given data or not...
        for (const element of requiredData) {
            if (!req.body[element]) {
                return res.json({
                    success: false,
                    message: `${element} is required`
                    ,
                }).status(400)
            }
        }

        let alreadyExitUser = await user.findOne({ email });

        // if user already exist send responce as user already exist...

        if (alreadyExitUser) {
            return res.json({
                success: false,
                message: 'email is already exist'
            }).status(400)
        }

        // hash the password for security ....
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt);

        // storing the user into db

        const newUser = new user({
            email: email,
            password: hashPass
        });

        const createduser = await newUser.save();
        //checks the user is successfully created or not ...

        if (!createduser) {
            return res.json({
                message: "something went wrong",
                success: false
            }).status(400)
        } else {

            //create and send OTP...
            const OTP = getOtp()

            /// send and store hashed OTP in db...

            const info = await transporter.sendMail({
                from: 'easycode2324@gmail.com',
                to: `${email}`,
                subject: `hello this message is regarding to signup please dont share your OTP`,
                text: "hello student keep learning",
                html: `<h1>your otp is : <b> ${OTP} </b></h1>`,
            });

            const newOtp = new otp({
                userId: createduser._id,
                otp: OTP,
            })

            const sendedOTP = await newOtp.save()
            if (!sendedOTP) {
                await user.findByIdAndDelete(createduser._id);
                return res.json({
                    success: false,
                    message: 'something went wrong try after some time'
                }).status(400)
            }

            res.json({
                success: true,
                message: 'otp send successfully please check your eamil'
            }).status(200)

        }

    } catch (error) {

        return res.json({
            success: false,
            message: `something went wrong , ${error.message}`
        }).status(400)

    }
}

const postVerificationMail = async () => {
    let { email, otp } = req.body;
    const requireddata = ["email", "otp"];
    for (const element of requireddata) {
        if (!req.body[element]) {
            return res.json({
                success: false,
                message: `${element} is required`
            })
        }
    }


}




export { postSignup }