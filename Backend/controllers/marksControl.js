import Marks from "../models/marks.model.js"
import { responder } from "../utils/responder.js";

const postMarks = async (req, res) => { 
    try {
        const { marks, studentId, quizId } = req.body;
        const newMarks = new Marks({ marks, studentId, quizId });
        await newMarks.save();
        return responder(res, true, 'Marks added successfully', newMarks, 200);
    } catch (error) {
        return responder(res, false, 'Failed to add marks', error.message, 500);
    }
}



export { postMarks }