import React, { useState } from 'react'
import CodeOffIcon from '@mui/icons-material/CodeOff';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [showmenu,setshowmenu] = useState(false)
  

  return (
    <>
    <div className="w-full h-16 bg-opacity-10 bg-gray-300 fixed top-0 z-50 backdrop-filter backdrop-blur-lg">
       <div className="flex justify-between items-center h-full px-4">
         <div className="text-2xl font-bold text-white">easyCode <CodeOffIcon /></div>

         {/* nav menu for mobile*/}
           <div className='sm:hidden'><i className="ri-menu-4-line text-white cursor-pointer text-4xl hover:text-green-400" onClick={()=>setshowmenu(true)}></i></div>
             
  
         <div className='hidden  w-1/3 sm:flex justify-evenly items-center text-white text-[17px] font-semibold'>
            <Link to={'/'}><span className='cursor-pointer hover:text-green-400'>Home</span></Link>
           <Link to={'/course'}><span className='cursor-pointer hover:text-green-400'>Courses</span></Link>
           <Link to={'/login'}><span className='cursor-pointer hover:text-green-400'>Login</span></Link>
           <Link to={'/singup'}> <button className="border py-[3px] px-10 rounded-xl text-green hover:bg-green-400 hover:text-white  shadow-md shadow-gray-700 hover:shadow-2xl hover:shadow-green-400 transition-all">Sign In</button></Link>           
         </div>

       </div>
    </div>
     {   showmenu ?  <div className='bg-dark h-lvh w-lvw absolute top-0 left-0 z-50 sm:hidden'>
                  <span><i className="ri-close-line float-right text-4xl text-green cursor-pointer" onClick={()=>setshowmenu(false)}></i></span>
        <div className='flex flex-col items-center justify-center gap-7 h-full'>
          <Link to={'/'}><span className='text-white text-2xl cursor-pointer opacity-75 '>Home</span></Link>
         <Link to={'/course'}><span className='text-white text-2xl cursor-pointer opacity-75 '>Courses</span></Link>
         <Link to={'/login'}><span className='text-white text-2xl cursor-pointer opacity-75 '>Login</span></Link>
         <Link to={'/singup'}><span className='text-white text-2xl cursor-pointer opacity-75 '> sign In<i className="ri-arrow-right-up-line"></i></span></Link>     
        </div>
     </div> : null}
    </>
  )
}

export default Navbar