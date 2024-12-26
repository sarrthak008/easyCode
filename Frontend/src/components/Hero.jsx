import React from 'react'
import ARROW from "../assets/arrrow.svg";
import CIRCLE from "../assets/circle.svg";
import ROUND from "../assets/round.svg";
import THREED from "../assets/3d.jpg";

export const Hero = () => {
  return (
    <>
      <div className='h-96 text-white w-full flex justify-center items-center flex-col relative bg-[url("./assets/bg.svg")] bg-center bg-cover bg-no-repeat'>

        <h1 className=' text-[4.8em]  uppercase  mt-[10%] hevy font-thin'>we Transform <span className='text-green'>Ideas</span> into <span className='text-green'>Code</span> !</h1>
        <div className=' w-80 text-center opacity-75 font-thin leading-6 text-xl '><p className=' mt-4'>Dive right into <span className='text-green font-bold'>coding</span> with our easy-to-follow live tutorials and tools <span className='text-green font-bold'>designed</span> for beginners and pros alike. Start building your first <span className='text-green font-bold'>project</span> today!</p></div>
      </div>
      <div className='mt-20'>

        <h1 className='text-center text-white  opacity-40 font-bold text-[3vw] block mb-10 tracking-[5px]'>Explore Skill</h1>
        <div className='flex justify-center items-center h-20 w-[75%] m-auto relative'>
          <marquee scrollamount='2' behavior="alternate" className='text-green-400 opacity-50 font-bold text-4xl'>
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
      <h1 className='text-center text-white  opacity-40 font-bold text-[3vw] block mb-10 tracking-[5px]'>How We Work</h1>
     
      <div className='h-72 w-full flex items-center justify-evenly flex-wrap mb-20'>
           <div className='h-[350px] w-[300px] bg-gray-900  rounded-md overflow-hidden flex flex-col px-3'>
                 <div className='h-[160px] w-full overflow-hidden flex items-center justify-center cursor-pointer'>
                       <img src={CIRCLE} className='w-[300px] object-cover hover:animate-pulse duration-300'/>
                 </div>
                 <div>
                   <h3 className='hevy text-green text-4xl tracking-[5px]'>Learn :</h3>
                   <p className='text-white font-thin opacity-75 '>where you are learn from zero to advanced from understanding the core principles and basics . We always making sure to connect theory with real-world applications. </p>
                 </div>
           </div>


           <div className='h-[350px] w-[300px] bg-gray-900  rounded-md overflow-hidden flex flex-col px-3'>
                 <div className='h-[160px] w-full overflow-hidden flex items-center justify-center cursor-pointer'>
                       <img src={ROUND} className='w-[300px] object-cover hover:animate-bounce duration-300'/>
                 </div>
                 <div>
                   <h3 className='hevy text-green text-4xl tracking-[5px]'>Explore :</h3>
                   <p className='text-white font-thin opacity-75 '>We explore new methods thats help you grow up and build a storng knowladge  By exploring new ideas and continuously improving our content, we aim to give you the tools to not only learn but to master skills at your own pace</p>
                 </div>
           </div>



           <div className='h-[350px] w-[300px] bg-gray-900  rounded-md overflow-hidden flex flex-col px-3'>
                 <div className='h-[160px] w-full overflow-hidden flex items-center justify-center cursor-pointer'>
                       <img src={THREED} className='w-full   object-cover hover:scale-[1.8] duration-300'/>
                 </div>
                 <div>
                   <h3 className='hevy text-green text-4xl tracking-[5px]'>Build :</h3>
                   <p className='text-white font-thin opacity-75 '> We focus on building real-world projects that help you apply what you’ve learned. You will work on practical examples that solve actual problems, giving you hands-on experience.</p>
                 </div>
           </div>
      </div>
    </>


  )
}

