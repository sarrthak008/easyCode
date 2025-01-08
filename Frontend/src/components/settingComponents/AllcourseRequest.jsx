import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '../../context/Store'
const API_URL = import.meta.env.VITE_SERVER_URI
import RequestCard from './RequestCard'
import { enqueueSnackbar, useSnackbar } from 'notistack'

const AllcourseRequest = () => {

  const { settingCourse } = useStore()
  const { enqueueSnackbar } = useSnackbar()
  const [requestedusers, setrequesteduser] = useState()

  const loadRequest = async () => {
    try {
      const responce = await axios.post(`${API_URL}/api/request/getallreq/${settingCourse}`, null, {
        withCredentials: true
      })
      setrequesteduser(responce.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { loadRequest() }, [])

  const acceptRequest = async (user) => {
    const requestedCourse = user?.requestedCourse
    const userId = user?.userId?._id
    try {
      const responce = await axios.post(`${API_URL}/api/request/acceptreq`, {
        requestedCourse,
        userId
      }, { withCredentials: true })

      console.log(responce.data)
      if (responce?.data?.success) {
        enqueueSnackbar(`${responce.data.message}`, { variant: 'success' });
        loadRequest()
      } else {
        return enqueueSnackbar(`${responce.data.message}`, { variant: 'info' });
      }
    } catch (error) {
      return enqueueSnackbar(`${error.message}`, { variant: 'error' });
    }
  }
  const rejectRequest = async (user) => {

    const requestedCourse = user?.requestedCourse
    const userId = user?.userId?._id
    try {
      const responce = await axios.post(`${API_URL}/api/request/rejectreq`, {
        requestedCourse,
        userId
      }, { withCredentials: true })

      console.log(responce.data)
      if (responce?.data?.success) {
        enqueueSnackbar(`${responce.data.message}`, { variant: 'success' });
        loadRequest()
      } else {
        return enqueueSnackbar(`${responce.data.message}`, { variant: 'info' });
      }
    } catch (error) {
      return enqueueSnackbar(`${error.message}`, { variant: 'error' });
    }
  }

  return (
    <div className='h-full w-full'>
      <div className='text-5xl text-white hevy text-green ml-4 '>all requests</div>
      <div className='flex h-full  gap-12 evenly flex-wrap mt-4 '>
        {
         requestedusers?.length == 0 ? 
            <div className='h-[80vh] w-[80%] flex items-center justify-center text-gray-300 flex-col mx-auto'>
               <h2 className='text-4xl sm:text-6xl font-medium text-linear text-center'>no one is here</h2>
               <span className='text-[12px] sm:text-xl text-center text-gray-400'>Success is like writing clean code small efforts, step by step, with consistency and patience, lead to perfection</span>
            </div> :
          requestedusers?.map((user, index) => (
            <RequestCard key={index} user={user} acceptRequest={acceptRequest} rejectRequest={rejectRequest}/>
          ))
        }
      </div>
    </div>
  )
}

export default AllcourseRequest