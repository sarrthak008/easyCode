import express from "express";
import user from "../models/user.model"
import user from "../models/user.model";

function saveUserMobile = async (req, res) => {
    try {
        const { id, mobile } = req.body;
        if (!id || mobile) {
            return res.json(
                {
                    message: "user id and mobile number are required"
                }
            )
        }

        const user = await user.findOne({ _id: id, mobile: mobile }).select("mobile");

        if (!user) {
            return res.json({
                message: "user not found or mobile number is not maching"
            });
        }

        res.json({ userId: id, mobile: user.mobile })
    }
    catch (error) {
        res.json({ 
            message: "Server Error", error: error.message
        });
    }
};




export default saveUserMobile;