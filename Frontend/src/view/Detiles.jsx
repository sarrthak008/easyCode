import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import FAINT_BG from "../assets/faint.svg"
import Navbar from '../components/Navbar'
import SyllabusCard from '../components/SyllabusCard'

const Detiles = () => {

  let { id } = useParams()
  const [courseinfo, setCourseinfo] = useState({})

  useEffect(()=>{
      try {
         let res= JSON.parse(localStorage.getItem("courses")).filter((courseinfo)=>courseinfo._id ==id)
         setCourseinfo(res[0])
      } catch (error) {
        console.log(error)
      }
  },[])

  return (
    <div className='h-lvh w-lvw '>
      <Navbar/>
        <div className=' h-full w-full relative'>
         <img src={FAINT_BG} className=' w-full object-fill fixed top-4 opacity-30'/>
         {/*ADD COURSE INFO HERE>>> */}
         <div className='min-h-96 w-full absolute top-0 flex items-center  flex-col mt-20 gap-7'>
             <h1 className='text-4xl sm:text-7xl font-bold text-white uppercase text-center text-linear'>{"MERN FULL STACK WEB DEVELOPMENT"}</h1>
             <h3 className='text-2xl sm:text-3xl text-gray-400'>{"make thing with code"}</h3>
             <div className='h-20 w-full flex items-center justify-evenly'>
                <span className='text-sm sm:text-2xl text-gray-400 font-medium'><i className="ri-calendar-schedule-line"></i> {courseinfo?.startingDate?.split("T")[0]}</span>
                <span className='text-sm sm:text-2xl text-gray-400 font-medium'><i className="ri-group-3-fill">{courseinfo?.students?.length}</i></span>
                <span className='text-sm sm:text-2xl text-gray-400 font-medium'><i class="ri-hourglass-fill"></i> {courseinfo?.duration} month</span>
             </div>
             <div className='text-3xl font-bold text-gray-500 uppercase'>We Learn</div>
             {courseinfo.Syllabus?.map((syllabus,index)=>(
               <SyllabusCard syllabus={syllabus} key={index} />
             ))}
         </div>
        </div>
    </div>
  )
}

export default Detiles