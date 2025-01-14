import { split } from 'postcss/lib/list'
import React, { useState } from 'react'
import { useStore } from '../context/Store'
import axios from 'axios'
import { closeSnackbar, useSnackbar } from 'notistack'
const API_URL = import.meta.env.VITE_SERVER_URI

const NavProfile = ({ userPicUrl, userInfo }) => {

  const [showMenu, setShowMenu] = useState(false)
  const { logOut } = useStore()
  const {enqueueSnackbar} = useSnackbar()

  const handleFileChange = async (event) => {
    event.preventDefault();
    event.stopPropagation()

    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {

        let snackId = enqueueSnackbar('uploaing your photo', { variant: "info" })
        const response = await axios.post(
          `${API_URL}/api/image/upload`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if(response.data.success){
          enqueueSnackbar(`${response.data?.message}`, { variant: "success" })
          closeSnackbar(snackId)
          setTimeout(()=>window.location.reload(),2000)
        }else{
          enqueueSnackbar(`${response.data?.message}`, { variant: "error" })
          closeSnackbar(snackId)
        }
      } catch (error) {
        enqueueSnackbar(`${error.message}`, { variant: "error" })
        closeSnackbar(snackId)
      }
    }
  };


  return (
    <div className='h-full w-[40px]'>
      <div className='h-[40px] w-[40px] rounded-full bg-green-600 overflow-hidden cursor-pointer' onClick={() => { setShowMenu(!showMenu) }}>
        <img src={userPicUrl} className='object-fill h-full w-full' />
      </div>
      {
        showMenu ?
          <div className='h-screen w-screen cursor-pointer z-[20] bg-blur-gray  absolute top-0 left-0' onClick={(e) => {   
            setShowMenu(!showMenu) }}>
            <div className='h-[200px] w-[350px] z-0 absolute bg-gray-800 right-14 top-20 rounded-md shadow-md shadow-gray-950' onClick={(e)=>{e.stopPropagation()}}>
            <span className='text-2xl uppercase text-center block'>hey <span>{userInfo?.name?.split(" ")[0]}</span></span>
            <span className='block text-md text-center text-gray-500'>{userInfo?.role}</span>
            <span className='ml-3 block text-gray-400 mt-2'>{userInfo?.email}</span>
            <span className='ml-3 block text-gray-400 mt-2'>{userInfo?.mobile}</span>
            <div className='flex items-center'>
              <form enctype="multipart/form-data" method="post">
                <input
                  type="file"
                  id="fileInput"
                  accept=".png, .jpg, .jpeg"
                  className='hidden '
                  onChange={(event) => handleFileChange(event)}
                  name='image'
                />

                <label
                  htmlFor="fileInput"
                  className=' ml-2 py-1 cursor-pointer  px-10 mt-6  border-2 block border-green-500 shadow-md shadow-gray-900 hover:bg-green-800 '
                >
                  upload <i className="ri-upload-2-line"></i>
                </label>
              </form>
              <button className='bg-green-500 ml-2 py-1 px-9 mt-6  border-2 border-green-500 shadow-md shadow-gray-900 hover:bg-green-800 ' onClick={() => logOut()}>logout <i className="ri-logout-box-r-line"></i></button>
            </div>
          </div> </div>: null  
      }
    </div>
  )
}

export default NavProfile