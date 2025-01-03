import React from 'react'
import DoughnutChart from "./DoughnutChart "
import SEREVER_IMG from "../assets/Server.png"


const Mainadmincomp = () => {
  return (
    <>
      <div className='h-[100vh] w-[100vw] mt-16'>
        <div className="h-full sm:h-[90%]  md:h-[50%]  w-full flex flex-wrap  items-center gap-3 sm:gap-2 justify-evenly">
          <div className='h-60 w-96 sm:w-60 bg-gray-800 p-2 rounded-md flex items-center justify-center'>
            <DoughnutChart />
          </div>
          <div className='h-60 w-96 bg-gray-800 rounded-md'>
            <h2 className='text-gray-300 text-2xl font-medium ml-4 '>total users</h2>
            <div className='text-center hevy text-8xl text-green mt-8'>45590</div>
            <div className='text-center mt-4 text-gray-400'>note: refresh to get current users</div>
          </div>
          <div className='h-60 w-96 bg-gray-800 rounded-md '>
            <h2 className='text-gray-300 text-2xl font-medium ml-4 '>server status</h2>
             <img src={SEREVER_IMG} className='w-40 mx-auto' />
            <div className='text-center  text-gray-400 text-gray-200 text-xl'>connecting....</div>
          </div>
        </div>
        <div className="h-full sm:h-[50%] w-full flex flex-wrap  items-center bg-red-200">

        </div>
      </div>
    </>
  )
}

export default Mainadmincomp