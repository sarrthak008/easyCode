import React from 'react'
import Appbtn from './Appbtn'
import { Link, } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const CourseCard = ({ courses }) => {
  console.log(courses)

  return (

    <div className='flex flex-wrap justify-evenly items-center gap-4 mt-8 p-4 '>
      {courses.map((course) => (
        <div key={course._id} className='bg-gray-900 shadow-lg rounded-lg w-80 mx-5 h-2/3'>
          <img src={course.image} alt='course' className='rounded-t-lg w-full h-48 object-fill' />
          <div className='h-[2px] w-full bg-green-400 relative'>
            <div className='h-[50px] w-full bg-green-500 absolute  left-1 blur-[80px]	'></div>
          </div>
          <div className='p-6 flex flex-col gap-5 bg-slate-900'>
            <h2 className='text-2xl text-white font-thin tracking-tighter'>{course.name}  </h2>

            <div className='flex justify-between items-center '>
              <div >
                <span className='mt-4 text-white font-bold text-2xl'>< CurrencyRupeeIcon />{course.prise}</span>
                <del className='text-gray-500 text-xl ml-2'>< CurrencyRupeeIcon />9999</del>
              </div>
              <span className='px-3  bg-slate-100 rounded-sm font-medium '>29%OFF</span>
            </div>


            <div className=' flex flex-wrap justify-center  gap-4 text-white mt-2  w-full '>
              <Link to={`/course/${course._id}`}>
                <button className='bg-green-600  px-10 py-2  w-72 rounded-md text-xl text-gray-800 font-bold  '>Detiles</button>
              </Link>
              <Link to={`/course/${course._id}`}>
                <button className='bg-green-600  px-10 py-2  w-72 rounded-md text-xl text-gray-800 font-bold '>Add to cart</button>
              </Link>
            </div>




          </div>
        </div>
      ))}
    </div>



  )
}

export default CourseCard