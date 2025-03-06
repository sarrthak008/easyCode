import answer from "../models/answer.model.js";
import { responder } from "../utils/responder.js";

import uploadTocloud from "../config/cloudnary.js";

// Post Assignment

const postassignment = async (req, res) => {
    try {
        if (!req.file) {
            return responder(res, false, "No file to upload", null, 400);
        }

       // console.log(req.file);

        const { userID, assignmentID, github_URL, host_URL, courseID } = req.body;
        if (!userID || !assignmentID || !github_URL || !host_URL || !courseID) {
            return responder(res, false, "Please provide all the required fields", null, 400);
        }
        const responce = await uploadTocloud(req.file.path, req.file.originalname);
        if (!responce) {
            return responder(res, false, 'could not upload file', null, 500);
        }

        
        const newAnswer = new answer({
            userID, assignmentID, github_URL, host_URL, courseID, answer_pic: responce.secure_url
        })
        await newAnswer.save();
        responder(res, true, "Assignment Posted Successfully", newAnswer, 200);
    } catch (err) {
        responder(res, false, err.message, null, 500);
    }
}

const getallanswers = async (req, res) => {
    try {
        const { assignmentID } = req.params;
        if (!assignmentID) {
            return responder(res, false, "Please provide all the required fields", null, 400);
        }

        const answers = await answer.find({ assignmentID });
        responder(res, true, "All Answers", answers, 200);
    }
    catch (err) {
        responder(res, false, err.message, null, 500);
    }
}


export { postassignment, getallanswers }

