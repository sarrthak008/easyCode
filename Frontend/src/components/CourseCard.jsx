import React from 'react'
import Appbtn from './Appbtn'
import { Link, } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const CourseCard = ({ courses }) => {
//  console.log(courses)

  return (

    <div className='flex flex-wrap justify-evenly items-center gap-4 mt-8 p-4 '>
      {courses.map((course) => (
        <div key={course.id} className='bg-gray-800 w-[350px] h-[500px] rounded-lg shadow-md p-1 text-white relative shadow-lg shadow-gray-400 hover:shadow-green-400'>
          <Link to={`/courses/${course.id}`}>
            <img src={course.image} alt={course.name} className='w-full h-[200px] rounded-md'/>
          </Link>
          <div className='flex  mt-4 flex-col h-[120px] justify-between'>
              <h2 className='text-2xl text-center text-gray-300'>{course.name}</h2>
              <div className='flex gap-2 mt-5 items-center mx-2 ' >
                  <span className='text-3xl text-center font-semibold text-gray-300'><CurrencyRupeeIcon className='mb-[3px] '/>{course.prise}</span>
                  <span className='text-[20px] text-center font-semibold mt-[10px] ml-14 text-gray-500'><del><CurrencyRupeeIcon className='mb-[3px] ' sx={{fontSize:'20px'}}/>{course.originalprise}</del></span>
            </div>
          </div>
          <div className='mt-6 flex flex-col gap-4'>
               <button className='bg-[#00DB80] text-white w-[90%] mx-auto py-2 text-2xl text-black rounded-sm hover:bg-green-700'>request course</button>
               <button className='bg-[#00DB80] text-white w-[90%] mx-auto py-2 text-2xl text-black rounded-sm hover:bg-green-700'>view details</button>
            </div>
            <span className="bg-green-600 py-1 px-1 absolute -top-1 z-20 overflow-hidden  -right-4 rounded-md shadow-md shadow-black">{course.discount}% off</span>
        </div>
      ))}
    </div>



  )
}

export default CourseCard