import axios from 'axios'
import { closeSnackbar, useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI


const ShowQuiz = ({ quizdata }) => {

  console.log(quizdata)

  const [viewQuiz, setViewQuiz] = useState(false)
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const linkQuiz = async () => {
    const snakID = enqueueSnackbar('connecting quiz', { variant: 'info' });
    try {
      const responce = await axios.post(`${API_URL}/api/quiz/lickquiz`, {
        quizId: `${quizdata._id}`,
        courseId: id
      }, { withCredentials: true });

      if (responce.data.success) {
        closeSnackbar(snakID)
        return enqueueSnackbar(responce.data?.message, { variant: 'success' })
      } else {
        return enqueueSnackbar(responce.data.message, { variant: 'error' })
      }
    } catch (error) {
      return enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <div className='text-white min-h-[150px] bg-gray-800 mt-5 w-[75%] p-4 rounded-md shadow-sm shadow-green-600 mx-auto'>
      <div className='text-xl'>{quizdata?.name}</div>
      <div className='text-sm text-gray-500'>{quizdata?._id}</div>
      <div className='mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-7'>
        <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 ' onClick={() => setViewQuiz(true)}>view <i className="ri-eye-fill"></i></button>
        <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 ' onClick={() => linkQuiz()}>connect <i class="ri-links-fill"></i></button>
        {quizdata?.isLock ?
          <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 '>lock <i class="ri-lock-fill"></i></button> :
          <button className='bg-green-400 px-6 py-1 text-black text-[20px] rounded-sm shadow-sm shadow-black hover:bg-green-500 '>unlock <i class="ri-lock-unlock-fill"></i></button>
        }
      </div>
      {
        viewQuiz ?
          <div className='min-h-screen w-screen absolute top-0 left-0  backdrop-blur-md flex items-center justify-center bg-blur-gray'>
            <div className="h-[100%] w-[90%] bg-gray-800 mt-20 overflow-hidden">
              <span className='flex justify-end text-5xl text-gray-400 md:mr-2 cursor-pointer' onClick={() => { setViewQuiz(false) }}><i className="ri-close-line "></i>
              </span>
              <div className='h-full w-full overflow-y-scroll hide-scroll-bar'>
                {
                  quizdata?.allquestions?.map((que, index) => (

                    <div className='min-h-[230px] w-[80%] m-4 bg-gray-600 mx-auto rounded-md'>

                      <div className='ml-4 text-xl text-gray-300'>{index + 1}.  {que?.question}</div>
                      <div className='flex flex-col ml-10'>
                        <span className='text-gray-400 '><i className="ri-circle-fill text-sm"></i> <span className='text-[15px]'>{que?.options[0]}</span></span>
                        <span className='text-gray-400 '><i className="ri-circle-fill text-sm"></i> <span className='text-[15px]'>{que?.options[1]}</span></span>
                        <span className='text-gray-400 '><i className="ri-circle-fill text-sm"></i> <span className='text-[15px]'>{que?.options[2]}</span></span>
                        <span className='text-gray-400 '><i className="ri-circle-fill text-sm"></i> <span className='text-[15px]'>{que?.options[3]}</span></span>
                      </div>
                      <div className='h-4 w-full mt-5 ml-8'>
                        <span className='bg-green-900 p-2 mr-2 rounded-md'>Correct Ans </span>
                        : <span className='text-2xl'>{que?.correctAns}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div> : null
      }

    </div>
  )
}


const LoadAllQuiz = () => {

  const [quiz, setQuiz] = useState([])

  const fetchAllQuiz = async () => {

    try {
      const responce = await axios.get(`${API_URL}/api/quiz/allquize`)
      setQuiz(responce.data?.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchAllQuiz()
  }, [])


  return (
    <div className='h-full w-full'>
      <div className='text-5xl text-white hevy text-green ml-4 '>Quiz Settings</div>
      {
        quiz.map((quizdata, index) => (
          <>
            <ShowQuiz quizdata={quizdata} />
          </>
        ))
      }
    </div>
  )
}

export default LoadAllQuiz