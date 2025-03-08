import React from 'react'
import Appinput from '../Appinput'

const Addassignmet = () => {
  return (
    <>
            <div className='text-5xl text-white hevy text-green ml-4 pt-1 '>Add Assignment</div>
            <div className='h-screen w-screen flex items-center justify-center '>
                 <div className='h-3/4 w-[70vw] sm:w-3/5 bg-gray-900 shadow-md text-white  shadow-gray-800'>
                    <Appinput title='enter assignmet title' />
                 </div>
            </div>

    </>
  )
}

export default Addassignmet