import React, { useState } from 'react'
import Appinput from './Appinput'
import Appbtn from './Appbtn'
import axios from 'axios'
const API_URL = import.meta.env.VITE_SERVER_URI
import { closeSnackbar, useSnackbar } from 'notistack'

const Quizganarator = ({ setTotalQuestion, totalQuestion, quizname }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [viewQuiz, setViewQuiz] = useState(false)
    const [allquestion, setAllquestion] = useState([])
    const [curentQuestion, setCurrentQuestion] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAns: ''
    })
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...curentQuestion.options];
        updatedOptions[index] = value;
        setCurrentQuestion({
            ...curentQuestion,
            options: updatedOptions
        });
    };

    const click = () => {
        if (!curentQuestion.options || !curentQuestion.question || !curentQuestion.correctAns) {
            return enqueueSnackbar('Please fill all fields', { variant: 'error' });
        }

        setAllquestion([...allquestion, curentQuestion])

        setTotalQuestion([...totalQuestion, Math.random() * 100])


        setCurrentQuestion({
            question: '',
            options: ['', '', '', ''],
            correctAns: ''
        })


    }

    const handaSubmit = async () => {
        try {
            if (!curentQuestion.options || !curentQuestion.question || !curentQuestion.correctAns) {
                return enqueueSnackbar('Please fill all fields', { variant: 'error' });
            }
            let snackid = enqueueSnackbar('addting Quiz in DB...', { variant: "info" });
            const response = await axios.post(`${API_URL}/api/quiz/addquiz`, { name: quizname, allquestions: allquestion }, { withCredentials: true })
            if (response.data.success) {
                enqueueSnackbar(`${response.data.message}`, { variant: "success" });
                closeSnackbar(snackid)
            } else {
                enqueueSnackbar(`${response.data.message}`, { variant: "error" });
                closeSnackbar(snackid)
            }

        } catch (err) {
            const errorMessage = err.response && err.response.data ? err.response.data.message : 'An error occurred';
            enqueueSnackbar(errorMessage, { variant: 'error' });
            console.log(err);
        }
    }



    return (
        <div className='h-full w-[90%] flex flex-col gap-4'>
            <Appinput title='enter a question' value={curentQuestion.question} onChange={(e) => setCurrentQuestion({ ...curentQuestion, question: e.target.value })} />
            <div className='w-[70%]'><Appinput title='option 1 ' value={curentQuestion.options[0]} onChange={(e) => handleOptionChange(0, e.target.value)} /></div>
            <div className='w-[70%]'><Appinput title='option 2' value={curentQuestion.options[1]} onChange={(e) => handleOptionChange(1, e.target.value)} /></div>
            <div className='w-[70%]'><Appinput title='option 3' value={curentQuestion.options[2]} onChange={(e) => handleOptionChange(2, e.target.value)} /></div>
            <div className='w-[70%]'><Appinput title='option 4' value={curentQuestion.options[3]} onChange={(e) => handleOptionChange(3, e.target.value)} /></div>
            <div className='w-[70%]'><Appinput title='correct answer' value={curentQuestion.correctAns} onChange={(e) => setCurrentQuestion({ ...curentQuestion, correctAns: e.target.value })} /></div>
            <div className='w-full'>
                {
                    totalQuestion.length < 10 ?
                        <Appbtn title='next' onClick={() => click()} /> :
                        <div className='w-full h-full flex'>
                            <div className='w-[50%]'><Appbtn title='view' onClick={() => setViewQuiz(true)} /></div>
                            <div className='w-[50%]'><Appbtn title='upload' onClick={() => handaSubmit()} /></div>
                        </div>
                }
            </div>
            {
                viewQuiz ?
                    <div className='h-screen w-screen absolute top-0 left-0  backdrop-blur-md flex items-center justify-center bg-blur-gray'>
                        <div className="h-[90%] w-[80%] bg-gray-700 mt-20 overflow-hidden">
                            <span className='flex justify-end text-5xl text-gray-400 md:mr-2 cursor-pointer' onClick={() => { setViewQuiz(false) }}><i className="ri-close-line "></i>
                            </span>
                            <div className='h-full w-full overflow-y-scroll hide-scroll-bar'>
                                {
                                    allquestion.map((que, index) => (
                                        <div className='h-[300px] w-[80%] m-4 bg-gray-600 mx-auto rounded-md'>
                                            <div className='ml-4 text-2xl text-gray-300'>{index + 1} .{que?.question}</div>
                                            <div className='flex flex-col ml-10'>
                                                <span className='text-gray-400 '><i className="ri-circle-fill text-sm "></i> <span className='text-2xl'>{que?.options[0]}</span></span>
                                                <span className='text-gray-400 '><i className="ri-circle-fill text-sm"></i> <span className='text-2xl'>{que?.options[1]}</span></span>
                                                <span className='text-gray-400 '><i className="ri-circle-fill text-sm"></i> <span className='text-2xl'>{que?.options[2]}</span></span>
                                                <span className='text-gray-400 '><i className="ri-circle-fill text-sm"></i> <span className='text-2xl'>{que?.options[3]}</span></span>
                                            </div>
                                            <div className='h-4 w-full mt-5 ml-8'>
                                                <span className='bg-gray-700 p-2 mr-2 rounded-md'>Correct Ans </span>
                                                : <span className='text-2xl'>{que?.correctAns}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div> : null
            }
        </div>
    )
}

export default Quizganarator