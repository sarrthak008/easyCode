import React from 'react'
import { useStore } from '../context/Store'

function StartQuiz() {

     const {openquiz,setOpenquiz} = useStore()

  return (
    <div>StartQuiz</div>
  )
}

export default StartQuiz