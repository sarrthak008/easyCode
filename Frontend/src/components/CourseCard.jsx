import React, { useState } from 'react'
import Appbtn from './Appbtn'
import { Link, } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useStore } from '../context/Store';
const API_URL = import.meta.env.VITE_SERVER_URI
import Appinput from "./Appinput"


const CourseCard = ({ course, index }) => {
  //  console.log(courses)

  let courses = JSON.parse(localStorage.getItem('courses'))
  const [isrequested, setrequested] = useState(courses[index].requetes)
  const { currentUser } = useStore()
  const [getMobComp, setMobComp] = useState(false);
  const [mobileNum, setmobileNum] = useState('')
  const [isLink,setisLink] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const handelRequest = async (course, index) => {

    try {
      const token = Cookies.get('token')
      if (!token) {
        return enqueueSnackbar("login to send course request", { variant: 'error' });
      }

      if (course.requetes) {
        return enqueueSnackbar("alredy requested please wait", { variant: 'error' });
      }

      try {
        const responce = await axios.post(`${API_URL}/api/request/reqcourse/${course._id}`, null, {
          withCredentials: true
        })

        if (responce?.data?.success) {
          enqueueSnackbar(responce.data.message, { variant: 'success' });
          let courses = JSON.parse(localStorage.getItem('courses'))
          courses[index].requetes = true
          setrequested(true)
          localStorage.setItem("courses", JSON.stringify(courses))
        } else {
          enqueueSnackbar(responce.data.message, { variant: 'info' });
        }

      } catch (error) {
        return enqueueSnackbar(`${error.message}`, { variant: 'error' });
      }

    } catch (err) {
      console.log(err)
    }
  }

  const checkMobile = async (course, index) => {

    if (!currentUser()) {
      return enqueueSnackbar("login to send course request", { variant: 'error' });
    } else if (!currentUser()?.mobile) {
      setMobComp(true)
      isLink ? handelRequest(course,index):null
    } else {
      handelRequest(course, index);
    }
  }

  const handelMobileNum = async () => {

    if (mobileNum < 0 || mobileNum.length != 10) {
      enqueueSnackbar("please enter valid mobile number", { variant: "error" });
    } else {
      enqueueSnackbar('trying to request...', { variant: "info" })
      try {

        const response = await axios.post(`${API_URL}/api/auth/linkmobile`, {
          id: currentUser()._id,
          mobile: mobileNum
        }, { withCredentials: true });

        if (response.data.success) {
          setisLink(true)
          setMobComp(false)
          enqueueSnackbar(response.data.message, { variant: 'success' });
        }

      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <div key={course._id} className='bg-gray-800 w-[350px] h-[500px] rounded-lg  p-1 text-white relative'>
        <img src={course.image} alt={course.name} className='w-full h-[200px] rounded-md' />
        <div className='flex  mt-4 flex-col h-[120px] justify-between'>
          <h2 className='text-2xl text-center text-gray-300'>{course.name}</h2>
          <div className='flex gap-2 mt-5 items-center mx-2 ' >
            <span className='text-3xl text-center font-semibold text-gray-300'><CurrencyRupeeIcon className='mb-[3px] ' />{course.prise}</span>
            <span className='text-[15px] text-center font-semibold mt-[10px] ml-1 text-green'><del><CurrencyRupeeIcon className='mb-[3px] ' sx={{ fontSize: '15px' }} />{course.originalprise}</del></span>
            <span className='text-[16px] text-center mt-2 ml-3  text-gray-300'><i className="ri-calendar-schedule-line"></i> {course?.startingDate?.split("T")[0]}</span>
          </div>
        </div>
        <div className='mt-6 flex flex-col gap-4 m-auto'>
          {
            isrequested ?
              <button className='bg-[#00DB80] text-white w-[81%] ml-4 py-2 text-2xl text-black rounded-sm hover:bg-green-700 shadow-lg shadow-gray-900 ' onClick={() => handelRequest(course, index)}>requested</button>
              :
              <button className='bg-[#00DB80] text-white w-[81%] ml-4 py-2 text-2xl text-black rounded-sm hover:bg-green-700 shadow-lg shadow-gray-900 ' onClick={() => checkMobile(course, index)}>request course</button>
          }
          <Link to={`/course/${course._id}`} className='w-full px-4'><button className='bg-[#00DB80] text-white w-[90%] mx-auto py-2 text-2xl text-black rounded-sm hover:bg-green-700 shadow-lg shadow-gray-900 '>view details</button></Link>
        </div>
        <span className="bg-green-600 py-1 px-1 absolute -top-1 z-20 overflow-hidden  -right-4 rounded-md shadow-md shadow-black">{course.discount}% off</span>
      </div>

      {
        getMobComp ? <div className='h-screen w-screen absolute top-0 left-0 z-30 backdrop-blur-md  flex items-end'>
          <div className="h-[50%] sm:w-[85%] w-[90%] bg-gray-700  mx-auto rounded-t-2xl p-4 flex flex-col items-center gap-4">
            <h2 className="text-green-400 text-center text-2xl sm:text-3xl font-medium">umm, required your number ! </h2>
            <div className="w-[100%] sm:w-[40%] text-white flex flex-col gap-4">
              <Appinput title='eg: 8459360294 ' type="number" onChange={e => setmobileNum(e.target.value)} value={mobileNum} />
              <button className="py-2 px-5 bg-green-400" onClick={() => handelMobileNum()}>done</button>
              { }
            </div>
          </div>
        </div>
          : null
      }
    </>
  )


}

export default CourseCard