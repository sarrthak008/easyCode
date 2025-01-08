import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '../../context/Store'
const API_URL = import.meta.env.VITE_SERVER_URI

const CourseStudent = () => {

    const { settingCourse } = useStore()
    const [batchStudent ,setBatchStudents] = useState([]) 

    const loadBatchStudent = async () => {

        try {
            const responce = await axios.post(`${API_URL}/api/course/getcoursstudent`, {courseId:settingCourse}, {
              withCredentials: true
            })
            console.log(responce.data?.data)

          } catch (error) {
            console.log(error)
          }
        }

        useEffect(()=>loadBatchStudent(),[])

  return (
    <div className='h-full w-full'>
      <div className='text-5xl text-white hevy text-green ml-4 '>batch student</div>
      <div className='flex h-full  gap-12 evenly flex-wrap mt-4 '>
    
         //requestedusers?.length == 0 ? 
            <div className='h-[80vh] w-[80%] flex items-center justify-center text-gray-300 flex-col mx-auto'>
               <h2 className='text-4xl sm:text-6xl font-medium text-linear text-center'>no one is here</h2>
               <span className='text-[12px] sm:text-xl text-center text-gray-400'>Success is like writing clean code small efforts, step by step, with consistency and patience, lead to perfection</span>
            </div> 
           //null
       
      </div>
    </div>
  )
}

export default CourseStudent