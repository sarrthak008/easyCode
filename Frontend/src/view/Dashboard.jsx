import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { closeSnackbar, useSnackbar } from 'notistack'
import Appbtn from '../components/Appbtn'
const API_URL = import.meta.env.VITE_SERVER_URI


const CourseCard = ({course}) => {
  return (
    <div className='min-h-[300px] w-[90%] md:w-[60%] bg-gray-900 rounded-lg shadow-sm shadow-black m-3 p-2'>
      <div className='w-[95%]  min-h-[210px] px-2 flex flex-col sm:flex-row bg-gray-950 mx-auto py-2 items-center '>
        <div className='w-[90%] sm:w-[330px] h-[190px] bg-red-400 rounded-sm overflow-hidden'>
          <img src={course.image} className='h-full w-full object-fill'></img>
        </div>
        <div className='w-full sm:w-[50%] h-full  sm:ml-4 flex flex-col justify-evenly items-center gap-3 mt-5 sm:mt-0'>
          <button className='bg-green-500  py-2 font-medium text-xl w-[80%] shadow-md shadow-gray-900 hover:bg-green-800'>my progress</button>

          <button className='bg-green-500  py-2 font-medium text-xl w-[80%] shadow-md shadow-gray-900 hover:bg-green-800'>solve quiz</button>

          <button className='bg-green-500  py-2 font-medium text-xl w-[80%] shadow-md shadow-gray-900 hover:bg-green-800'>certificate</button>
        </div>
      </div>
      <div className='text-gray-500 text-[17px] text-center'><i className="ri-alarm-warning-fill"></i> please attend live lecutures to get certificate . you can ask doubt any time . admin have permission to remove you from online batch if you not attends lectures</div>
    </div>
  )
}

const AddFeedBack =({setOpenFeedback})=>{
   return(
     <div onClick={()=>setOpenFeedback(true)} className='h-[55px] w-[55px] bg-green-400 rounded-full flex items-center justify-center fixed bottom-12 cursor-pointer  right-12'>
         <i className="ri-feedback-fill text-black text-2xl"></i>
     </div>
   )
}

const Dashboard = () => {

  const [mycourses, setMycourses] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [openFeedback ,setOpenFeedback] = useState(false)

  const loadMycourses = async () => {
    let snackId = enqueueSnackbar('loding your courses data..', { variant: "info" })
    try {
      const responce = await axios.post(`${API_URL}/api/course/getmycourse`, null, { withCredentials: true })
      console.log(responce?.data?.data?.courses)
      if (responce.data.success) {
        setMycourses(responce?.data?.data?.courses)
        enqueueSnackbar(`course loaded`, { variant: 'success' })
        closeSnackbar(snackId)
      } else {
        enqueueSnackbar(`${responce.data.message}`, { variant: 'info' })
        closeSnackbar(snackId)
      }

    } catch (error) {
      console.log(error)
      enqueueSnackbar(`${error.message}`, { variant: 'error' })
      closeSnackbar(snackId)
    }
  }

  useEffect(() => {
    loadMycourses()
  }, [])

  return (
    <>
    <div className='h-screen w-screen relative'>
      <Navbar />
      <div className='h-screen w-screen flex items-center justify-center flex-wrap mt-24'>
        {
          mycourses?.map((course) => (
                <CourseCard course={course}/>
              ))
        }
      </div>
      <AddFeedBack setOpenFeedback={setOpenFeedback}/>
    </div>

    {openFeedback ? <div className='h-full w-full absolute top-0 left-0 backdrop-blur-sm flex justify-center items-center '>
       <div className='h-[80%] w-[90%] sm:w-[70%] bg-gray-700 rounded-md p-3 mt-10'>
         <h1 className='text-white text-center text-5xl hevy'>add your feedback</h1>
         <textarea  className=" bg-slate-500  p-2 w-[80%] mx-auto block text-white text-xl mt-8 resize-none outline-none border-0 border-b-2 border-b-green-400 h-[50%]"/>
         <div className='w-[100%] text-white ml-[10%] mt-7'><Appbtn title='submit'/></div>
       </div>
       <span  className='block text-white relative -top-56 text-4xl hover:text-green-400 cursor-pointer '><i className="ri-close-line" onClick={()=>{setOpenFeedback(false)}}></i></span>
    </div> : null}
    </>
  )
}

export default Dashboard