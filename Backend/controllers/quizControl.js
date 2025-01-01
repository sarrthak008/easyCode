import Quiz from "./../models/quiz.model.js";


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
export { postquiz };