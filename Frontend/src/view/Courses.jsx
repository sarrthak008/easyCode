import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import Shadow from '../components/Shadow'
import CourseCard from '../components/CourseCard'
import axios from 'axios'
const API_URL = import.meta.env.VITE_SERVER_URI



const Courses = () => {
      
        const [courses, setCourses] = useState([])  
      

        const fetchCourses = async () => { 
          //console.log(API_URL)
           try{
              let responce = await axios.get(`${API_URL}/api/course/getcourse/`)
              setCourses(responce.data.data)
              responce.data.data.map((course)=>course.requetes = false)
              localStorage.setItem("courses",JSON.stringify(responce.data.data))
           }catch(error){
              console.log(error)
           }
        }
      

       useEffect(() => {
          fetchCourses()
        }, [])
  return (
    <div>
       <Navbar/>
       <div className='text-gray-700 text-2xl mt-20 text-center'>
          <span>We belive on <br/> <span className='text-green font-bold text-9xl hevy '>Skills</span> <br/> not on certificate.</span>
       </div>
       <div className='flex flex-wrap justify-evenly items-center gap-4 mt-8 p-4'>
          {courses.map((course, index) => (
        <CourseCard key={index} course={course} index={index} /> // Pass course and index correctly
           ))}
       </div>
       <Shadow/>
    </div>
  )
}

export default Courses