    import React, { useState, useEffect } from 'react';
    import { useStore } from '../context/Store';
    import axios from 'axios';
    const API_URL = import.meta.env.VITE_SERVER_URI;

    import { closeSnackbar, useSnackbar } from 'notistack'
      import { Link } from 'react-router-dom';

    function StartQuiz() {
        const { enqueueSnackbar } = useSnackbar()

        const [userAnswers, setUserAnswers] = useState({});
        const [showscore, setShowScore] = useState(false);
        const [score, setScore] = useState(0);
        const { openquiz ,currentUser} = useStore();

        const handleAnswerChange = (questionId, selectedAnswer) => {
            setUserAnswers(prev => ({
                ...prev,
                [questionId]: selectedAnswer
            }));
        };

        const calculateScore = () => {

               if (Object.keys(userAnswers).length !== openquiz.quizId.allquestions.length) {
                return enqueueSnackbar('Please answer all questions', { variant: 'error' });
            }
            let score = 0;
            
        
            openquiz?.quizId?.allquestions.forEach((question) => {
                const correctAnswer = question?.correctAns?.trim().toLowerCase();
                const userAnswer = userAnswers[question._id]?.trim().toLowerCase();
        
                console.log(`Question: ${question.question}`);
                console.log(`User Answer: "${userAnswer}", Correct Answer: "${correctAnswer}"`);
        
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
                if (responce.data.success) {
                    console.log(responce.data.message);
                return  enqueueSnackbar(`${responce.data.message}`,{variant:'info'})
                } else {    
                    console.log(responce.data.message);
                    
                return  enqueueSnackbar(`${responce.data.message}`,{variant:'info'})
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        const handleSubmit = async () => {
            calculateScore();
            await addmarks();
        };

        const bakcToQuiz = () => {
            
            window.history.back()
        }
        return (
            <div className='h-screen w-screen flex flex-col items-center relative'>
                <h1 className='text-green-700 text-4xl text-center font-bold'>
                    {openquiz.quizId.name}
                </h1>

                <div className='h-full w-[80%] bg-slate-600 rounded-md shadow-md p-4 overflow-y-scroll hide-scroll-bar'>
                <div className=' h-[35px] w-[35px] absolute top-6 right-24 bg-green-500 rounded-full flex justify-center items-center text-2xl cursor-pointer' onClick={bakcToQuiz}> 
                    
                     <i class="ri-close-fill"></i></div> 
                     {console.log(openquiz)}
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
                        onClick={handleSubmit}
                        className='bg-green-500 px-10 py-2 text-white rounded-md shadow-md hover:bg-green-600'>
                        Submit Quiz
                    </button>
                </div>

                {
                    showscore && (
                    <div className='absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-70 flex justify-center items-center backdrop-blur-md' onClick={()=>{
                        setShowScore(false)
                        addmarks()
                    }
                    }>
                        <div className=' h-52 w-[50%] bg-gray-700 rounded-md shadow-md flex flex-col items-center justify-center'>
                            <h1 className='text-white text-2xl'>Congratularion 🎉🎊</h1>
                            <h2 className='text-white text-2xl'>Your score: {score}</h2>
                        </div>
                        </div>
                    )
                }
            </div>
        );
    }

    export default StartQuiz;
