import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '../../context/Store'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
const API_URL = import.meta.env.VITE_SERVER_URI


const StudentCards = ({ user }) => {
  // console.log(user)
 const {enqueueSnackbar,closeSnackbar} = useSnackbar()

  const handelBanUnban = async()=>{

    try {
      let snakID =  enqueueSnackbar("updating status of user",{variant:"info"});
      const  response =  await axios.get(`${API_URL}/api/access/banUnban/${user?._id}`);
      closeSnackbar(snakID)
      enqueueSnackbar(response.data.message,{variant:"success"})
      window.location.reload()
    } catch (error) {
      enqueueSnackbar(error.message);
    }
  }

  return (
    <div className=' w-80 sm:w-96 bg-gray-900 backdrop-blur-md p-4 ml-2 sm:ml-0 relative z-10'>
      <div className='flex text-gray-400 gap-4 '>
        <div className='h-[50px] w-[50px] m-1 sm:h-[65px] sm:w-[65px] rounded-full overflow-hidden'>
          <img src={user?.profilePic} className='object-cover' />
        </div>
        <div className='overflow-hidden'>
          <span className='text-[16px] line-clamp-1'><i className="ri-phone-fill"></i> {user?.mobile}</span>
          <span className='text-[16px] block overflow-hidden whitespace-nowrap'><i className="ri-mail-fill"></i> {user?.email}</span>
          <span className='text-[16px] line-clamp-1'><i className="ri-user-3-fill"></i> {user?.name}</span>
        </div>
      </div>
      <div className='text-gray-400 mt-1'>info loading...</div>
      <div className='flex-wrap flex mt-2 '>
        {
          user?.isBan ?
            <button className='w-full sm:w-[40%] m-3  rounded-sm text-center shadow-lg hover:bg-green-500   bg-green-400 py-1 text-2xl' onClick={handelBanUnban}>Unban <i className="ri-blaze-fill"></i></button> :
            <button className='w-full sm:w-[40%] m-3  rounded-sm text-center shadow-lg hover:bg-red-500  text-white
             bg-red-800 py-1 text-2xl' onClick={handelBanUnban}>ban <i className="ri-fire-line"></i></button>
        }
        <button className='w-full sm:w-[40%] m-3  rounded-sm text-center shadow-lg hover:bg-green-500 text-white bg-green-800  py-1 text-2xl' >progress <i className="ri-user-unfollow-line"></i></button>
      </div>
    </div>
  )
}


const CourseStudent = () => {

  const { id } = useParams()
  const [batchStudent, setBatchStudents] = useState([])

  const loadBatchStudent = async () => {

    try {
      const responce = await axios.post(`${API_URL}/api/course/getcoursstudent`, { courseId: id }, {
        withCredentials: true
      })
      setBatchStudents(responce.data.data[0].students)
      //console.log(responce.data.data[0].students)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadBatchStudent()
  }, [])

  return (
    <div className='h-full w-full'>
      <div className='text-5xl text-white hevy text-green ml-4 '>batch student</div>
      <div className='flex h-full  gap-12 evenly flex-wrap mt-4 '>

        {batchStudent.length <= 0 ?
          <div className='h-[80vh] w-[80%] flex items-center justify-center text-gray-300 flex-col mx-auto'>
            <h2 className='text-4xl sm:text-6xl font-medium text-linear text-center'>no one is here</h2>
            <span className='text-[12px] sm:text-xl text-center text-gray-400'>Success is like writing clean code small efforts, step by step, with consistency and patience, lead to perfection</span>
          </div> : batchStudent.map((user) => (
            <StudentCards user={user} />
          ))
        }

      </div>
    </div>
  )
}

export default CourseStudent