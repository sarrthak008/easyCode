import React, { useState } from 'react';
import Appinput from '../components/Appinput';
import Navbar from '../components/Navbar';
import Appbtn from '../components/Appbtn';
import Quizganarator from '../components/Quizganarator';
import Speeddial from '../components/Speeddial';

const AddQuiz = () => {

  const [totalQuestion, setTotalQuestion] = useState([])
  const [quizname, setquizname] = useState("")

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col  mt-[10%]">

        <h1 className="text-4xl text-white opacity-60 mb-4 font-bold">Add Quiz</h1>
        <div className="w-[100%] h-[100%] sm:w-[70%]  rounded-lg p-1 sm:p-8 bg-gray-900 flex items-center justify-center flex-col gap-7 text-white py-6 mx-auto">
          <div className='flex justify-between w-full border-b-2 pb-7 border-white'>
            <div className='w-full sm:w-[60%]'><Appinput
              title='enter the quiz name'
              value={quizname}
              onChange={(e) => { setquizname(e.target.value) }}
            /></div>

          </div>
          <div className='w-full h-12 flex'>
            {
              totalQuestion?.map((t, index) => (
                <div className='h-[35px] w-[35px] rounded-full bg-green-500 flex items-center justify-center text-xl text-black'>{index + 1}</div>
              ))
            }
          </div>
          {/* ADD QUIZ GANARATOR.... */}
          <Quizganarator setTotalQuestion={setTotalQuestion} totalQuestion={totalQuestion} quizname={quizname} />
        </div>
      </div >

      <div className='fixed bottom-16 right-10'>
        <Speeddial />
      </div>
    </>
  );  
}

export default AddQuiz;
