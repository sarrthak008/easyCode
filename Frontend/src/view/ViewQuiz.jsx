import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import StartQuiz from './StartQuiz';

const API_URL = import.meta.env.VITE_SERVER_URI;

const ViewQuiz = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const [quizData, setQuizData] = useState([]);
    const [viewQuiz, setViewQuiz] = useState(false); // Assuming this is a state you'll use

    const responce = async () => {
        try {
            const responseData = await axios.get(`${API_URL}/api/quiz/getquestion/${id}`, { withCredentials: true });

            if (responseData.data?.success) {
                setQuizData(responseData?.data?.data);
                enqueueSnackbar('Quiz loaded', { variant: 'success' });
            } else {
                console.log('error');
            }
        } catch (error) {
            console.error('Error loading quiz:', error);
            enqueueSnackbar(`Error loading quiz: ${error.message || 'An unexpected error occurred'}`, { variant: 'error' });
        }
    };

    useEffect(() => {
        responce();
    }, []);

    const linkQuiz = () => {
        // Implement logic for linking the quiz
        console.log('Linking quiz');
    };

    const updateQuizstatus = () => {
        // Implement logic for updating quiz status (lock/unlock)
        console.log('Updating quiz status');
    };

    return (
        <div>
            <h1 className='text-center text-7xl text-white'>hiiii</h1>
            <div className='flex flex-col space-y-4'>
                {
                    quizData?.map((quiz) => (
                         
                        <div key={quiz._id} className='text-white min-h-[150px] relative bg-gray-800 mt-5 w-[75%] p-4 rounded-md shadow-sm shadow-green-600 mx-auto'>
                            {console.log(quiz)}
                            <div className='text-xl'>{quiz?.quizId?.name}</div>
                            <div className='text-sm text-gray-500'>{quiz?._id}</div>
                            <div className='mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-7'>
                               <Link to={''}> <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500' >start  <i className="ri-eye-fill"></i></button></Link>
                                <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500' >my score  <i className="ri-eye-fill"></i></button>
                                <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500' >leader board <i className="ri-eye-fill"></i></button>
                                {quiz?.isLock ?
                                    <span className='bg-green-400 px-3 py-[2px]  text-black text-[18px]  rounded-bl-lg shadow-sm shadow-black hover:bg-green-500 absolute top-0 right-0 shine-effect'>unlock <i className="ri-lock-unlock-fill"></i></span>
                                    :
                                    
                                    <span className='bg-green-400 px-3 py-[2px] text-black text-[18px]  rounded-bl-lg shadow-sm shadow-black hover:bg-green-500 absolute top-0 right-0 shine-effect'>lock <i className="ri-lock-unlock-fill"></i></span>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ViewQuiz;
