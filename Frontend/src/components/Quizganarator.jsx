import React, { useState } from 'react'
import Appinput from './Appinput'
import Appbtn from './Appbtn'

const Quizganarator = ({setTotalQuestion,totalQuestion}) => {
   
    const [viewQuiz,setViewQuiz] = useState(true)
    const [allquestion,setAllquestion] = useState([])
    const [curentQuestion,setCurrentQuestion] =useState({
        question:'',
        options:['','','',''],
        correctAns:''
    })


    const handleOptionChange = (index, value) => {
        const updatedOptions = [...curentQuestion.options]; 
        updatedOptions[index] = value; 
        setCurrentQuestion({
            ...curentQuestion,
            options: updatedOptions
        });
    };

    const click =()=>{
        setAllquestion([...allquestion,curentQuestion])
        setTotalQuestion([...totalQuestion,Math.random()*100])
    }


  return (
    <div className='h-full w-[90%] flex flex-col gap-4'>
         <Appinput title='enter a question' value={curentQuestion.question} onChange={(e)=>setCurrentQuestion({...curentQuestion,question:e.target.value})}/>
         <div className='w-[70%]'><Appinput title='option 1 ' value={curentQuestion.options[0]}  onChange={(e)=> handleOptionChange(0, e.target.value)}/></div>
         <div className='w-[70%]'><Appinput title='option 2' value={curentQuestion.options[1]} onChange={(e)=> handleOptionChange(1, e.target.value)}/></div>
         <div className='w-[70%]'><Appinput title='option 3' value={curentQuestion.options[2]} onChange={(e)=> handleOptionChange(2, e.target.value)}/></div>
         <div className='w-[70%]'><Appinput title='option 4' value={curentQuestion.options[3]} onChange={(e)=> handleOptionChange(3, e.target.value)}/></div>
         <div className='w-[70%]'><Appinput title='correct answer' onChange={(e) => setCurrentQuestion({ ...curentQuestion, correctAns: e.target.value })}/></div>
        <div className='w-full'>
            {
                totalQuestion.length < 10 ? 
                <Appbtn title='next' onClick={()=>click()}/> :
                 <div className='w-full h-full flex'>
                      <div className='w-[50%]'><Appbtn title='view'/></div>
                      <div className='w-[50%]'><Appbtn title='upload'/></div>
                 </div>
            }
        </div>
        {
          viewQuiz ? <div className='h-screen w-screen absolute top-0 left-0  backdrop-blur-md flex items-center justify-center bg-blur-gray'>
             {
                allquestion.map((question)=>(
                    <div className='text-white'>{hiii}</div>
                ))
             }
          </div> : null
        }
    </div>
  )
}

export default Quizganarator