import React from 'react'
import Navbar from '../components/Navbar'
import { Hero } from '../components/Hero'
import Shadow from '../components/Shadow'

const Home = () => {
  return (
    <div className='w-lvw min-h-lvh bg-dark'>
       <Navbar></Navbar>
       <Hero></Hero>
       <Shadow></Shadow>
    </div>
  )
}

export default Home