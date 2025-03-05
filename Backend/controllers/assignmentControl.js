import assignment from '../models/assigment.model.js';
import { responder } from '../utils/responder.js';

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
        console.log(newAssignment);
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
       
export { postassignment, getallcourseassignments };