import axios from 'axios'
import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_SERVER_URI


const ShowQuiz = ({quizdata})=>{
   return(
    <div className='text-white min-h-[150px] bg-red-200 mt-5 w-[80%] mx-auto'>
      hello
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