import jwt from "jsonwebtoken";
import { responder } from "../utils/responder.js";

const googleAuth = async (req, res) => {
    try {
        if (!req.user) {
            return responder(res, false, "Google authentication failed", null, 400);
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                _id: req.user._id,
                role: req.user.role,
                validateUser: req.user.validateUser,
                email: req.user.email,
                name: req.user.name,
                mobile: req.user.mobile,
                isBan: req.user.isBan,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set token in cookie
        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            maxAge: 604800000,
            path: "/",
        });

        return responder(res, true, "Google login successful", token, 200);
    } catch (error) {
        return responder(res, false, `${error.message}`, null, 500);
    }
};

export { googleAuth };
