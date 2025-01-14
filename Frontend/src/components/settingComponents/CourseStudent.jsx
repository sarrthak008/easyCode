import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '../../context/Store'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI


const StudentCards = ({user})=>{
  console.log(user)
  return(
    <div className=' w-80 sm:w-96 bg-gray-900 backdrop-blur-md p-4 ml-2 sm:ml-0'>
      <div className='flex text-gray-400 gap-4 '>
         <div className='h-[65px] w-[65px] bg-red-300 rounded-full overflow-hidden'>
           <img src={user?.profilePic}/>
         </div>
         <div>
           <span className='text-[16px] line-clamp-1'>{user?.mobile}</span>
           <span className='text-[16px] line-clamp-1'>{user?.email}</span>
           <span className='text-[16px] line-clamp-1'>{user?.name}</span>
         </div>
      </div>
      <div className='text-gray-400 mt-1'>requested at : {user?.createdAt?.split("T")[0]}</div>
      <div className='flex-wrap flex mt-2 '>
         <button className='w-full sm:w-[40%] m-3 text-center shadow-lg hover:bg-green-500   bg-green-400 py-1 text-2xl'>accept <i className="ri-user-add-line"></i></button>
         <button className='w-full sm:w-[40%] m-3 text-center shadow-lg hover:bg-red-500  bg-red-800  py-1 text-2xl' >reject <i className="ri-user-unfollow-line"></i></button>
      </div>
    </div>
  )
}


const CourseStudent = () => {

     const {id} =  useParams()
     const [batchStudent ,setBatchStudents] = useState([]) 

    const loadBatchStudent = async () => {

        try {
            const responce = await axios.post(`${API_URL}/api/course/getcoursstudent`, {courseId:id}, {
              withCredentials: true
            })
             setBatchStudents(responce.data.data[0].students)
              console.log(responce.data.data[0].students)
          } catch (error) {
            console.log(error)
          }
        }

        useEffect(()=>{
          loadBatchStudent()
        },[])

  return (
    <div className='h-full w-full'>
      <div className='text-5xl text-white hevy text-green ml-4 '>batch student</div>
      <div className='flex h-full  gap-12 evenly flex-wrap mt-4 '>
    
         {batchStudent.length <=0 ?
            <div className='h-[80vh] w-[80%] flex items-center justify-center text-gray-300 flex-col mx-auto'>
               <h2 className='text-4xl sm:text-6xl font-medium text-linear text-center'>no one is here</h2>
               <span className='text-[12px] sm:text-xl text-center text-gray-400'>Success is like writing clean code small efforts, step by step, with consistency and patience, lead to perfection</span>
            </div>  : batchStudent.map((user)=>(
               <StudentCards user={user}/>
            ))
           }
       
      </div>
    </div>
  )
}

export default CourseStudent