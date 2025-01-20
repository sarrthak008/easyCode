import Quiz from "./../models/quiz.model.js";
import { responder } from "../utils/responder.js";
import course from "../models/course.model.js";

const postquiz = async (req, res) => {
    try {
        const { name, allquestions } = req.body;
        // if question name and question is not available
        if (!name || !Array.isArray(allquestions) || allquestions.length == 0) {
            return res.json({
                success: false,
                message: "Quiz name and questions are required, and questions must be an array",
            });
        }
        // create quiz
        const newQuiz = new Quiz({ name, allquestions });
        await newQuiz.save();
        res.json({
            success: true,
            message: "Quiz created successfully",
            data: newQuiz,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "failed to create quiz",
            error: error.message,
        });
    }


};

//update quiz

const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, allquestions } = req.body;

        // Find the quiz by ID and update
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { name, allquestions },
            { new: true, runValidators: true }
        );

        // If quiz is not found
        if (!updatedQuiz) {
            return responder(res, false, "Quiz not found", null, 404);
        }


        responder(res, true, "Quiz updated successfully", updatedQuiz, 200);
    } catch (error) {


        console.error("Error updating quiz:", error);
        responder(res, false, "Failed to update quiz", error.message, 500);
    }
};

const getallquiz = async (req, res) => {

    try {

        const allQuiz = await Quiz.find()
        if (!allQuiz) {
            return responder(res, false, 'no quize ')
        }

        return responder(res, true, 'All Quize finded..', allQuiz, 202)

    } catch (error) {
        console.log(error)

        return responder(res, false, error.message, 500);

    }


}

const linkQuiz = async (req, res) => {
    const { quizId, courseId } = req.body
    if (!quizId || !courseId) {
        return responder(res, false, 'all parametes required', null, 400);
    }
    try {
        const findedCourse = await course.findById(courseId)
        if (findedCourse?.quizs.includes(quizId)) {
            return responder(res, false, 'quiz are alredy connected', null, 400);
        }
        findedCourse?.quizs.push(quizId)
        let responce = await findedCourse.save()
        
        if (!responce) {

            return responder(res, false, 'something went wrong', null, 400);
        }

        return responder(res, true, 'quiz link successfully', responce, 200);

    } catch (error) {
        return responder(res, false, `${error.message}`, null, 400)
    }
}

export { postquiz, updateQuiz, getallquiz, linkQuiz };