import React, { useEffect, useState } from 'react';
import Appinput from '../components/Appinput';
import Appbtn from '../components/Appbtn';
import axios from 'axios';
import { closeSnackbar, useSnackbar } from 'notistack';
import Shadow from '../components/Shadow'
import Speeddial from '../components/Speeddial';
const API_URL = import.meta.env.VITE_SERVER_URI; 

const AddCourse = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        courseName: "",
        courseImg: "",
        startingDate: "",
        prise: "",
        originalprise: "",
        discount: "",
        instructor: "",
    });
    const [options,setoptions] = useState([])



    const handleSubmit = async () => {
        if (!formData.startingDate || !formData.courseName || !formData.courseImg || !formData.prise || !formData.originalprise || !formData.discount || !formData.instructor) {
            enqueueSnackbar('Please fill all fields', { variant: 'error' });
            return false;
        }

        const { courseName: name, courseImg: image, startingDate, prise, originalprise, discount, instructor } = formData;

        const data = {
            name,
            image,
            startingDate,
            prise,
            originalprise,
            discount,
            instructor
        };
    //console.log(data)

        try {
            
             let snackid = enqueueSnackbar('adding new course...', { variant: "info" });
             const response = await axios.post(`${API_URL}/api/course/addcourse`, data, {
                withCredentials: true
            });

            if (response.data.success) {
                enqueueSnackbar(response.data.message, { variant: "success" });
                 closeSnackbar(snackid)
            } else {
                enqueueSnackbar(response.data.message, { variant: "error" });
                closeSnackbar(snackid)
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
        }
    };

    const AllAdmin = async () => {
        try{
            const response = await axios.get(`${API_URL}/api/admin/alladmin`)
           // console.log(response)
            setoptions(response?.data?.data)

        }
        catch(error){
            enqueueSnackbar(`${error.message}`,{variant:'error'})

        }
    }

    useEffect(()=>{
        AllAdmin()
    },[])

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center mt-10">
            <h1 className="text-4xl text-white opacity-60 mb-4 font-bold">Add Course</h1>
            <div className="w-[90%] h-[70%] sm:w-[60%] rounded-lg p-8 bg-gray-900 flex flex-col gap-7 text-white py-6 ">
                <Appinput
                    type="text"
                    title="Enter Course Name"
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    value={formData.courseName}
                />
                <Appinput
                    type="text"
                    title="Enter Course img"
                    onChange={(e) => setFormData({ ...formData, courseImg: e.target.value })}
                    value={formData.courseImg}
                />
                <Appinput
                    type="date"
                    title="Enter Course startingDate"
                    onChange={(e) => setFormData({ ...formData, startingDate: e.target.value })}
                    value={formData.startingDate}
                />
                <div className="flex w-full bg-gray- justify-between gap-4">
                    <div className="w-[35%]">
                        <Appinput
                            type="text"
                            title="Enter Course prise"
                            onChange={(e) => setFormData({ ...formData, prise: e.target.value })}
                            value={formData.prise}
                        />
                    </div>
                    <div className="w-[35%]">
                        <Appinput
                            type="text"
                            title="Enter Course OriginalPrise"
                            onChange={(e) => setFormData({ ...formData, originalprise: e.target.value })}
                            value={formData.originalprise}
                        />
                    </div>
                    <div className="w-[20%]">
                        <Appinput
                            type="text"
                            title="Discount"
                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                            value={formData.discount}
                        />
                    </div>
                </div>
                {/* <Appinput
                            type="text"
                            title="instrutor"
                            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            value={formData.instructor}
                        /> */}
                 <label>
          Select an option:
          <select value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} className=' bg-slate-600  p-2 w-full outline-none border-0 border-b-2 border-b-green-400 h-12 '>
             {<>
                <option value="">Please choose an option</option>
                 {
                 options?.map((option,index)=>(
                  <option value={option._id} key={index}>{option.name}</option>
                ))
                }

                </>
             }
          </select>
        </label> 
            </div>
            <div className="w-[90%] flex justify-start ">
                <div className="sm:w-[50%] flex justify-start  mt-4 mx-auto text-white">
                    <Appbtn title="Add Course" onClick={handleSubmit} />
                </div>
            </div>
            <Shadow />
            <div className='fixed bottom-16 right-10'>
                <Speeddial />
            </div>
        </div>
    );
};

export default AddCourse;
