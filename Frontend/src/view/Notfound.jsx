import React from 'react'

const Notfound = () => {
  return (
    <div className='h-screen w-screen overflow-hidden flex items-center justify-center flex-col bg-black '>
      <h1 className='text-9xl text-linear hevy tracking-[20px]'>404</h1>
      <h2 className='text-gray-400 text-2xl'>not found</h2>
      <div className='h-[40%] w-full mt-2 overflow-hidden absolute bottom-0'>
           <div className='w-[500px] h-[300px] bg-green-800 blur-[80px] rounded-full mt-[10%] mx-auto'></div>
      </div>
    </div>
  )
}

export default Notfound