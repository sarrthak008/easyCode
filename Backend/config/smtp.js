import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "easycode2324@gmail.com",
        pass: process.env.LESS_SECURITY_PASS,
    }
});

export default transporter 