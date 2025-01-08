import React,{useEffect,useState} from 'react'
import AdminCourseCard from '../components/AdminCourseCard'
const API_URL = import.meta.env.VITE_SERVER_URI
import axios from 'axios'
import Speeddial from '../components/Speeddial'
import Shadow from '../components/Shadow'
import Navbar from '../components/Navbar'

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
    <Navbar/>   
      <div className='min-h-[100vh] w-[100vw] mt-20 flex-wrap flex justify-evenly'>
          {
            courses.map((course,index)=>(
              <AdminCourseCard course={course} key={index}/>
            ))
          }
      </div>
      <Shadow/>
      <div className='fixed bottom-16 right-10'>
          <Speeddial/>
    </div>
    </>
  )
}

export default CourseOpe