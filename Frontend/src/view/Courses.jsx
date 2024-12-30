import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import Shadow from '../components/Shadow'
import CourseCard from '../components/CourseCard'
import axios from 'axios'



const Courses = () => {
       const [courses, setCourses] = useState([])

       const fetchCourses = async () => { 
        const response =  await axios.get("http://localhost:3000/api/course/getcourse")
        console.log(response.data.data)
        setCourses(response.data.data)
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
       <CourseCard 
        courses={courses}
       />

       <Shadow/>
    </div>
  )
}

export default Courses