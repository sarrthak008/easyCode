import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import Navbar from '../components/Navbar'

const ViewAssignmet = () => {

   let { assignmentId } = useParams()
   const [loadedData, setLoadedData] = useState({})

   const LoadAssignmentByID = async () => {
      try {
         let responce = await axios.get(`${API_URL}/api/assignment/getassignmentById/${assignmentId}`)
         if (responce.data?.success) {
            setLoadedData(responce.data.data)
         }
         console.log(responce.data)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      LoadAssignmentByID()
   }, [])


   return (
      <>
         <Navbar />
         <div className='h-screen w-screen overflow-x-hidden-hidden'>
            <div className='w-[95%] sm:w-[80%] p-5 min-h-[40%] bg-gradient-to-tr from-green-900 to-gray-600 mt-16 mx-auto rounded-lg border-[1px] border-gray-500 flex flex-col  gap-3'>
               <div className='text-xl text-green-400 font-semibold'> <i className="ri-git-merge-fill"></i> Assignment !</div>
               <div className="text-3xl text-white font-bold">
                   {loadedData.question ? loadedData.question : <div className="w-[60%] h-10 bg-gray-400 animate-pulse rounded"></div>}
                </div>

                <div className="text-xl text-gray-400">
                  {loadedData.description ? loadedData.description : <div className="w-[80%] h-6 bg-gray-500 animate-pulse rounded"></div>}
                </div>
            </div>
            <div className=''>
                
            </div>
         </div>
      </>
   )
}

export default ViewAssignmet