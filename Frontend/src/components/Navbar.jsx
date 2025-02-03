import React, { useEffect, useState } from 'react'
import CodeOffIcon from '@mui/icons-material/CodeOff';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useStore } from '../context/Store';
import axios from 'axios';
import NavProfile from './NavProfile';
import NotificationPannel from './NotificationPannel';
const API_URL = import.meta.env.VITE_SERVER_URI

const Navbar = () => {

  const [showmenu, setshowmenu] = useState(false)
  const [userPicUrl, setUserPic] = useState('https://res.cloudinary.com/dqjmbn0dy/image/upload/v1735545701/user.png.png')
  const { currentUser, setIsLoggedin, isLoggedIn ,logOut} = useStore()
  const [userInfo, setUserInfo] = useState({})
  const { autoNavigate } = useStore()
  const [showNotification,setNotification] = useState(false)

const loadUserInfo = async () => {

    if (!currentUser()) {
      setIsLoggedin(false)
    } else {

      try {
        setUserInfo(currentUser())
        setIsLoggedin(true)
        let responce = await axios.get(`${API_URL}/api/image/getprofilepic/${currentUser()._id}`)
        setUserPic(responce.data?.data?.profilePic)
       // console.log(responce?.data?.data?.profilePic)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    loadUserInfo()
  }, [])

  return (
    <>
      <div className="w-full h-16 bg-opacity-10 bg-gray-300 fixed top-0 z-50 backdrop-filter backdrop-blur-lg">
        <div className="flex justify-between items-center h-full px-4">
          <div className="text-2xl font-bold text-white">easyCode <CodeOffIcon /></div>

          {/* nav menu for mobile*/}
          <div className='sm:hidden'><i className="ri-menu-4-line text-white cursor-pointer text-4xl hover:text-green-400" onClick={() => setshowmenu(true)}></i></div>


          <div className='hidden  w-1/3 sm:flex justify-evenly items-center text-white text-[17px] font-semibold'>
            <Link to={'/'}><span className='cursor-pointer hover:text-green-400'>Home</span></Link>
            <Link to={'/course'}><span className='cursor-pointer hover:text-green-400'>Courses</span></Link>

            {
              isLoggedIn ? <div className='cursor-pointer' onClick={() => autoNavigate()}>dashboard</div> :
                <Link to={'/login'}><span className='cursor-pointer hover:text-green-400'>Login</span></Link>
            }

            {
               isLoggedIn ? <div className='cursor-pointer h-[30px] w-[30px]  relative' onClick={()=>setNotification(true)}>
                <i className="ri-notification-fill text-xl "></i>
                <div className='h-[17px] w-[17px] rounded-full bg-red-600 animate-pulse  text-[10px] font-bold text-center absolute -top-1 -right-0'>20</div>
              </div> : null 
            }

            {
              isLoggedIn ? <NavProfile userPicUrl={userPicUrl} userInfo={userInfo} /> :
              <Link to={'/singup'}> 
               <button className="button-8" role="button">
                   <span className="text">Sign in</span>
                </button>
              </Link>
            }
          </div>

        </div>
      </div>
      {showmenu ? <div className='bg-dark h-screen w-screen absolute top-0 left-0 z-50 sm:hidden'>
        <span><i className="ri-close-line float-right text-4xl text-green cursor-pointer" onClick={() => setshowmenu(false)}></i></span>
        <div className='flex flex-col items-center mt-[40%] gap-7 h-full'>
          <Link to={'/'}><span className='text-white text-2xl cursor-pointer opacity-75 '>Home</span></Link>
          <Link to={'/course'}><span className='text-white text-2xl cursor-pointer opacity-75 '>Courses</span></Link>
          {

            isLoggedIn ? <div onClick={()=>autoNavigate()}><span className='text-white text-2xl cursor-pointer opacity-75 '>Dashboard</span></div> : <Link to={'/login'}><span className='text-white text-2xl cursor-pointer opacity-75 '>Login</span></Link>
          }
          {
            isLoggedIn ?
              <div className='flex items-center gap-5'>
                <div className='h-[30px] w-[30px] rounded-full bg-green-600 overflow-hidden cursor-pointer'>
                      <img src={userPicUrl} className='object-fill h-full w-full' />
                 </div>
                 <div className='text-white text-2xl cursor-pointer opacity-75 ' onClick={()=>logOut()}>Logout</div>
              </div> :
              <Link to={'/singup'}> 
               <button className="button-8" role="button">
                   <span className="text">signup</span>
                </button>
              </Link>
          }
        </div>
      </div> : null}

      {
         showNotification ? <NotificationPannel  setNotification={setNotification}/> : null
      }
    </>
  )
}

export default Navbar