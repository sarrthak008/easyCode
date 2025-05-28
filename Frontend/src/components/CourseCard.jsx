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

import '../styles/glasseffect.css'

const CourseCard = ({ course, index }) => {
  //  console.log(courses)

  let courses = JSON.parse(localStorage.getItem('courses'))
  const [isrequested, setrequested] = useState(courses[index].requetes)
  const { currentUser } = useStore()
  const [getMobComp, setMobComp] = useState(false);
  const [mobileNum, setmobileNum] = useState('')
  const [isLink, setisLink] = useState(false)

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

    let ismob = localStorage.getItem('isMob')

    if (!currentUser()) {
      return enqueueSnackbar("login to send course request", { variant: 'error' });
    } else if (!currentUser()?.mobile && !ismob) {
      setMobComp(true)
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
          localStorage.setItem('isMob', true)
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
      <div
        key={course._id}
        className="relative w-[390px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group"
      >
        {/* Discount Badge */}
        <div className="absolute top-0 right-0 z-30">
          <div className="glass text-white px-2 py-1 rounded-full shadow-md text-xs font-semibold">
            {course.discount}% OFF
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full h-[200px] overflow-hidden">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-5">
          {/* Title */}
          <h2 className="text-xl font-bold text-white text-center">{course.name}</h2>

          {/* Price & Date */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-3 items-end">
              <span className="text-2xl font-bold text-emerald-400 flex items-center">
                <CurrencyRupeeIcon className="mb-[2px]" />
                {course.prise}
              </span>
              <span className="text-sm text-gray-400 line-through flex items-center">
                <CurrencyRupeeIcon className="mb-[2px]" sx={{ fontSize: '15px' }} />
                {course.originalprise}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <i className="ri-calendar-schedule-line text-teal-400"></i>
              <span>Starts: {course?.startingDate?.split("T")[0]}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Request Button */}
            {isrequested ? (
              <button
                onClick={() => handelRequest(course, index)}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:from-emerald-600 hover:to-green-600 transition"
              >
                ✅ Requested
              </button>
            ) : (
              <button
  className='w-full bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500 text-white py-3 px-6 rounded-xl font-semibold text-base shadow-lg hover:from-emerald-500 hover:via-green-600 hover:to-lime-600 transition-all duration-300 flex items-center justify-center gap-2'
  onClick={() => checkMobile(course, index)}
>
  Request Course
  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>

            )}

            {/* View Details Button */}
            <Link to={`/course/${course._id}`}>
              <button
                className='relative w-full text-white mt-5 bg-transparent border-2 border-teal-400/50 hover:border-teal-300 backdrop-blur-sm hover:bg-gradient-to-r hover:from-teal-500/20 hover:via-emerald-500/20 hover:to-cyan-500/20 focus:ring-4 focus:outline-none focus:ring-teal-300/50 font-semibold rounded-xl text-base px-6 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/25 group/btn overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-in-out'
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Details
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
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