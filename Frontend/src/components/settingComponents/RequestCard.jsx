import React from 'react'

const RequestCard = ({user}) => {
  const {userId} = user

  return (
    <div className=' w-80 sm:w-96 bg-gray-900 backdrop-blur-md p-4'>
      <div className='flex text-gray-400 gap-4'>
         <div className='h-[65px] w-[65px] bg-red-300 rounded-full'>
           <img src={userId?.profilePic}/>
         </div>
         <div>
           <span className='text-[16px] line-clamp-1'>{userId.name}</span>
           <span className='text-[16px] line-clamp-1'>{userId.email}</span>
           <span className='text-[16px] line-clamp-1'>{userId.mobile}</span>
         </div>
      </div>
      <div className='flex-wrap flex mt-6 '>
         <button className='w-full sm:w-[40%] m-3 text-center hover:bg-green-500   bg-green-700 py-1 text-2xl'>accept</button>
         <button className='w-full sm:w-[40%] m-3 text-center hover:bg-red-500  bg-red-400  py-1 text-2xl'>reject</button>
      </div>
    </div>
  )
}

export default RequestCard