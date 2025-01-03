import React from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
const API_URL = import.meta.env.VITE_SERVER_URI
import Speeddial from '../components/Speeddial'
import Mainadmincomp from "../components/Mainadmincomp"

const Admin = () => {

  const loadAllcourses = async () => {
    try {
      let responce = await axios.get(`${API_URL}/api/course/getcourse/`)
      console.log(responce.data.data)
    } catch (error) {

    }
  }

  loadAllcourses()

  return (
    <div className='h-screen w-screen relative   '>
      <Navbar />
      <div className="w-full absolute top-0 right-0 m-auto flex flex-col mt-0 overflow-x-hidden overflow-y-scroll hide-scroll-bar" >
        <Mainadmincomp />



      </div>
       <div className='fixed bottom-10 right-10'>
        <Speeddial />
       </div>
    </div>
  )
}

export default Admin