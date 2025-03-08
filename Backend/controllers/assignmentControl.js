
import { responder } from '../utils/responder.js';
import answer from '../models/answer.model.js';
import assignment from '../models/assigment.model.js';

const postassignment = async (req, res) => {
    try {
        const {courseId, question, description, assignmetName} = req.body;
        if (!courseId || !question || !description || !assignmetName) {
            return responder(res, 400, 'All fields are required');
        }
        const newAssignment = new assignment({
            courseId: courseId,
            question,
            description,
            assignmetName
        });
     
        await newAssignment.save();
        responder(res,true, 'Assignment created successfully', newAssignment,201);
    }
    catch (error) {
        responder(res, 500, error);
    }
}

const getallcourseassignments = async (req, res) => {
    try{
        const {courseId} = req.params;
        const assignments = await assignment.find({courseId});
        responder(res, true, 'All Assignments', assignments, 200);
    }
    catch(error){
        responder(res, 500, error);
    }
}

const getuserassignments = async (req, res) => {
    try{
        const {courseID,userID} = req.params;   
        const assignments = await answer.find({courseID,userID});
        responder(res, true, 'All Assignments', assignments, 200);
        
        
    }
    catch(error){
        responder(res, 500, error);
    }
}

const getassignmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const findedassignment = await assignment.findById(id);
        if (!findedassignment) {
            return responder(res, false, 'Assignment not found', null, 404);
        }   
        responder(res, true, 'Assignment found', findedassignment, 200);

       }
    catch (error) {
        responder(res, 500, error);
    }
}

    
       
export { postassignment, getallcourseassignments,   getuserassignments, getassignmentById };