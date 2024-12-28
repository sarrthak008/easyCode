import React from 'react'
import Navbar from "../components/Navbar"
import Shadow from '../components/Shadow'

const Courses = () => {
  return (
    <div>
       <Navbar/>
       <div className='text-gray-700 text-2xl mt-20 text-center'>
          <span>We belive on <br/> <span className='text-green font-bold text-9xl hevy '>Skills</span> <br/> not on certificate.</span>
       </div>

       <Shadow/>
    </div>
  )
}

export default Courses