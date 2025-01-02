import React, { useState } from 'react'
import { use } from 'react'

const SyllabusCard = ({syllabus}) => {
    
    const [para,setpara] = useState(false);

  return (
    <div className=' transition-transform duration-[3000] ease-out py-5 w-[90%] flex flex-col justify-center items-start bg-slate-900 mx-auto border-t-2 relative border-t-gray-600 border-b-2 border-b-gray-600 mt-3 cursor-pointer overflow-hidden' onClick={()=>{setpara(!para)}}>  
       <div className='text-white text-center text-sm sm:text-3xl ml-4 hover:text-green-400'>{syllabus?.title} {para ? <i class="ri-arrow-up-line absolute right-0 text-xl"></i> :<i class="ri-arrow-down-line absolute right-0 text-xl"></i>}</div>
       {para ? <div>
        <p className='text-gray-500 block ml-12 text-sm sm:text-xl mt-5'>{syllabus.description}</p>
       </div>: null}
    </div>
  )
}

export default SyllabusCard