import React, { useState } from 'react'
import { use } from 'react'

const SyllabusCard = ({syllabus}) => {
   
  //console.log(syllabus)

    const [para,setpara] = useState(false);

  return (
    <div className='w-[90%] h-[250px]  border-[1px] border-l-0 border-r-0 border-b-0 '>
         <div className='text-gray-200 text-xl sm:text-3xl ml-7 mt-5 capitalize '>{syllabus?.title}</div>
         <p  className='text-gray-400 block w-[90%] sm:w-[80%] ml-10 sm:ml-20 mt-5 sm:mt-10 text-[14px] sm:text-xl font-thin'>{syllabus?.description?.split(".")[0]}{syllabus?.description?.split(".")[0]}</p>
         <div className='text-green ml-7 sm:ml-20 mt-5 cursor-pointer text-[15px] sm:text-xl group'>Know more <i className="ri-arrow-right-line group-hover:ml-2 transition-all"></i></div>
    </div>
  )
}

export default SyllabusCard