import React,{useState} from 'react'
import Appinput from '../Appinput'
import Appbtn from '../Appbtn'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import { closeSnackbar, useSnackbar } from 'notistack'
import axios from 'axios'

function Addvideo() {
    const { enqueueSnackbar } = useSnackbar()
    const { id } = useParams()
  
    const [addinfo, setaddinfo] = useState({
        title: '',
        link1 : '',
        link2 : '',
       link3 : ''
    })

    const addVideo = async () => {
        if (!addinfo.title || !addinfo.link1 ) {
            return enqueueSnackbar('Please fill all fields', { variant: 'error}' } );
        }
       

        let video_url = [addinfo.link1, addinfo.link2, addinfo.link3]
        video_url = video_url.filter((url) => url !== '')
       



        const videoData = {
            courseId: id,
            video_title: addinfo.title,
            video_url:video_url
        };
        const response = await axios.post(`${API_URL}/api/video/uploadvideo`, videoData, { withCredentials: true })
        
        if (response.data.success) {
           // console.log(response.data.message)
            enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        }
        else {
            console.log(response.data.message)
            enqueueSnackbar(`${response.data.message}`, { variant: "error" });
        }
        

    }


  

    console.log(addinfo)
    return (
        <>
            <div className='text-5xl text-white hevy text-green ml-4 pt-1 '>Add Video</div>

            <div className='w-full h-screen flex justify-center items-center'>

                <div className='w-[50%] h-full  flex flex-col items-center justify-center'>
                    <h1 className='text-gray-400 text-4xl pb-4 font-medium'></h1>
                    <div className="w-[80%] h-[70%]  rounded-lg p-8 bg-gray-900 flex flex-col gap-7 text-white py-6 ">
                        <Appinput
                            type="text"
                            title="Enter Title"
                            value={addinfo.title}
                            onChange={(e) => setaddinfo({ ...addinfo, title: e.target.value })}
                        />
                        <Appinput
                            type="text"
                            title="Enter link 1"
                            value={addinfo.link1}
                            onChange={(e) => setaddinfo({ ...addinfo, link1: e.target.value })}
                        />
                        <Appinput
                            type="text"
                            title="Enter link 2"
                            value={addinfo.link2}
                            onChange={(e) => setaddinfo({ ...addinfo, link2: e.target.value })}
                        />
                        <Appinput
                            type="text"
                            title="Enter link 3"
                           value={addinfo.link3}
                            onChange={(e) => setaddinfo({ ...addinfo, link3: e.target.value })}
                        />
                    </div >
                    <div className='w-80 mt-2 text-white'>
                        <Appbtn title='Add' onClick={addVideo} />
                    </div>
                </div>
            </div >




        </>
    )
}

export default Addvideo