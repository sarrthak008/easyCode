import React from 'react'
import axios from 'axios'
import { useStore } from '../../context/Store'

const AllcourseRequest = () => {

    const {settingCourse} = useStore()
   
    console.log(settingCourse)

  return (
    <div className='h-full w-full'>
         <div className='text-2xl text-white hevy text-green ml-4'>all requests</div>
    </div>
  )
}

export default AllcourseRequest