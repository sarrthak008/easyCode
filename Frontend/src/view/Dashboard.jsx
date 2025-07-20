import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { closeSnackbar, useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import Shadow from "../components/Shadow"
import SpeedDilarUser from '../components/SpeedDilarUser'
import { useStore } from '../context/Store'
import ARROWSVG from '../assets/assignmetnarr.svg'
import Cookies from 'js-cookie';


const LoadAssignmentsComponent = ({ setAssignmetn, courseinfo }) => {
  // console.log(courseinfo._id)
  const [assignment, setAssignment] = useState([])

  const LoadAssignment = async () => {
    try {
      let responce = await axios.get(`${API_URL}/api/assignment/getallcourseassignments/${courseinfo?._id}`)
      console.log(responce.data)
      setAssignment(responce.data.data?.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    LoadAssignment()
  }, [])


  const HandelAssignmentnOpen = (info) => {
    window.open(`https://www.easycode.support/view/${info._id}/${courseinfo._id}`, "_blank")
  }

  return (
    <>
      <div className='fixed top-0 left-0 h-screen w-screen  bg-black bg-opacity-70 flex justify-center items-center    backdrop-blur-md z-50 cursor-pointer' onClick={() => { setAssignmetn(false) }}>
        <>
          {
            assignment.length == 0 ?
              <div className='h-[80%] w-[80%] bg-gray-900 opacity-85 flex items-center justify-center flex-col' onClick={(e) => e.stopPropagation()}>
                <img src={ARROWSVG} className='h-[100px]' />
                <div className='text-2xl text-gray-300 mb-4 text-center'>we are add assignment for youhh...</div>
                <span className='text-gray-400 text-sm text-center'>"code, create, conquer. Every bug is a lesson, every line is progress. Keep going!" 🚀💻</span>
              </div>
              :

              <div className='h-[80vh] w-[80vw] bg-gray-900 overflow-y-scroll rounded-md shadow-md hide-scroll-bar' onClick={(e) => e.stopPropagation()}>
                <h2 className='text-gray-500 text-lg font-semibold mt-4 text-center'>
                  📌 Note: To get the certificate, you must complete all assignments.
                </h2>

                <>
                  {
                    assignment?.map((assignmetn_info, index) => (
                      <div key={index} className='min-h-[60px] w-[80%] bg-gray-600 my-6 mx-auto rounded-lg flex overflow-hidden cursor-pointer shadow-sm hover:scale-[1.01] shadow-green-500 '
                        onClick={() => HandelAssignmentnOpen(assignmetn_info)}
                      >
                        <div className='hidden sm:flex sm:w-10 bg-red-200 flex items-center justify-center button-8 '
                        >
                          <i className="ri-code-s-slash-line text-4xl"></i>
                        </div>
                        <div className='w-[90%] flex items-center justify-between px-2 py-3'>
                          <div className="text-xl text-gray-400 text-center font-medium">{assignmetn_info?.assignmetName}</div>
                        </div>
                      </div>
                    ))
                  }
                </>
              </div>

          }
        </>
      </div>
    </>
  )
}


const AllVideosComp = ({ setVideoComp, courseinfo }) => {

  const { queueSnackbar } = useSnackbar()
  const [allVideos, setAllVideo] = useState([])
  const [underVideo, setUnderVideo] = useState(false)
  const [storeVideo, setStoreVideo] = useState({})
  const [videoUrls, setVideoUrls] = useState('')
  const [showIframe, setShowIframe] = useState(false)

  const LoadCourseLectures = async () => {

    try {
      const responce = await axios.get(`${API_URL}/api/video/getvideo/${courseinfo?._id}`, { withCredentials: true })
      if (responce.data.success) {
        setAllVideo(responce.data.data)
        //console.log(responce.data.data)
      } else {
        console.log(responce.data)
      }
    } catch (error) {
      queueSnackbar(`${error.message}`, { variant: 'error' })
    }
  }

  useEffect(() => {
    LoadCourseLectures()
  }, [])

  const saveVideoToLocalStorage = (video) => {
    try {
      localStorage.setItem('video', JSON.stringify(video))
      setUnderVideo(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setStoreVideo(JSON.parse(localStorage.getItem('video')) || {})
    // console.log(typeof (storeVideo?.video_url))
  }, [underVideo])


  return (
    <>
      <div className='fixed top-0 left-0 h-screen w-screen  bg-black bg-opacity-70 flex justify-center items-center backdrop-blur-md z-50 cursor-pointer' onClick={() => { setVideoComp(false) }}>
        <div className='h-[80%] w-[90%] bg-gray-800 overflow-x-hidden overflow-y-scroll rounded-md shadow-md hide-scroll-bar' onClick={(e) => { e.stopPropagation() }}>
          <div className='text-gray-200 text-4xl text-center mt-5 hevy text-green'>were are you ?</div>
          {
            allVideos?.length == 0 ? <div className='text-gray-200 text-3xl absolute top-[50%] left-[50%] -translate-x-[50%] animate-pulse'>LOADING...</div> :
              allVideos?.map((video, index) => (
                <div key={index} className='min-h-[60px] w-[80%] bg-gray-600 my-6 mx-auto rounded-lg flex overflow-hidden cursor-pointer shadow-sm hover:scale-[1.01] shadow-green-500' onClick={() => { saveVideoToLocalStorage(video) }}>
                  <div className='hidden sm:flex sm:w-10 bg-red-200 flex items-center justify-center button-8 '>
                    <i className="ri-video-chat-fill text-4xl"></i>
                  </div>
                  <div className='w-[90%] flex items-center justify-between px-2 py-3'>
                    <div className="text-xl text-gray-400 text-center font-medium">{video?.video_title}</div>
                  </div>
                </div>
              ))
          }
        </div>

        <div className='absolute top-10 right-11 cursor-pointer hover:text-green-400 h-[35px] flex items-center justify-center w-[35px] rounded-full bg-green-400' onClick={() => { setVideoComp(false) }}><i className="ri-close-line text-white text-4xl"></i></div>
      </div>
      {underVideo ? <div className="h-full w-full top-0 left-0 fixed bg-gray-800 bg-opacity-80 backdrop-blur-md z-[100] cursor-pointer flex items-center justify-center " onClick={() => { setUnderVideo(false) }}>
        <div className=' flex flex-wrap gap-10'>
          {
            storeVideo?.video_url?.map((urls, index) => (
              <a href={urls} target='_blank'>
                <div className='h-[200px] w-[350px] rounded-lg  bg-gray-900 overflow-hidden flex items-center justify-center relative shadow-sm shadow-green-500' key={index} onClick={(e) => e.stopPropagation()}>
                  <img src={courseinfo?.image} className='h-full w-full object-fill' />
                  <div className="h-full w-full absolute top-0 left-0 bg-gradient-to-t to-transparent from-black" onClick={() => { setVideoUrls(urls); }}>
                    <div className="bg-white h-7 w-40 rounded-3xl text-center font-medium text-xl  text-gray-400 absolute bottom-5 right-5 ">{`part${index + 1}`}<i className="ri-play-circle-fill"></i></div>
                  </div>
                </div>
              </a>
            ))
          }
        </div>
      </div> : null}
      {
        showIframe ?
          <div className='h-screen w-screen fixed top-0 left-0 bg-red-50 z-[700]' onClick={() => setShowIframe(false)}>
            <iframe src={videoUrls} className='h-[100%] w-[100%] object-fill' />
          </div> : null
      }
    </>
  )
}

const CourseCard = ({ course }) => {

  //console.log(course)

  const { enqueueSnackbar } = useSnackbar()
  const [videoComp, setVideoComp] = useState(false)
  const [assignmetComp, setAssignmentComp] = useState(false)


  return (
    <>
      <div className='min-h-[300px] w-[90%] md:w-[60%] bg-gray-900 rounded-lg shadow-sm shadow-black m-3 p-2'>
        <div className='w-[95%]  min-h-[210px] px-2 flex flex-col sm:flex-row bg-gray-950 mx-auto py-2 items-center '>
          <div className='w-[90%] sm:w-[330px] h-[190px] bg-red-400 rounded-sm overflow-hidden'>
            <img src={course.image} className='h-full w-full object-fill'></img>
          </div>
          <div className='w-full sm:w-[50%] h-full  sm:ml-4 flex flex-col justify-evenly items-center gap-3 mt-5 sm:mt-0'>
            <button className='bg-green-500  py-2 font-medium text-xl w-[80%] shadow-md shadow-gray-900 hover:bg-green-800'
              onClick={() => {
                setAssignmentComp(true)
              }}
            >Assignments</button>

            <Link to={`/viewquiz/${course._id}`} className='w-full ml-[20%]'><button className='bg-green-500  py-2 font-medium text-xl w-[80%] shadow-md shadow-gray-900 hover:bg-green-800'>Solve Quiz</button></Link>

            <button className='bg-green-500  py-2 font-medium text-xl w-[80%] shadow-md shadow-gray-900 hover:bg-green-800' onClick={() => {
              setVideoComp(true)
            }}>Lectures</button>
          </div>
        </div>
        <div className='text-gray-500 text-[17px] text-center'><i className="ri-alarm-warning-fill"></i> please attend live lecutures to get certificate . you can ask doubt any time . admin have permission to remove you from online batch if you not attends lectures</div>
      </div>

      {videoComp ? <AllVideosComp setVideoComp={setVideoComp} courseinfo={course} /> : null}
      {assignmetComp ? <LoadAssignmentsComponent setAssignmetn={setAssignmentComp} courseinfo={course} /> : null}
    </>
  )
}

const AddFeedBack = ({ setOpenFeedback }) => {
  return (
    <div onClick={() => setOpenFeedback(true)} className='h-[55px] w-[55px] bg-green-400 rounded-full flex items-center justify-center fixed bottom-12 cursor-pointer  right-12'>
      <i className="ri-feedback-fill text-black text-2xl"></i>
    </div>
  )
}


const BanComp = () => {
  const { currentUser } = useStore()
  const [isban, setIsBan] = useState(currentUser()?.isBan)

  return (
    <>
      {
        isban ? <div className='h-screen w-screen fixed backdrop-blur-md  top-0 left-0 bg-gray-900 opacity-95  z-2000 flex items-center justify-center'>
          <div className='h-[50vh] w-[90vw] bg-gray-950 rounded-md flex items-center justify-center flex-col'>
            <div className='flex text-white items-center justify-center text-2xl gap-4'><i className=" mt-1 ri-error-warning-line"></i> access stop </div>
            <div className='text-white text-sm opacity-75 text-center'>for more information contact easycode team .</div>
          </div>
        </div> : null
      }
    </>
  )
}

const Dashboard = () => {

  const [mycourses, setMycourses] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [openFeedback, setOpenFeedback] = useState(false)
  const [feedback, setFeedBack] = useState('')
  const [videoComp, setVideoComp] = useState(false)
  const { loadNotificationNumber, deleteNotification } = useStore()

  const LoadTokenFromURl = () => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    if (token) {
      Cookies.set('token', token, { expires: 7 });
    } else {
      console.warn("you are login from email or pass either something went wrong inform developers")
    }
  }


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
    LoadTokenFromURl()
    loadMycourses()
    loadPreviousFeedBack()
    deleteNotification()
    // window.location.reload()
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
      <div className='fixed bottom-0 right-14'>
        <SpeedDilarUser />
      </div>

      <BanComp />
    </>
  )
}

export default Dashboard