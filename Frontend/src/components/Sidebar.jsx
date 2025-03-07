import React from 'react';

const Sidebar = ({setOperationNumber}) => {
  return (
     <div className='h-full w-12 bg-gray-800 flex items-center flex-col text-white fixed z-20 gap-5  '>
         <div className="w-full flex items-center justify-center h-[50px] cursor-pointer">
            <i className="ri-settings-4-fill text-4xl cursor-pointer hover:text-green-300 hover:animate-spin "></i>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer flex-col" onClick={()=>{setOperationNumber(0)}}>
            <i className="ri-user-received-fill text-2xl cursor-pointer hover:text-green-300"></i>
            <span className='text-[10px] opacity-75'>requests</span>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer flex-col" onClick={()=>{setOperationNumber(1)}}>
             <i className="ri-user-star-fill text-2xl cursor-pointer hover:text-green-300"></i>
             <span className='text-[10px] opacity-75'>students</span>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer flex-col" onClick={()=>{setOperationNumber(2)}}>
              <i className="ri-sticky-note-add-fill text-2xl cursor-pointer hover:text-green-300"></i>
              <span className=' text-[10px] opacity-75'>syallbus</span>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer flex-col" onClick={()=>{setOperationNumber(3)}}>
              <i className="ri-questionnaire-fill text-2xl cursor-pointer hover:text-green-300"></i>
              <span className='text-[10px] opacity-75'>quiz</span>
        </div>
             
        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer flex-col" onClick={()=>{setOperationNumber(4)}}>
              <i className="ri-live-line text-2xl cursor-pointer hover:text-green-300"></i>
              <span className='text-[10px] opacity-75'>video</span>
        </div>

        <div className="w-full flex items-center justify-center h-[50px] cursor-pointer flex-col" onClick={()=>{setOperationNumber(5)}}>
              <i className="ri-pencil-line text-2xl cursor-pointer hover:text-green-300"></i>
              <span className='text-[10px] opacity-75'>assignment</span>
        </div>
     
     </div>
  );
};

export default Sidebar;
