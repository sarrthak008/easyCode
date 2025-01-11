import React, { useState } from 'react';
import Appinput from '../components/Appinput';
import Navbar from '../components/Navbar';
import Appbtn from '../components/Appbtn';
import Quizganarator from '../components/Quizganarator';

const AddQuiz = () => {

    const [totalQuestion,setTotalQuestion] = useState([])
    const [quizname,setquizname] = useState("")
    

    return (
        <>
            <Navbar />
            <div className="w-full h-screen flex flex-col justify-center items-center mt-[10%]">

                <h1 className="text-4xl text-white opacity-60 mb-4 font-bold">Add Quiz</h1>
                <div className="w-[90%] h-[100%] sm:w-[60%] rounded-lg p-8 bg-gray-900 flex flex-col gap-7 text-white py-6">
                    <div className='flex justify-between w-full border-b-2 pb-7 border-white'>
                      <div className='w-[60%]'><Appinput
                       title='enter the quiz name'
                       value={quizname}
                       onChange={(e)=>{setquizname(e.target.value )}}
                      /></div>
                      
                    </div>
                    <div className='w-full h-12 flex'>
                        {
                          totalQuestion?.map((t,index)=>(
                            <div className='h-[35px] w-[35px] rounded-full bg-green-500 flex items-center justify-center text-xl text-black'>{index+1}</div>
                          ))
                        }
                    </div>
                    {/* ADD QUIZ GANARATOR.... */}
                    <Quizganarator setTotalQuestion={setTotalQuestion} totalQuestion={totalQuestion} quizname={quizname}/>
                </div>
            </div >
        
    
        </>
    );
}

export default AddQuiz;
