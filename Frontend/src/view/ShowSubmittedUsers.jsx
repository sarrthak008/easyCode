import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
const API_URL = import.meta.env.VITE_SERVER_URI
import ARROWSVG from '../assets/assignmetnarr.svg'


const ShowSubmittedUsers = () => {
    const { assignmentId } = useParams()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [allsubmissions, setallsubmissions] = useState([]);
    const [assignmentInfo, setassignmentInfo] = useState({});

    const LoadAssignmentByID = async () => {
        try {
            let responce = await axios.get(`${API_URL}/api/assignment/getassignmentById/${assignmentId}`)
            if (responce.data?.success) {
                enqueueSnackbar("assignment loaded suceessfully", { variant: "success" });
                setassignmentInfo(responce.data.data)
            }
            console.log(assignmentInfo, "hii")
        } catch (error) {
            console.log(error)
        }
    }


    const loadAssignmentAnswers = async () => {
        try {
            let snackid = enqueueSnackbar("load all submissions", { variant: "info" });
            let responce = await axios.get(`${API_URL}/api/answer/getallanswers/${assignmentId}`)
            if (responce.data.success) {
                closeSnackbar(snackid)
                enqueueSnackbar("submissions load successfully", { variant: "success" })
                setallsubmissions(responce.data?.data);
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" })
            console.log(error)
        }
    }


    useEffect(() => {
        LoadAssignmentByID();
        loadAssignmentAnswers();
    }, [])


    return (
        <div className='w-screen px-3'>
            <div className='sticky -top-[5%] left-0 bg-gradient-to-r to-green-900 from-gray-800 z-20 p-6 mt-2 rounded-2xl'>
                <div className='text-xl text-green-400 font-semibold'> <i className="ri-git-merge-fill"></i> Assignment Submissions !</div>
                <div className="text-3xl text-white font-bold mt-4">
                    {assignmentInfo.question ? assignmentInfo.question : <div className="w-[60%] h-10 bg-gray-400 animate-pulse rounded"></div>}
                </div>

                <div className="text-xl text-gray-400 mt-2">
                    {assignmentInfo.description ? assignmentInfo.description : <div className="w-[80%] h-6 bg-gray-500 animate-pulse rounded"></div>}
                </div>
            </div>
            <div className='w-full h-1 mt-10 bg-gray-400 rounded-xl relative flex items-center justify-center'>
                <span className='text-white bg-green-400 py-1 px-4 rounded-2xl '>submissions</span>
            </div>
            {/* show all subimited assignment here */}
            <div className='flex flex-col items-center justify-center min-h-screen'>
                {
                    allsubmissions.length == 0 ?
                        <div className='h-[80%] w-[80%]  opacity-85 flex items-center justify-center flex-col'>
                            <img src={ARROWSVG} className='h-[100px]' />
                            <div className='text-2xl text-gray-300 mb-4'>we are add assignment for youhh...</div>
                            <span className='text-gray-400 text-sm text-center'>"code, create, conquer. Every bug is a lesson, every line is progress. Keep going!" 🚀💻</span>
                        </div>
                        :  <>
                           {
                              allsubmissions.map((submission_info,index)=>(
                                   <div className='min-h-[300px] w-[90%] bg-gray-700'>
                                         
                                   </div>
                              ))
                           }  
                        
                        </>
                }
            </div>

        </div>
    )
}

export default ShowSubmittedUsers