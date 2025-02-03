import React, { useEffect,useState,useRef } from 'react'
import axios from 'axios'
const API_URL = import.meta.env.VITE_SERVER_URI
import AUDIO from './../assets/audio.mp3'

const NotificationPannel = ({setNotification}) => {

     const [notifications,setNotifications] = useState([])
     const  loadNotification = async () => {
         try {
            const response =  await axios.get(`${API_URL}/api/notification/getnotificatons`,{withCredentials:true});
            setNotifications(response.data.data.reverse())
         } catch (error) {
            console.log(error)
         }
     }

     useEffect(()=>{
        loadNotification()
     },[])

const SIGN = [
         <i class="ri-arrow-right-up-line"></i>,
         <i className="ri-service-fill"></i> ,
         <i className="ri-megaphone-fill"></i>,
         <i className="ri-drinks-2-fill"></i>,
         <i class="ri-heart-3-fill"></i>
     ]

const convertIntoTime = (time) => {
      const date = new Date(time)
      return date.toLocaleTimeString()
}


   const audioRef = useRef(new Audio(AUDIO));
   const prevLengthRef = useRef(notifications.length);
 
const playAudio = () => {
     audioRef.current.play();
   };
 
   const pauseAudio = () => {
     audioRef.current.pause();
   };

 useEffect(() => {
      if (notifications.length > prevLengthRef.current) {
        audioRef.current.play(); 
      }
      prevLengthRef.current = notifications.length;
    }, [notifications]);

    
  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-gray-900 z-[100] cursor-pointer backdrop-blur-md bg-opacity-70' onClick={()=>{setNotification(false)}}>
        {
           setNotifications.length <=0 ? 
           <div className='text-gray-300 text-4xl text-center mt-20'>
            no notification
           </div> 
           : 
           <div className='h-[80%] w-[100%]  rounded-md mx-auto text-gray-300  mt-12 overflow-x-hidden overflow-y-scroll hide-scroll-bar' > 
            {
                 notifications?.map((notification,index)=>{
                   //console.log(notification)
                    return(
                       <div className='w-[90%] sm:w-[70%] flex  flex-col  min-h-[70px]  bg-gray-700 child rounded-md mx-auto text-gray-300  shadow-sm shadow-green-400 p-3'style={{ "--i": index }} onClick={(e) => { e.stopPropagation(); }} key={index} >
                        <div className='text-green-400 font-bold text-[16px] opacity-75'>{SIGN[Math.floor(Math.random()*SIGN.length)]} <span>{notification?.name}</span></div>
                         <div>
                            <div key={index} className="text-gray-200 ml-5 mt-2 font-semibold" style={{ "--i": index }} >{notification.message}</div>
                         </div>
                         <div className='w-full text-right text-sm text-gray-400'>{convertIntoTime(notification.createdAt)}</div>
                       </div>
                    )
               }) 
            }
           </div>
        }
    </div>
  )
}

export default NotificationPannel   