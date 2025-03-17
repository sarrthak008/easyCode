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

        const findedUser = await findedUser.findById(id);

        if (!findedUser) {
            return res.json({
                message: "user not found "
            });
        }

        findedUser.mobile = mobile;
        await findedUser.save();

        res.json(
            {
                message: "mobile number updated successfully"
            }
        );
    }
    catch (error) {
        res.json({ 
            message: "Server Error", error: error.message
        });
    }
};




export  {saveUserMobile};