import React from 'react'

const CourseCard = ({courses}) => {
     
    


  return (
   
        <div className='flex flex-wrap justify-evenly gap-4 mt-8 p-4 '>
            {courses.map((course) => (
            <div key={course._id} className='bg-gray-950 shadow-lg rounded-lg w-96'>
                <img src={course.image} alt='course' className='rounded-t-lg w-full h-64' />
                <div className='p-6'>
                <h2 className='text-2xl text-white font-bold'>{course.name}</h2>
                <p className='mt-4 text-gray-400 font-bold'> Prise : {course.prise}</p>
                <div className='mt-8'>
                    <a href='#' className='text-gray-600 hover:text-green-600 font-semibold'>Learn more</a>
                </div>
                </div>
            </div>
            ))}
        </div>


   
  )
}

export default CourseCard