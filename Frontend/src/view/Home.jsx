import React from 'react'
import Navbar from '../components/Navbar'
import { Hero } from '../components/Hero'

const Home = () => {
  return (
    <div className='w-lvw min-h-lvh bg-dark'>
       <Navbar></Navbar>
       <Hero></Hero>
    </div>
  )
}

export default Home