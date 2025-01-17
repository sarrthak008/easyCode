import React from 'react'
import SpeedDilarUser from '../components/SpeedDilarUser'
import Navbar from '../components/Navbar'
import Shadow from '../components/Shadow'

const Feedback = () => {
  return (
    <>
      <Navbar/>
      <div className='h-screen w-screen relative'>
        <div className='h-screen w-screen flex items-center justify-center flex-wrap mt-24'>
          </div>
      </div>

      <Shadow/>
      <div className='fixed bottom-0 right-14'>
         <SpeedDilarUser/>
      </div>
    </>
  )
}

export default Feedback

//