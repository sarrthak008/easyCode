import React from 'react'
import CodeOffIcon from '@mui/icons-material/CodeOff';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-opacity-10 bg-gray-300">
       <div className="flex justify-between items-center h-full px-4">
        <div className="text-2xl font-bold text-white ">easyCode <CodeOffIcon /></div>
       </div>
    </div>
  )
}

export default Navbar