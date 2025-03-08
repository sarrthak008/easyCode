import React,{useState} from 'react'
import Appinput from '../Appinput'
import Appbtn from '../Appbtn'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import { closeSnackbar, useSnackbar } from 'notistack'
import axios from 'axios'


const Addassignmet = () => {

   const { enqueueSnackbar } = useSnackbar()
   const { id } = useParams()

    const [addinfo, setaddinfo] = useState({
        courseId: id,
        question: '',
        description: '',
        assignmetName: ''
    })


    const addAssignment = async () => {
        if (!addinfo.question || !addinfo.description || !addinfo.assignmetName) {
            return enqueueSnackbar('Please fill all fields', { variant: 'error' });
        }
      
        const response = await axios.post(`${API_URL}/api/assignment/addassignment`, addinfo, { withCredentials: true })
        if (response.data.success) {
            enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        }
        else {
            enqueueSnackbar(`${response.data.message}`, { variant: "error" });
        }
    }


  return (
    <>
      <div className='text-5xl text-white hevy text-green ml-4 pt-1 '>Add Assignment</div>
      <div className='h-screen w-screen flex items-center justify-center '>
        <div className='h-3/4 w-[90vw] sm:w-3/5 bg-gray-900 shadow-md shadow-gray-600'>
          <div className='w-[70%] mx-auto flex flex-col justify-center  gap-5 mt-10 text-white'>
            <Appinput
              type="text"
              title="Enter Question Name"
              value={addinfo.question}
              onChange={(e) => setaddinfo({ ...addinfo, question: e.target.value }) }
            />
           <textarea className=" bg-slate-500  p-2 w-[100%] mx-auto block text-white text-sm  resize-none outline-none border-0 border-b-2 border-b-green-400 h-[60%]" 
            placeholder='Enter  Description '
            value={addinfo.description}
            onChange={(e) => setaddinfo({ ...addinfo, description: e.target.value })}
             />
            <Appinput
              type="text"
              title="Enter Assignment Name"
              value={addinfo.assignmetName}
              onChange={(e) => setaddinfo({ ...addinfo, assignmetName: e.target.value })}
            />
          <span className='text-white'> <Appbtn
              title="Add Assignment"
              onClick={addAssignment}
            /></span> 
          </div>

        </div>
      </div>

    </>
  )
}

export default Addassignmet