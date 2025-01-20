import React from 'react';

const Sidebar = ({setOperationNumber}) => {
  return (
     <div className='h-full w-12 bg-gray-800 flex items-center flex-col text-white fixed z-20 '>
         <div className="w-full flex items-center justify-center h-[50px] cursor-pointer">
            <i className="ri-settings-4-fill text-4xl cursor-pointer hover:text-green-300 hover:animate-spin "></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer" onClick={()=>{setOperationNumber(0)}}>
            <i className="ri-user-received-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer" onClick={()=>{setOperationNumber(1)}}>
             <i className="ri-user-star-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer" onClick={()=>{setOperationNumber(2)}}>
              <i className="ri-sticky-note-add-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer" onClick={()=>{setOperationNumber(3)}}>
              <i className="ri-questionnaire-fill text-2xl cursor-pointer hover:text-green-300"></i>
        </div>
     </div>
  );
};

export default Sidebar;
