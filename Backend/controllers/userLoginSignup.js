import user from "../models/user.model.js";
import bcrypt from "bcrypt"

const postSignup = async (req, res) => {

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
         console.log(createduser)
        //checks the user is successfully created or not ...

        if (!createduser) {
            return res.json({
                message: "something went wrong",
                success: false
            }).status(400)
        } else {

            res.json({
                success: true,
                message: 'account created sucessfully',
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