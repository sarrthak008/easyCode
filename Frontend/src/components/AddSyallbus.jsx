import React, { useEffect, useState } from 'react'
import Appinput from './Appinput'
import Appbtn from './Appbtn'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import { closeSnackbar, useSnackbar } from 'notistack'


// const SyllabusCard = ({syllabus})=>{
//      return(
//         <div className='w-[90%] h-[250px]  border-[1px] border-l-0 border-r-0 border-b-0 '>
//          <div className='text-gray-200  md:text-xl ml-7 mt-5 capitalize  '>{syllabus?.title}</div>
//          <p  className='text-gray-400 block w-[90%] sm:w-[80%] ml-10 sm:ml-20 mt-5 sm:mt-5 text-[10px] sm:text-sm font-thin'>{syllabus?.description?.split(".")[0]}{syllabus?.description?.split(".")[0]}</p>
//          <div className='text-green ml-7 sm:ml-20 mt-5 cursor-pointer text-[10px] sm:text-xl group'>Know more <i className="ri-arrow-right-line group-hover:ml-2 transition-all"></i></div>
//     </div>
//      )
// }

const AddSyallbus = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [allSyllabus ,setSyllabus] = useState([])

    let { id } = useParams()
    const [addinfo, setaddinfo] = useState({
        courseId: id,
        title: '',
        description: ''
    })
    const addSyallbus = async () => {
       
        let snackid= enqueueSnackbar('adding syllabus',{variant:'info'});
        try {
            if (!addinfo) {
                return enqueueSnackbar('Please fill all fields', { variant: 'error' });
            }
            const response = await axios.post(`${API_URL}/api/course/postSyallbus`, addinfo, { withCredentials: true })
            //console.log(response)
             if (response.data.success) {
                 enqueueSnackbar(`${response.data.message}`, { variant: "success" });
                  closeSnackbar(snackid);
                   setaddinfo({
                       courseId: id,
                       title: '',
                       description: ''
                   })
                   fetchCourses()
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

    const fetchCourses = async () => { 
         try{
            let responce = await axios.get(`${API_URL}/api/course/getcourse/`)
            if(responce.data.success){
                setSyllabus(responce.data?.data[0]?.Syllabus)
            }else{
              enqueueSnackbar(`${responce.data.message}`,{variant:`error`})
            }
         }catch(error){
            enqueueSnackbar(`${error.message}`,{variant:`error`})
         }
      }
    
      useEffect(()=>{
         fetchCourses()
      },[])

    //   useEffect(()=>{
    //     fetchCourses()
    //  },[allSyllabus])


    return (
        <>

            <div className='w-full h-screen flex justify-center items-center'>

                <div className='w-[50%] h-full  flex flex-col items-center justify-center'>
                    <h1 className='text-gray-400 text-4xl pb-4 font-medium'>Add Syallbus</h1>
                    <div className="w-[80%] h-[70%]  rounded-lg p-8 bg-gray-900 flex flex-col gap-7 text-white py-6 ">
                        <Appinput
                            type="text"
                            title="Enter Title"
                            value={addinfo.title}
                            onChange={(e) => setaddinfo({ ...addinfo, title: e.target.value })}
                        />
                        <textarea className=" bg-slate-500  p-2 w-[100%] mx-auto block text-white text-sm mt-8 resize-none outline-none border-0 border-b-2 border-b-green-400 h-[60%]" value={addinfo.description} onChange={(e) => { setaddinfo({ ...addinfo, description: e.target.value }) }} placeholder='Enter your Description ' />
                    </div >
                        <div className='w-80 mt-2 text-white'>
                            <Appbtn title='Add' onClick={addSyallbus} />
                        </div>
                </div>
{/* 
                <div className=' hidden md:block w-[50%] h-full flex flex-col bg-gray-900 overflow-y-scroll'>
                 {allSyllabus?.map((syllabus,index)=>(
                    <SyllabusCard syllabus={syllabus}/>
                 ))}
                </div> */}

                
            </div >
        </>
    )
}

export default AddSyallbus