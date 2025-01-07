import React,{useEffect,useState} from 'react'
import AdminCourseCard from './AdminCourseCard'
const API_URL = import.meta.env.VITE_SERVER_URI
import axios from 'axios'


const CourseOpe = () => {

  const [courses, setCourses] = useState([])

  const fetchCourses = async () => {
   // console.log(API_URL)
    try {
      let responce = await axios.get(`${API_URL}/api/course/getcourse`)
      setCourses(responce.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchCourses()
  }, [])


  return (
    <>   
      <div className='min-h-[100vh] w-[100vw] mt-20 flex-wrap flex justify-evenly'>
          {
            courses.map((course,index)=>(
              <AdminCourseCard course={course} key={index}/>
            ))
          }
      </div>
    </>
  )
}

export default CourseOpe