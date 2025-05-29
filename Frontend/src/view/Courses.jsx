import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import Shadow from '../components/Shadow'
import CourseCard from '../components/CourseCard'
import axios from 'axios'
const API_URL = import.meta.env.VITE_SERVER_URI
import { CourseSkelleton } from '../components/Skelletons'
import { useStore } from '../context/Store'


const Courses = () => {
      
        const [courses, setCourses] = useState([])  
        const [getnumberComp,setnumberComp] = useState()
        const numberOfSkelleton = [1,2,3];
        const {loadNotificationNumber} = useStore()
        const {currentUser} = useStore()

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
          loadNotificationNumber()
        }, [])
  return (
    <div className='min-h-screen bg-black'>
       <Navbar/>
       <div className="mt-24 px-6 sm:px-12 md:px-20 flex items-start gap-6">
  {/* Glowing Left Bar */}
  <div className="w-1 rounded-full bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 shadow-lg shadow-emerald-500/30 animate-pulse"></div>

  {/* Content Section */}
  <div className="space-y-5 max-w-3xl">
    {/* Main Heading */}
    <h2 className="text-white font-extrabold text-[44px] sm:text-[48px] leading-tight tracking-tight">
      We believe in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">skills</span>,<br />
      not just certificates.
    </h2>

    {/* Subheading */}
    <p className="text-gray-400 text-base sm:text-lg font-medium leading-relaxed">
      It’s not about what you’ve collected — it’s about what you’ve created.  
      Master real-world skills that turn ideas into impact.
    </p>

    {/* Motivational Quote */}
    <p className="text-gray-500 text-sm italic pt-2">
      "Certificates show your path. Skills show your power."
    </p>
  </div>
</div>

       { courses.length ==0  ? 
         <div className='flex flex-wrap justify-evenly items-center gap-4 mt-8 p-4 '>
         {
            numberOfSkelleton.map((c,index)=>(
               <CourseSkelleton key={index}/>
            ))
          }
      </div> : null
       }

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