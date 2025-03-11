import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI


const ShowSubmittedUsers = () => {
    const {assignmentId} = useParams()
    const loadAssignmentAnswers = async () => {
        try {
            let responce = await axios.get(`${API_URL}/api/answer/getallanswers/${assignmentId}`)
            console.log(responce.data)
        } catch (error) {

        }
    }
    useEffect(()=>{
      loadAssignmentAnswers()  
    },[])
    return (
        <div>ShowSubmittedUsers</div>
    )
}

export default ShowSubmittedUsers