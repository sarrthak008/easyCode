import Quiz from "./../models/quiz.model.js";
import { responder } from "../utils/responder.js";
import course from "../models/course.model.js";
import mongoose from "mongoose";

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
    const { quizId, courseId } = req.body;

    if (!quizId || !courseId) {
        return responder(res, false, 'All parameters are required', null, 400);
    }

    try {
        // Check if the quiz exists
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return responder(res, false, 'Quiz not found', null, 404);
        }

        let findedCourse = await course.findById(courseId).select('quizs').populate('quizs')

        if (!findedCourse) {
            return responder(res, false, 'Course not found', null, 404);
        }

        let ifexit = findedCourse.quizs?.filter((quiz) => {
            return (quiz.quizId.toString() == quizId)
        })

        if (ifexit.length > 0) {
            return responder(res, false, 'Quiz already linked', null, 400);
        }

        findedCourse.quizs.push({ quizId: quizId, isLock: true });
        await findedCourse.save();
        return responder(res, true, 'Quiz linked successfully', findedCourse, 200);

    } catch (error) {
        //console.error('Error linking quiz:', error);
        return responder(res, false, 'Failed to link quiz', error.message, 500);

    }

};


const patchQuiz = async (req, res) => {
    let { courseId, quizId } = req.body
    if (!quizId || !courseId) {
        return responder(res, false, 'all parametes required', null, 400);
    }
    try {
        let findedCourse = await course.findById(courseId).select('quizs').populate('quizs')
        if (!findedCourse) {
            return responder(res, false, 'Course not found', null, 404);
        }
        let findedQuiz = findedCourse.quizs.find((quiz) => {
            return quiz.quizId.toString() == quizId
        })
        if (!findedQuiz) {
            return responder(res, false, 'Quiz not found', null, 404);
        }

        //findedQuiz.isLock = !findedQuiz.isLock
        
        findedCourse.quizs.map((quiz) => {
            if (quiz.quizId.toString() == quizId) {
                quiz.isLock = !quiz.isLock

            }   
        })
        await findedCourse.save() //&& await findedQuiz.save();

        return responder(res, true, 'update quiz status ', findedCourse, 200);

    } catch (error) {
        return responder(res, false, 'Failed to lock quiz', error.message, 500);
    }
}

// api return the  quizes that links with the course
const getquestions = async (req, res) => {

  const {id} = req.params;
  try {
    const findedCourse = await course.findById(id).select('quizs').populate('quizs.quizId');
    if(!findedCourse){
      return responder(res, false, 'Course not found', null, 404);
    }else{
        return responder(res, true, 'Questions finded', findedCourse.quizs, 200);
    }
  }catch(error){
    return responder(res, false, 'Failed to get questions', error.message, 500);
  }

}



export { postquiz, updateQuiz, getallquiz, linkQuiz, patchQuiz, getquestions };