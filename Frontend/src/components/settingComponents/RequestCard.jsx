import React from 'react'

const RequestCard = ({user,acceptRequest,rejectRequest}) => {
  //console.log(user)
  const {userId} = user

  
  return (
    <div className=' w-80 sm:w-96 bg-gray-900 backdrop-blur-md p-4 ml-2 sm:ml-0'>
      <div className='flex text-gray-400 gap-4 '>
         <div className='h-[65px] w-[65px] bg-red-300 rounded-full overflow-hidden'>
           <img src={userId?.profilePic}/>
         </div>
         <div>
           <span className='text-[16px] line-clamp-1'>{userId?.name}</span>
           <span className='text-[16px] line-clamp-1'>{userId?.email}</span>
           <span className='text-[16px] line-clamp-1'>{userId?.mobile}</span>
         </div>
      </div>
      <div className='text-gray-400 mt-1'>requested at : {user?.createdAt?.split("T")[0]}</div>
      <div className='flex-wrap flex mt-2 '>
         <button className='w-full sm:w-[40%] m-3 text-center shadow-lg hover:bg-green-500   bg-green-400 py-1 text-2xl' onClick={()=>{acceptRequest(user)}}>accept <i className="ri-user-add-line"></i></button>
         <button className='w-full sm:w-[40%] m-3 text-center shadow-lg hover:bg-red-500  bg-red-800  py-1 text-2xl' onClick={()=>{rejectRequest(user)}}>reject <i className="ri-user-unfollow-line"></i></button>
      </div>
    </div>
  )
}

export default RequestCard