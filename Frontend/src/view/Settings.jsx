import React from 'react'
import Sidebar from '../components/Sidebar'
import CodeOffIcon from '@mui/icons-material/CodeOff';
import AllcourseRequest from '../components/settingComponents/AllcourseRequest';
import { useStore } from '../context/Store';

const Settings = () => {

  const {settingCourse} = useStore()

  return (
    <div className='h-screen w-screen  relative'>
      <Sidebar/>
      <div className='w-full min-h-screen ml-12  relative z-20'>
          <AllcourseRequest/>
      </div>


      <div className='h-full w-full flex items-center justify-center text-white absolute top-0 left-0  flex-col'>
       <div className=" text-2xl sm:text-7xl font-bold text-gray-700">easyCode <i className="ri-code-s-slash-line"></i></div>
       <span className='text-green-900 text-2xl '>settings</span>
      </div>
    </div>
  )
}

export default Settings