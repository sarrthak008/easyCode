import React from 'react'
import BGIMG from "../assets/mongo.png"
import Particles from './ReactBit/Particles'
import StarBorder from './ReactBit/StarBorder'

export const Hero = () => {

  return (

    <div className=' w-screen  mt-16 relative'>
      <div className='w-screen min-h-screen  bg-black flex relative flex-col sm:flex-row justify-center items-center'>

        <div className='absolute pointer-events-none top-0 left-0 h-full w-full'>
          <div style={{ width: '100%', height: '600px', position: 'absolute' }}>
            <Particles
              particleColors={['#ffffff', '#ffffff']}
              particleCount={100}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
        </div>


        <div className='w-full sm:w-[40vw] h-full flex  justify-center items-center'>
          <img src={BGIMG} className='h-full w-full object-contain'></img>
        </div>
        <div className='w-full sm:w-[60vw] h-full flex flex-col justify-center '>
          <h1 className='text-5xl text-center sm:text-7xl text-gray-300 sm:text-start' >Power Your Skills  With
            EasyCode.
          </h1>
          <p className='text-center text-sm sm:text-md  mt-4  sm:text-start text-gray-500 block '>Learn coding step-by-step with practical examples, interactive lessons, and support from a community that’s passionate about making programming easy and fun.</p>

          <div>
            <button className=' gap-2 cursor-pointer mt-4 text-black flex items-center justify-center bg-gray-400 h-[40px] w-[200px] rounded-3xl'>view courses
              <span className='animate-pulse inline-block h-[30px] w-[30px] rounded-full text-black flex items-center justify-center  glass'><i className="ri-arrow-right-up-line"></i></span>
            </button>
          </div>

        </div>



        <div className='h-[200px] w-[200px] absolute top-0 left-0  filter-blur bg-blue-700 pointer-events-none'></div>

        <div className='h-[100px] w-[200px] absolute bottom-0 right-0  filter-blur bg-green-500 pointer-events-none'></div>
      </div>
    </div>
  )

}

