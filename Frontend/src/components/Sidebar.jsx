import React from 'react';

const Sidebar = () => {
  return (
     <div className='h-full w-12 bg-gray-800 flex items-center flex-col text-white fixed z-20 '>
         <div className="w-full flex items-center justify-center h-[50px] cursor-pointer">
            <i className="ri-settings-4-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer">
            <i className="ri-user-received-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer">
             <i className="ri-user-star-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer">
              <i className="ri-sticky-note-add-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>
     </div>
  );
};

export default Sidebar;
