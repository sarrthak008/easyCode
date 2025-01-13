import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { closeSnackbar, useSnackbar } from 'notistack'
import Appbtn from '../components/Appbtn'
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import Shadow from "../components/Shadow"
import UserSpeedDialer from '../components/userSpeedDialer'

const CourseCard = ({ course }) => {
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

const AddFeedBack = ({ setOpenFeedback }) => {
  return (
    <div onClick={() => setOpenFeedback(true)} className='h-[55px] w-[55px] bg-green-400 rounded-full flex items-center justify-center fixed bottom-12 cursor-pointer  right-12'>
      <i className="ri-feedback-fill text-black text-2xl"></i>
    </div>
  )
}

const Dashboard = () => {

  const [mycourses, setMycourses] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [openFeedback, setOpenFeedback] = useState(false)
  const [feedback, setFeedBack] = useState('')

  const loadMycourses = async () => {

    let snackId = enqueueSnackbar('loding your courses data..', { variant: "info" })
    try {
      const responce = await axios.post(`${API_URL}/api/course/getmycourse`, null, { withCredentials: true })
      //console.log(responce?.data?.data?.courses)
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

  const postFeedBack = async () => {
    try {
      let snackId = enqueueSnackbar('submiting your feedback', { variant: "info" })
      const responce = await axios.post(`${API_URL}/api/feedback/addfeedback`, { description: `${feedback}` }, { withCredentials: true });
      if (responce.data.success) {
        closeSnackbar(snackId)
        loadPreviousFeedBack()
        return enqueueSnackbar(`${responce.data.message}`, { variant: "success" })
      }
      return enqueueSnackbar(`${responce.data.message}`, { variant: 'warning' })
    } catch (error) {
      closeSnackbar(snackId)
      return enqueueSnackbar(`${error.message}`, { variant: "error" })
    }
  }

  const loadPreviousFeedBack = async () => {
    try {
      const responce = await axios.get(`${API_URL}/api/feedback/getfeedback`, { withCredentials: true })
      setFeedBack(responce.data?.data?.description)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadMycourses()
    loadPreviousFeedBack()
  }, [])

  return (
    <>
      <Navbar />
      <div className='h-screen w-screen relative'>
        <div className='h-screen w-screen flex items-center justify-center flex-wrap mt-24'>
          {
            mycourses?.length == 0 ? <div className=' h-80 font-medium text-7xl text-linear text-center'>
              <div>Nothing To Show</div>
              <Link>
                <Link to={'/course'}><span className='text-xl underline font-extralight text-gray-400'>buy course</span></Link></Link>
            </div> :
              mycourses?.map((course) => (
                <CourseCard course={course} />
              ))
          }
        </div>
      </div>

      <Shadow />
      <div className='fixed bottom-20 right-14'>
        <UserSpeedDialer />
      </div>
    </>
  )
}

export default Dashboard