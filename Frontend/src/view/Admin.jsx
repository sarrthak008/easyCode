import React from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
const API_URL = import.meta.env.VITE_SERVER_URI
import Speeddial from '../components/Speeddial'
import DoughnutChart from '../components/DoughnutChart '
import SERVER from "../assets/Server.png"

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
    <div className='h-screen w-screen relative'>
      <Navbar />
      <div className="h-screen w-[99%] absolute top-0 right-0 m-auto flex flex-col mt-0" ></div>
      <Speeddial />
    </div>
  )
}

export default Admin