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
    
        let alredySubmitted = await
            answer.findOne({ userID, assignmentID, courseID });
        if (alredySubmitted) {
            return responder(res, false, "You have already submitted the assignment", null, 400);
        }

        const responce = await uploadTocloud(req.file.path, req.file.originalname);
        if (!responce) {
            return responder(res, false, 'could not upload file', null, 500);
        }

        
        const newAnswer = new answer({
            userID, assignmentID, github_URL, host_URL, courseID, answer_pic: responce.secure_url,status:"submitted"
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

        const answers = await answer.find({ assignmentID }).populate("userID", "name mobile profilePic email");
        const onlySubmittedAns = answers.filter((ans)=>ans.status === "submitted");
        return responder(res, true, "all submited answer fetch suceesfully.", onlySubmittedAns, 200);
    }
    catch (err) {
        responder(res, false, err.message, null, 500);
    }
}

const postapprovalassignment = async (req, res) => {
    try {
        const { assignmentid } = req.params;
        const { status, userid ,message} = req.body; 

        if (!assignmentid || !status || !userid) {
            return responder(res, false, "Please provide all the required fields", null, 400);
        }

        const answerToUpdate = await answer.findOne({ assignmentID: assignmentid, userID: userid });
         
        if (!answerToUpdate) {
            return responder(res, false, "Answer not found", null, 404);
        }

        if (status === "rejected") {
            await answer.deleteOne({ assignmentID: assignmentid, userID: userid });
            return responder(res, true, "Rejected successfully", null, 200);
        }

        answerToUpdate.status = "approved"; 
        answerToUpdate.message = message;
        await answerToUpdate.save();

        return responder(res, true, "Answer status updated successfully", answerToUpdate, 200);
    } catch (err) {
        return responder(res, false, err.message, null, 500);
    }
};



const getUserAssignment = async (req, res) => {
    const {userId,assignmentId} = req.params;
    if(!userId || !assignmentId){
         return responder(res,false,"Please provide all the required fields",null,400);
    }
    try {
        const responce =  await answer.find({userID:userId,assignmentID:assignmentId})
        if(!responce){
            return responder(res,false,"No answer found",null,404);
        }else{
            return responder(res,true,"student anser loaded",responce,200);
        }
    }catch(err){
       return responder(res,false,err.message,null,500);
    }
}

export { postassignment, getallanswers ,postapprovalassignment,getUserAssignment}

