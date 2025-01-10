import { split } from 'postcss/lib/list'
import React, { useState } from 'react'
import { useStore } from '../context/Store'

const NavProfile = ({userPicUrl,userInfo}) => {
  
   const [showMenu ,setShowMenu] = useState(false)
   const {logOut} =useStore()

  return (
    <div className='h-full w-[40px]'>
        <div className='h-[40px] w-[40px] rounded-full bg-green-600 overflow-hidden cursor-pointer' onClick={()=>{setShowMenu(!showMenu)}}>
                 <img src={userPicUrl} className='object-fill h-full w-full'/>
        </div> 
      {
        showMenu ?
         <div className='h-[200px] w-[350px] absolute bg-gray-800 right-14 top-20 rounded-md shadow-md shadow-gray-950'>
          <span className='text-2xl uppercase text-center block'>hey <span>{userInfo?.name?.split(" ")[0]}</span></span>
          <span className='block text-md text-center text-gray-500'>{userInfo?.role}</span>
          <span className='ml-3 block text-gray-400 mt-2'>{userInfo?.email}</span>
          <span className='ml-3 block text-gray-400 mt-2'>{userInfo?.mobile}</span>
          <button className='bg-green-500 ml-2 py-1 px-9 mt-6 shadow-md shadow-gray-900 hover:bg-green-800 ' onClick={()=>logOut()}>logout <i className="ri-logout-box-r-line"></i></button>
      </div> : null
      }
    </div>
  )
}

export default NavProfile