import React, { useState } from 'react'
import Appinput from './Appinput'
import Appbtn from './Appbtn'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import { closeSnackbar, useSnackbar } from 'notistack'


const AddSyallbus = () => {
    const { enqueueSnackbar } = useSnackbar()
    let { id } = useParams()
    const [addinfo, setaddinfo] = useState({
        courseId: id,
        title: '',
        description: ''
    })
    const addSyallbus = async () => {

        try {
            if (!addinfo) {
                return enqueueSnackbar('Please fill all fields', { variant: 'error' });
            }
            const response = await axios.post(`${API_URL}/api/course/postSyallbus`, addinfo, { withCredentials: true })
            console.log(response)
             if (response.data.success) {
                 enqueueSnackbar(`${response.data.message}`, { variant: "success" });
             }
             else {
            enqueueSnackbar(`${response.data.message}`, { variant: "error" });
            }
        }
        catch (err) {
            enqueueSnackbar(errorMessage, { variant: 'error' });
            console.log(err);
        }
    }

    return (
        <>

            <div className='w-full h-screen flex justify-center items-center'>

                <div className='w-[50%] h-full  flex flex-col items-center justify-center'>
                    <h1 className='text-gray-400 text-3xl pb-4 bold'>Add Syallbus</h1>
                    <div className="w-[80%] h-[70%]  rounded-lg p-8 bg-gray-900 flex flex-col gap-7 text-white py-6 ">
                        <Appinput
                            type="text"
                            title="Enter Title"
                            value={addinfo.title}
                            onChange={(e) => setaddinfo({ ...addinfo, title: e.target.value })}
                        />
                        <textarea className=" bg-slate-500  p-2 w-[100%] mx-auto block text-white text-sm mt-8 resize-none outline-none border-0 border-b-2 border-b-green-400 h-[60%]" onChange={(e) => { setaddinfo({ ...addinfo, description: e.target.value }) }} placeholder='Enter your Description ' />
                    </div >
                        <div className='w-80 mt-2'>
                            <Appbtn title='Add' onClick={addSyallbus} />
                        </div>
                </div>

                <div className='w-[50%] h-full '>

                </div>

            </div >
        </>
    )
}

export default AddSyallbus