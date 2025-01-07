import React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useStore } from '../context/Store';
import { useNavigate, useNavigation } from 'react-router-dom';

const AdminCourseCard = ({ course }) => {

  const navigate = useNavigate()
  const { setsettingCourse } = useStore()

  const gotosetting = () => {
    setsettingCourse(course._id)  
    navigate('/setting')         
  }
  
  return (
    <div key={course._id} className='bg-gray-800 w-[340px] h-[450px] rounded-lg  p-1 text-white relative mb-5'>
      <img src={course.image} alt={course.name} className='w-full h-[200px] rounded-md' />
      <div className='flex  mt-4 flex-col h-[120px] justify-between'>
        <h2 className='text-2xl text-center text-gray-300'>{course.name}</h2>
        <div className='flex gap-2 mt-5 items-center mx-2 ' >
          <span className='text-3xl text-center font-semibold text-gray-300'><CurrencyRupeeIcon className='mb-[3px] ' />{course.prise}</span>
          <span className='text-[15px] text-center font-semibold mt-[10px] ml-1 text-green'><del><CurrencyRupeeIcon className='mb-[3px] ' sx={{ fontSize: '15px' }} />{course.originalprise}</del></span>
          <span className='text-[16px] text-center mt-2 ml-3  text-gray-300'><i className="ri-calendar-schedule-line"></i> {course?.startingDate?.split("T")[0]}</span>
        </div>
      </div>
      <div className='mt-6 flex flex-col gap-4 m-auto'>

        <button className='bg-[#00DB80] text-white w-[81%] ml-4 py-2 text-2xl text-black rounded-sm hover:bg-green-700 shadow-lg shadow-gray-900 ' onClick={()=>gotosetting()}>open settings</button>
      </div>
      <span className="bg-green-600 py-1 px-1 absolute -top-1 z-[] overflow-hidden  -right-4 rounded-md shadow-md shadow-black">{course.discount}% off</span>
    </div>
  )
}

export default AdminCourseCard