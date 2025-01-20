import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import CodeOffIcon from '@mui/icons-material/CodeOff';
import AllcourseRequest from '../components/settingComponents/AllcourseRequest';
import CourseStudent from '../components/settingComponents/CourseStudent';
import { useStore } from '../context/Store';
import { useParams } from 'react-router-dom';
import AddSyallbus from '../components/AddSyallbus';
import LoadAllQuiz from '../components/settingComponents/LoadAllQuiz';

const Settings = () => {

  const [operationNum , setOperationNumber] = useState(0)
  const {id} = useParams()

  return (
    <div className='h-screen w-screen  relative'>
      <Sidebar setOperationNumber={setOperationNumber}/>
      <div className='w-full min-h-screen ml-12  relative z-20'>
           {
             operationNum == 0 ? <AllcourseRequest courseId={id}/> : operationNum == 1 ? <CourseStudent/> : operationNum == 2 ? <AddSyallbus/> : operationNum == 3 ? <LoadAllQuiz/> : null
           }
      </div>

      <div className='h-full w-full flex items-center justify-center text-white absolute top-0 left-0  flex-col opacity-20'>
       <div className=" text-2xl sm:text-7xl font-bold text-gray-700">easyCode <i className="ri-code-s-slash-line"></i></div>
       <span className='text-green-900 text-2xl '>settings</span>
      </div>
    </div>
  )
}

export default Settings