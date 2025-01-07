import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '../../context/Store'
const API_URL = import.meta.env.VITE_SERVER_URI
import RequestCard from './requestCard'

const AllcourseRequest = () => {

    const {settingCourse} = useStore()
    const [requestedusers ,setrequesteduser] = useState()

    const loadRequest = async ()=>{
         try {
            const responce = await axios.post(`${API_URL}/api/request/getallreq/${settingCourse}`,null,{
             withCredentials:true
            })
            setrequesteduser(responce.data.data)
         } catch (error) {
            console.log(error)
         }
    }

    useEffect(()=>{loadRequest()},[])
  
  return (
    <div className='h-full w-full'>
         <div className='text-5xl text-white hevy text-green ml-4 '>all requests</div>
         <div className='flex h-full  gap-12 evenly flex-wrap mt-4 '>
           {
            requestedusers?.map((user,index)=>(
              <RequestCard key={index} user={user}/>
            ))
           }
         </div>
    </div>
  )
}

export default AllcourseRequest