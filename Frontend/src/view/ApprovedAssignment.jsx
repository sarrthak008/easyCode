import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const API_URL = import.meta.env.VITE_SERVER_URI

import ARROWSVG from '../assets/assignmetnarr.svg'


function ApprovedAssignment() {  
    const { courseId } = useParams()

    const [assignment, setAssignment] = useState([])
    const LoadAssignment = async () => {
        try {
            let responce = await axios.get(`${API_URL}/api/assignment/getallcourseassignments/${courseId}`)
            console.log(responce.data)
            setAssignment(responce.data.data?.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        LoadAssignment()
    }, [])

    const HandelAssignmentnOpen = (info) =>{
        window.open(`http://localhost:5173/showSubmitedUsers/${info._id}`,"_blank")
     }
    return (

        <>
            <div className='fixed top-0 left-0 h-screen w-screen  bg-black bg-opacity-70 flex justify-center items-center    backdrop-blur-md z-50 cursor-pointer' onClick={() => { setAssignmetn(false) }}>
                <>
                    {
                        assignment.length == 0 ?
                            <div className='h-[80%] w-[80%] bg-gray-900 opacity-85 flex items-center justify-center flex-col' onClick={(e) => e.stopPropagation()}>
                                <img src={ARROWSVG} className='h-[100px]' />
                                <div className='text-2xl text-gray-300 mb-4'>we are add assignment for youhh...</div>
                                <span className='text-gray-400 text-sm text-center'>"code, create, conquer. Every bug is a lesson, every line is progress. Keep going!" 🚀💻</span>
                            </div>
                            :
                            <div className='h-[80%] w-[80%] bg-gray-900 opacity-85 flex items-center justify-center flex-col' onClick={(e) => e.stopPropagation()}>
                                <>
                                    {
                                        assignment?.map((assignmetn_info, index) => (
                                            <div key={index} className='min-h-[60px] w-[80%] bg-gray-600 my-6 mx-auto rounded-lg flex overflow-hidden cursor-pointer shadow-sm hover:scale-[1.01] shadow-green-500'
                                                onClick={() => HandelAssignmentnOpen(assignmetn_info)}
                                            >
                                                <div className='hidden sm:flex sm:w-10 bg-red-200 flex items-center justify-center button-8 '
                                                >
                                                    <i class="ri-code-s-slash-line text-4xl"></i>
                                                </div>
                                                <div className='w-[90%] flex items-center justify-between px-2 py-3'>
                                                    <div className="text-xl text-gray-400 text-center font-medium">{assignmetn_info?.assignmetName}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            </div>

                    }
                </>
            </div>
        </>
    )
}

export default ApprovedAssignment