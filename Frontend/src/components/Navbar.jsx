import React from 'react'
import CodeOffIcon from '@mui/icons-material/CodeOff';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-opacity-10 bg-gray-300">
       <div className="flex justify-between items-center h-full px-4">
         <div className="text-2xl font-bold text-white">easyCode <CodeOffIcon /></div>

         {/* nav menu for mobile*/}
           <div><i className="ri-menu-4-line text-white cursor-pointer text-4xl hover:text-green"></i></div>
  
         {/* <div className='w-1/3 flex justify-evenly items-center text-white text-[17px] font-semibold'>
            <span className='cursor-pointer hover:text-green-400'>Home</span>
            <span className='cursor-pointer hover:text-green-400'>Courses</span>
            <button className="border py-[3px] px-10 rounded-xl text-green hover:bg-green-400 hover:text-white  shadow-md shadow-gray-700 hover:shadow-2xl hover:shadow-green-400 transition-all">Sign In</button>           
         </div> */}

       </div>
    </div>
  )
}

export default Navbar