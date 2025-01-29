import Marks from "../models/marks.model.js"
import { responder } from "../utils/responder.js";

const postMarks = async (req, res) => { 
    try {
        const { marks, studentId, quizId } = req.body;

        if (!marks || !studentId || !quizId) {
            return responder(res, false, 'Marks, studentId and quizId are required', null, 400);
        }

        const marksExists = await Marks.findOne({ studentId, quizId });
        if (marksExists) {
            return responder(res, false, 'Marks already exists', null, 400);
        }   

        const newMarks = new Marks({ marks, studentId, quizId });
        await newMarks.save();
        return responder(res, true, 'Marks added successfully', newMarks, 200);
    } catch (error) {
        return responder(res, false, 'Failed to add marks', error.message, 500);
    }
}

const getMarks = async (req, res) => {
    try {
        const { studentId , quizId } = req.query;
        if (!studentId) {
            return responder(res, false, 'studentId is required', null, 400);
        }

        const marks = await Marks.findOne({ studentId, quizId });
        if (!marks) {
            return responder(res, false, 'Marks not found', null, 404);
        }
     return responder(res, true, 'Marks fetched successfully', marks, 200);
    } catch (error) {
        return responder(res, false, 'Failed to fetch marks', error.message, 500);
    }
}

const getTopStudentofQuiz = async (req, res) => {
    try {
        const { quizId } = req.body;
        if (!quizId) {
            return responder(res, false, 'quizId is required', null, 400);
        }

        const topStudent = await Marks.find({ quizId }).sort({ marks: -1 }).limit(3);

        if (!topStudent) {
            return responder(res, false, 'Top student not found', null, 404);
        }
        return responder(res, true, 'Top student fetched successfully', topStudent, 200);
    } catch (error) {
        return responder(res, false, 'Failed to fetch top student', error.message, 500);
    }
}


export { postMarks ,getMarks,getTopStudentofQuiz}