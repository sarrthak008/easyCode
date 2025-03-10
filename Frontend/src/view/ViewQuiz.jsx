import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Navbar from '../components/Navbar'
import StartQuiz from './StartQuiz';
import { useStore } from '../context/Store';
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import ICONPNG from "../assets/emoji.png";
import { use } from 'react';


const API_URL = import.meta.env.VITE_SERVER_URI;


const ViewMyScore = ({ setMyScoreComp, quizId }) => {

    let { currentUser } = useStore()
    const [userId, setUserId] = useState(currentUser()._id)
    const [marks, setmarks] = useState()


    const loadMarks = async () => {
        console.log('loading marks');
        try {

            const response = await axios.post(`${API_URL}/api/marks/getmarks`,
                {
                    studentId: `${userId}`,
                    quizId: `${quizId}`
                }
                , { withCredentials: true });

            console.log(response.data)

            if (response.data?.success) {
                //console.log(response.data?.data.marks)
                setmarks(parseInt(response.data?.data.marks))
            } else {
                console.log(response.data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadMarks()
    }, [])

    const data = {
        labels: ['correct', "wrong"],
        datasets: [
            {
                data: [marks, 10 - marks],
                backgroundColor: ['#00db80', "tomato"],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                borderWidth: 0
            },
        ],
    };

    return (
        <>

            <div className="h-screen w-screen absolute top-0 left-0 backdrop-blur-md  flex justify-center items-center cursor-pointer" onClick={() => setMyScoreComp(false)}>
                <div className='min-w-96 h-[350px] rounded-md bg-gray-700 p-2 flex items-center justify-center flex-col' onClick={(e) => e.stopPropagation()}>
                    <h1 className='text-4xl text-white hevy text-green'>{marks ? "my marks" : null}</h1>
                    <div className='h-[250px] w-[250px]'>
                        {!marks ?
                            <div className='h-[250px] w-[250px] flex items-center justify-center text-white text-2xl flex-col'>
                                <img src={ICONPNG} alt="icon" className='h-[80%] w-[80%] animate-bounce' />
                                <span className='text-gray-300 font-thin'>you solve quiz ? </span>
                            </div> :
                            <Doughnut data={data} />}
                    </div>
                    <span className='text-2xl text-gray-400 font-semibold'>{marks}</span>
                </div>
            </div>
        </>
    )
}

    const Viewleaderboard = ({setleatherBoardComp,quizId }) => {

        const [topStudent,setTopStudents] = useState([])

         const loadTopStudents = async () => { 
             try{
                
                 const response =  await axios.post(`${API_URL}/api/marks/gettopstudent`, {
                     quizId:`${quizId}`
                 },{ withCredentials: true });
                 
                 setTopStudents(response.data?.data)
              
             }catch(error){
                console.log('error')
             }
         }

         useEffect(() => {
             loadTopStudents()
         },[])

         console.log(topStudent)

        return (
            <>
                <div className="h-screen w-screen absolute top-0 left-0 backdrop-blur-md  flex justify-center items-center cursor-pointer" onClick={() => setleatherBoardComp(false)}>
                    <div className='min-w-96 h-[300px] rounded-md bg-gray-700 p-2 flex items-center justify-center flex-col' onClick={(e) => e.stopPropagation()}>
                        <h1 className='text-4xl text-white hevy text-green'>leader board</h1>
                        {
                            topStudent.length > 0 ? 
                            <div className='h-[200px] w-[400px] relative flex items-center justify-center gap-2 md:gap-9'>
                            <div className='flex flex-col'>
                              <div className='h-[80px] w-[80px] rounded-full bg-gray-800 shadow-2xl shadow-blue-500 overflow-hidden border-4 border-gray-100'>
                                  <img src={topStudent[1]?.studentId?.profilePic} alt="icon" className='h-full w-full object-fill'/>
                              </div>
                              
                              <span className='text-center text-sm text-gray-300 uppercase'>{topStudent[1]?.studentId?.name ? topStudent[1]?.studentId?.name.split(" ")[0] : "loading..."}</span>
                            </div>

                            <div className='flex flex-col'>
                              <div className='h-[100px] w-[100px] rounded-full bg-gray-800 shadow-2xl shadow-green-500 overflow-hidden border-4 border-yellow-300'>
                                <img src={topStudent[0]?.studentId?.profilePic} alt="icon" className='h-full w-full object-fill'/>
                              </div>
                              
                              <span className='text-center text-sm text-gray-300 uppercase font-bold'>{topStudent[0]?.studentId?.name.split(" ")[0] ? topStudent[0]?.studentId?.name.split(" ")[0] : "loading..."}</span>
                            </div>

                            <div className='flex flex-col'>
                              <div className='h-[80px] w-[80px] rounded-full bg-gray-800 shadow-2xl shadow-blue-500 overflow-hidden border-4 border-rose-900'>
                                <img src={topStudent[2]?.studentId?.profilePic} alt="icon" className='h-full w-full object-fill' />
                              </div>
                              <span className='text-center text-sm text-gray-300 uppercase'>{topStudent[2]?.studentId?.name.split(" ")[0] ? topStudent[2]?.studentId?.name.split(" ")[0] : "loading..."}</span>
                            </div>
                        </div> : 
                          <div className='h-[200px] w-[400px] flex items-center justify-center text-white text-2xl flex-col'>
                             <span className='text-gray-200 text-2xl font-bold'>Loading....</span>
                             <span className='text-gray-500 text-xl'>please check after some time..</span>
                          </div>
                        }
                    </div>
                </div>
            </>
        )
    }

    const ViewQuiz = () => {
        const { enqueueSnackbar } = useSnackbar();
        const { id } = useParams();
        const [quizData, setQuizData] = useState([]);
        const [viewQuiz, setViewQuiz] = useState(false);
        const [myScoreComp, setMyScoreComp] = useState(false);
        const { openquiz, setOpenquiz } = useStore()
        const [quizId, setQuizId] = useState()
        const [leatherBoardComp, setleatherBoardComp] = useState(false)
        const naviage = useNavigate()

        const responce = async () => {
            try {
                const responseData = await axios.get(`${API_URL}/api/quiz/getquestion/${id}`, { withCredentials: true });

                if (responseData.data?.success) {
                    setQuizData(responseData?.data?.data);
                    enqueueSnackbar('Quiz loaded', { variant: 'success' });
                } else {
                    enqueueSnackbar('Error loading quiz', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error loading quiz:', error);
                enqueueSnackbar(`Error loading quiz: ${error.message || 'An unexpected error occurred'}`, { variant: 'error' });
            }
        };

    useEffect(() => {
        responce();
    }, []);

  const startQuiz = async (quiz) => {
    setOpenquiz(quiz) 
    naviage('/startquiz')
  }

    return (
        <div>
            <Navbar />
            <div className='flex flex-col space-y-4 mt-12'>
                {
                    quizData?.map((quiz) => (

                        <div key={quiz._id} className='text-white min-h-[150px] relative bg-gray-800 mt-5 w-[75%] p-4 rounded-md shadow-sm shadow-green-600 mx-auto'>
                            {/* {console.log(quiz)} */}
                            <div className='text-xl'>{quiz?.quizId?.name}</div>
                            <div className='text-sm text-gray-500'>{quiz?._id}</div>
                            <div className='mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-7'>
                                
                                    
                                    
                                   
                                <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500'
                                 onClick={() => {quiz.isLock? startQuiz(quiz) : enqueueSnackbar("quiz is lock",{variant:"error"})}}>start  <i className="ri-eye-fill"></i>
                                 </button>
                                 
                                 
                                <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500' onClick={() => {
                                    setMyScoreComp(true)
                                    setQuizId(quiz?.quizId?._id)
                                }}>my score  <i className="ri-eye-fill"></i></button>
                                <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500' onClick={()=>{
                                    setleatherBoardComp(true)
                                    setQuizId(quiz?.quizId?._id)
                                }} >leader board <i className="ri-eye-fill"></i></button>
                                {quiz?.isLock ?
                                    <span className='bg-green-400 px-3 py-[2px]  text-black text-[18px]  rounded-bl-lg shadow-sm shadow-black hover:bg-green-500 absolute top-0 right-0 shine-effect'>unlock <i className="ri-lock-unlock-fill"></i></span>
                                    :

                                    <span className='bg-green-400 px-3 py-[2px] text-black text-[18px]  rounded-bl-lg shadow-sm shadow-black hover:bg-green-500 absolute top-0 right-0 shine-effect'>lock <i className="ri-lock-fill"></i></span>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            {myScoreComp ? <ViewMyScore setMyScoreComp={setMyScoreComp} quizId={quizId} /> : null}
            {leatherBoardComp ? <Viewleaderboard setleatherBoardComp={setleatherBoardComp} quizId={quizId}/> : null}
        </div>
    );
}

export default ViewQuiz;
