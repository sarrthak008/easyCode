import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_SERVER_URI


const ShowQuiz = ({quizdata})=>{
   return(
    <div className='text-white min-h-[150px] bg-gray-800 mt-5 w-[75%] p-4 rounded-md shadow-sm shadow-green-600 mx-auto'>
       <div className='text-xl'>{quizdata?.name}</div>
       <div className='text-sm text-gray-500'>{quizdata?._id}</div>
       <div className='mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-7'>
          <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 '>view <i className="ri-eye-fill"></i></button>
          <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 '>connect <i class="ri-links-fill"></i></button>
          <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 '>lock <i class="ri-lock-fill"></i></button>
          <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 '>unlock <i class="ri-lock-unlock-fill"></i></button>
       </div>
    </div>
   )
}


const LoadAllQuiz = () => {
  
   const [quiz,setQuiz] = useState([])

  const fetchAllQuiz = async ()=>{
     
     try{
       const responce  = await axios.get(`${API_URL}/api/quiz/allquize`)
       setQuiz(responce.data?.data)
     }catch(error){
       console.log(error)
     }
   }
   

    useEffect(()=>{
       fetchAllQuiz()
    },[])


  return (
    <div className='h-full w-full'>      
      <div className='text-5xl text-white hevy text-green ml-4 '>Quiz Settings</div>
       {
         quiz.map((quizdata,index)=>(
           <>
             <ShowQuiz quizdata={quizdata}/>
           </>
         ))
       }
    </div>
  )
}

export default LoadAllQuiz