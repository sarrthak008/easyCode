import React from 'react'
import { useStore } from '../context/Store'

function StartQuiz() {

     const {openquiz,setOpenquiz} = useStore()
     console.log(openquiz)

  return (
    <div>StartQuiz</div>
  )
}

export default StartQuiz