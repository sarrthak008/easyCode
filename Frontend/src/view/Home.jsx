import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Hero } from '../components/Hero'
import Shadow from '../components/Shadow'
import { Footer } from '../components/Footer'
import axios from 'axios'
import { use } from 'react'
import { useSnackbar } from 'notistack'
import { useStore } from '../context/Store'
const API_URl = import.meta.env.VITE_SERVER_URI

const Home = () => {
 
   // console.log(API_URl)
  
    const { enqueueSnackbar } = useSnackbar()
    const {loadNotificationNumber ,deleteNotification} = useStore()

   const loadserver = async () =>{
      try {
        const responce = await axios.get(`${API_URl}/connect`)
        console.log(responce.data)  
         if(responce.data.success){
            enqueueSnackbar(`${responce.data.message}`, { variant: "success" })
         }
      } catch (error) {
         enqueueSnackbar(`${error.message}`, { variant: "success" })
      }
   }

   useEffect(()=>{
    loadserver()
    loadNotificationNumber()
    deleteNotification()
   },[]);
  

  return (
    <div className='w-lvw min-h-lvh bg-dark'>
       <Navbar></Navbar>
       <Hero></Hero>
       <Shadow></Shadow>
       <Footer></Footer>
    </div>
  )
}

export default Home