import React from 'react'
import { useStore } from '../context/Store'

function StartQuiz() {

    const { openquiz, setOpenquiz } = useStore()
    console.log(openquiz)

    return (
        <div className='h-screen w-screen flex flex-col items-center '>
            <h1 className='text-green-700 text-4xl text-center font-bold'>{openquiz.quizId.name}</h1>

            <div className=' h-full w-[80%]   bg-slate-600 rounded-md shadow-md p-4 overflow-y-scroll hide-scroll-bar '>
                {
                    openquiz?.quizId?.allquestions.map((que, index) => (
                        <div className='bg-gray-700 p-2 rounded-md mt-4' key={index}>
                            <div className='text-gray-200 text-2xl'>{index+1 } .{que.question}
                                {
                                    que.options.map((opt, index) => (
                                        <div className='flex items-center gap-2' key={index}>
                                            <input type='radio' name={que._id} value={opt} />
                                            <label className='text-base text-gray-400'>{opt}</label>
                                        </div>
                                    ))
                                }

                            </div>
                            </div>
                            ))

                  }
                        </div>
  
        </div>
            )
}

            export default StartQuiz