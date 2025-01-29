import React, { useState, useEffect } from 'react';
import { useStore } from '../context/Store';
import axios from 'axios';
const API_URL = import.meta.env.VITE_SERVER_URI;

function StartQuiz() {
    const [userAnswers, setUserAnswers] = useState({});
    const [showscore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const { openquiz ,currentUser} = useStore();

    
    // Ensure quiz data is loaded and exists before rendering
    if (!openquiz?.quizId) {
        return <div>Loading...</div>;
    }

    const handleAnswerChange = (questionId, selectedAnswer) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: selectedAnswer
        }));
    };

    const calculateScore = () => {
        let score = 0;
        
    
        openquiz?.quizId?.allquestions.forEach((question) => {
            // Ensure that the correct answer exists and is not undefined
            const correctAnswer = question?.correctAns?.trim().toLowerCase();
            const userAnswer = userAnswers[question._id]?.trim().toLowerCase();
    
            // Debugging: Log the user answer and the correct answer
            console.log(`Question: ${question.question}`);
            console.log(`User Answer: "${userAnswer}", Correct Answer: "${correctAnswer}"`);
    
            // Check if the user's answer matches the correct answer (ignore case and whitespace)
            if (userAnswer === correctAnswer) {
                score += 1;
            }
            setScore(score);
        });
         setShowScore(true);
       
    };

    const addmarks = async () => {
        try {
            if(!currentUser() || !score){
                return;
            }
            const responce = await axios.post(`${API_URL}/api/marks/addmarks`, {
                
                    marks: score,
                    studentId: currentUser()._id,
                    quizId: openquiz.quizId._id
                   
            }, { withCredentials: true });
            console.log(responce);
        } catch (error) {
            console.log(error);
        }
    }
      

    return (
        <div className='h-screen w-screen flex flex-col items-center relative'>
            <h1 className='text-green-700 text-4xl text-center font-bold'>
                {openquiz.quizId.name}
            </h1>

            <div className='h-full w-[80%] bg-slate-600 rounded-md shadow-md p-4 overflow-y-scroll hide-scroll-bar'>
                {openquiz?.quizId?.allquestions.map((que, index) => (
                    <div className='bg-gray-700 p-2 rounded-md mt-4' key={index}>
                        <div className='text-gray-200 text-2xl'>
                            {index + 1}. {que.question}
                            {que.options.map((opt, optIndex) => (
                                <div className='flex items-center gap-4' key={optIndex}>
                                    <input
                                        type='radio'
                                        name={que._id}
                                        value={opt}
                                        onChange={() => handleAnswerChange(que._id, opt)}
                                        checked={userAnswers[que._id] === opt}
                                    />
                                    <label className='text-base text-gray-400'>{opt}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

    <div className='p-4 flex justify-start w-[80%]'>
                <button
                    onClick={()=>{
                        calculateScore();
                        addmarks();
                    }}
                    className='bg-green-500 px-10 py-2 text-white rounded-md shadow-md hover:bg-green-600'>
                    Submit Quiz
                </button>
            </div>

            {
                showscore && (
                   <div className='absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-70 flex justify-center items-center backdrop-blur-md' onClick={()=>setShowScore(false)}>
                     <div className=' h-52 w-[50%] bg-gray-700 rounded-md shadow-md flex flex-col items-center justify-center'>
                        <h1>Congratularion 🎉🎊</h1>
                        <h2>Your score: {score}</h2>

                    </div>
                    </div>
                )
            }
        </div>
    );
}

export default StartQuiz;
