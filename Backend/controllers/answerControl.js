import answer from "../models/answer.model.js";
import { responder } from "../utils/responder.js";

// Post Assignment

const postassignment = async(req,res) =>{
    try{
        const {userID,assignmentID,github_URL,answer_pic,host_URL} = req.body;
        if(!userID || !assignmentID || !github_URL || !answer_pic || !host_URL){
            return responder(res,false,"Please provide all the required fields",null,400);
        }
        const newAnswer = new answer({
            userID,assignmentID,github_URL,answer_pic,host_URL
        })
        await newAnswer.save();
        responder(res,true,"Assignment Posted Successfully",newAnswer,200);
    }catch(err){
        responder(res,false,err.message,null,500);
    }
}

const getallanswers = async(req,res) =>{
    try{
        const {assignmentID} = req.params;
        if(!assignmentID){
            return responder(res,false,"Please provide all the required fields",null,400);
        }

        const answers = await answer.find({assignmentID});
        responder(res,true,"All Answers",answers,200);  
    }
    catch(err){
        responder(res,false,err.message,null,500);
    }
}
export {postassignment,getallanswers}

