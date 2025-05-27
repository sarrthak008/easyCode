import React from 'react'
import BGIMG from "../assets/mongo.png"
import Particles from './ReactBit/Particles'
import StarBorder from './ReactBit/StarBorder'
import VIDEO from "../assets/bgvideo.mp4"

export const Hero = () => {

  return (

    <div className=' w-screen  mt-16 relative'>
      {/* section 1 */}
      <div className='pb-10 sm:pb-0 w-screen min-h-screen  bg-black flex relative flex-col sm:flex-row justify-center items-center'>

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

      {/* section 2 */}

      <div className=' w-screen bg-black relative '>
           <div className='h-[70vh] w-full mx-auto overflow-hidden relative bg-red-500 flex justify-center items-center'>
                <video autoPlay loop muted className='h-[130%] w-[60%] object-cover'>
                    <source src={VIDEO} type="video/mp4"/>
                </video>
                <div className='overlay absolute top-0 left-0 h-full w-full'></div>
           </div>

           <span className='glass blue-box-shadow absolute top-3 left-2 py-2 px-4 rounded-3xl text-white '>hight quality lectures <i className="ri-video-on-ai-fill"></i></span>

           <span className='glass pink-box-shadow absolute top-16 right-10 py-2 px-4 rounded-3xl text-white '>24 x 7 support <i className="ri-time-fill"></i></span>

           <span className='glass orange-box-shadow absolute bottom-[50%] left-[20%] py-2 px-4 rounded-3xl text-white '>group projects <i className="ri-group-fill"></i></span>

           <span className='glass green-box-shadow absolute bottom-[35%] right-[20%] py-2 px-4 rounded-3xl text-white '>regular assignments <i className="ri-booklet-fill"></i></span>
      </div>
    </div>
  )

}

