import React from 'react'
import Navbar from '../components/Navbar'
import Signup from '../components/Signup'

const Login = () => {
  return (
    <>
      <div className='flex justify-center items-center h-[100vh] w-full'>
        <Navbar />
        <Signup />
      </div>
    </>
  )
}

export default Login