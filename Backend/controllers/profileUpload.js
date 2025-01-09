
import uploadTocloud from "../config/cloudnary.js";
import { responder } from "../utils/responder.js";
import user from "../models/user.model.js"

const postUploadrpofilePic = async (req, res) => {
    if (!req.file) {
        return responder(res, false, 'no file to upload', null, 400);
    }
    try {
        const responce = await uploadTocloud(req.file.path, req.file.originalname);
        if (!responce) {
            return responder(res, false, 'could not upload file', null, 500);
        }
        const user1 = await user.findById(req.user._id);
        user1.profilePic = responce.secure_url;
        await user1.save();
        return responder(res, true, "profie photo updated sucessfully.", 200);
    } catch (error) {
         responder(res,false,'uploading error',error.message,400)
    }
}

const getUserProfilePic = async (req, res) => {
    const { id } = req.params
    if (!id) {
         return responder(res, false, 'missing parameter', 404) 
    }
    try{
          let profilePic = await user.findById(id).select('profilePic')
         return responder(res, false,'fetch profile picture', profilePic, 200)

    } catch (error) {
        return responder(res, false,error.message, 404) 
    }
}

export { postUploadrpofilePic, getUserProfilePic }