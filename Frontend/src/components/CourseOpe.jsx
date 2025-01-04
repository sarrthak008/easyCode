import React from 'react'
import AdminCourseCard from './AdminCourseCard'

const CourseOpe = () => {

    const [courses, setCourses] = useState([])

      const fetchCourses = async () => { 
        console.log(API_URL)
         try{
            let responce = await axios.get(`${API_URL}/api/course/getcourse/`)
            setCourses(responce.data.data)
         }catch(error){
            console.log(error)
         }
      }
    

     useEffect(() => {
        fetchCourses()
      }, [])
    

    return (
        <>
            <div className='min-h-[100vh] w-[100vw] mt-16 flex flex-col gap-6'>
                   <AdminCourseCard />
            </div>
        </>
    )
}

export default CourseOpe