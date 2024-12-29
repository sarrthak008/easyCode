import React from 'react'
import ARROW from "../assets/arrrow.svg";
import CIRCLE from "../assets/circle.svg";
import ROUND from "../assets/round.svg";
import THREED from "../assets/3d.jpg";
import Shadow from './Shadow';
import ARROW1 from "../assets/arrow2.svg";

export const Hero = () => {
  return (
    <>
      <div className='h-96 text-white w-full flex justify-center items-center flex-col relative bg-[url("./assets/bg.svg")] bg-center bg-cover bg-no-repeat'>

        <h1 className=' text-6xl text-center  sm:text-[4.8em]  uppercase  mt-[40%]  sm:mt-[20%]   md:mt-[10%] hevy font-thin'>we Transform <span className='text-green'>Ideas</span> into <span className='text-green'>Code</span> !</h1>

        <div className=' w-72 sm:w-80 text-center opacity-75 font-thin leading-6 text-sm sm:text-xl '><p className=' mt-4'>Dive right into <span className='text-green font-bold'>coding</span> with our easy-to-follow live tutorials and tools <span className='text-green font-bold'>designed</span> for beginners and pros alike. Start building your first <span className='text-green font-bold'>project</span> today!</p></div>
      </div>
      <div className='mt-20'>

        <h1 className='text-center text-white  opacity-40 font-bold text-3xl sm:text-4xl block mb-10 tracking-[5px]'>Explore Skill</h1>
        <div className='flex justify-center items-center h-20 w-[90%] sm:w-[75%] m-auto relative'>
          <marquee scrollamount='2' behavior="alternate" className='text-green-400 opacity-50 font-bold text-5xl sm:text-6xl'>
            <span className='m-5'>HTML</span>
            <span className='m-5'>CSS</span>
            <span className='m-5'>CSS</span>
            <span className='m-5'>JAVASCRIP</span>
            <span className='m-5'>REACT JS</span>
            <span className='m-5'>NODE JS</span>
            <span className='m-5'>EXPRESS JS</span>
            <span className='m-5'>MONGODB</span>
            <span className='m-5'>C</span>
            <span className='m-5'>PYTHON</span>
            <span className='m-5'>GIT & GITHUB </span>
            <span className='m-5'>HTML</span>
            <span className='m-5'>CSS</span>
            <span className='m-5'>CSS</span>
            <span className='m-5'>JAVASCRIP</span>
            <span className='m-5'>REACT JS</span>
            <span className='m-5'>NODE JS</span>
            <span className='m-5'>EXPRESS JS</span>
            <span className='m-5'>MONGODB</span>
            <span className='m-5'>C</span>
            <span className='m-5'>PYTHON</span>
            <span className='m-5'>GIT & GITHUB </span>
            <span className='m-5'>HTML</span>
            <span className='m-5'>CSS</span>
            <span className='m-5'>CSS</span>
            <span className='m-5'>JAVASCRIP</span>
            <span className='m-5'>REACT JS</span>
            <span className='m-5'>NODE JS</span>
            <span className='m-5'>EXPRESS JS</span>
            <span className='m-5'>MONGODB</span>
            <span className='m-5'>C</span>
            <span className='m-5'>PYTHON</span>
            <span className='m-5'>GIT & GITHUB </span>

          </marquee>
          <div className=' bg-gradient-to-l to-[#060A23] from-transparent w-[50%] absolute top-0 left-0  h-full'> </div>
          <div className=' bg-gradient-to-r to-[#060A23] from-transparent w-[50%] absolute top-0 right-0  h-full'></div>

        </div>
      </div>

      <div className='flex justify-center items-center mt-10'>
        <img src={ARROW} height="200px" width="150px" />
      </div>
      <h1 className='text-center text-white  opacity-40 font-bold text-3xl sm:text-4xl block mb-10 tracking-[2px]'>How We Work</h1>

      <div className='min-h-72 w-full flex items-center justify-evenly flex-wrap mb-20 gap-14'>
        <div className='h-[350px] w-[300px] bg-gray-900  rounded-md overflow-hidden flex flex-col px-3'>
          <div className='h-[160px] w-full overflow-hidden flex items-center justify-center cursor-pointer'>
            <img src={CIRCLE} className='w-[300px] object-cover hover:animate-pulse duration-300' />
          </div>
          <div>
            <h3 className='hevy text-green text-4xl tracking-[5px]'>Learn :</h3>
            <p className='text-white font-thin opacity-75 '>where you are learn from zero to advanced from understanding the core principles and basics . We always making sure to connect theory with real-world applications. </p>
          </div>
        </div>


        <div className='h-[350px] w-[300px] bg-gray-900  rounded-md overflow-hidden flex flex-col px-3'>
          <div className='h-[160px] w-full overflow-hidden flex items-center justify-center cursor-pointer'>
            <img src={ROUND} className='w-[300px] object-cover hover:animate-bounce duration-300' />
          </div>
          <div>
            <h3 className='hevy text-green text-4xl tracking-[5px]'>Explore :</h3>
            <p className='text-white font-thin opacity-75 '>We explore new methods thats help you grow up and build a storng knowladge  By exploring new ideas and continuously improving our content, we aim to give you the tools to not only learn but to master skills at your own pace</p>
          </div>
        </div>



        <div className='h-[350px] w-[300px] bg-gray-900  rounded-md overflow-hidden flex flex-col px-3'>
          <div className='h-[160px] w-full overflow-hidden flex items-center justify-center cursor-pointer'>
            <img src={THREED} className='w-full   object-cover hover:scale-[1.8] duration-300' />
          </div>
          <div>
            <h3 className='hevy text-green text-4xl tracking-[5px]'>Build :</h3>
            <p className='text-white font-thin opacity-75 '> We focus on building real-world projects that help you apply what you’ve learned. You will work on practical examples that solve actual problems, giving you hands-on experience.</p>
          </div>
        </div>
      </div>

      <div>
      <h1 className='text-center text-white  opacity-40 font-bold text-3xl sm:text-3xl block mb-10 tracking-[2px]'>Understand Workflow</h1>
       <div className='w-full min-h-96  relative'>
           <div className='m-auto h-[80px] sm:h-[100px] w-[90%] sm:w-[40%] cursor-wait relative flex items-center  justify-center border-2 text-4xl sm:text-5xl font-medium border-green-300 text-linear border-r-1 bordered-r-sm rounded-t-[10px]'>request course
             <span className='h-[20px] w-[20px] absolute  bg-green-300 border-4 border-green-600 -top-5 -left-3 shadow-green'></span>
             <span className='h-[20px] w-[20px] absolute  bg-green-300 border-4 border-green-600 -top-5 -right-3 shadow-lg shadow-green-400'></span>
             <span className='h-[20px] w-[20px] absolute  bg-green-300 border-4 border-green-600 -bottom-5 -left-3'></span>
             <span className='h-[20px] w-[20px] absolute  bg-green-300 border-4 border-green-600 -bottom-5 -right-3 shadow-green'></span>
             <div className='h-[90%] w-[99%] border-[0.3px] border-gray-300 absolute -top-[0.1] opacity-60 '></div>
           </div>
          <div className=' w-[70px] h-[70px] m-auto'><img src={ARROW1} className='h-full object-contain w-full '/></div>
          <div className='m-auto h-8 w-[90%] text-center text-white mt-2'><span className='bg-gradient-to-tr to-gray-800 from-slate-500 py-1  sm:px-7  px-2  rounded-md text-2xl opacity-75 font-thin shaow-lg shadow-gray-100'>our assitant call you</span></div>
          <div className='m-auto h-8 w-[90%] text-center text-white mt-6'><span className='bg-gradient-to-tr to-gray-800 from-slate-500 py-1  sm:px-7  px-2 rounded-md text-2xl opacity-75 font-thin shaow-lg shadow-gray-100'>pay & attend live lectures</span></div>
         <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b to-black from-transparent'></div>
       </div>
      </div>
    </>


  )
}

