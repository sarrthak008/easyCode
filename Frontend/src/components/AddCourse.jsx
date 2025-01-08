import React, { useState } from 'react';
import Appinput from './Appinput';
import Appbtn from './Appbtn';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Shadow from '../components/Shadow'

const API_URL = import.meta.env.VITE_SERVER_URI; // Use environment variable for API URL

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
        console.log(data);
        
        try {
            const response = await axios.post(`${API_URL}/api/course/addcourse`, data,{
                withCredentials: true 
            }); 

            if (response.data.success) {
                enqueueSnackbar(response.data.message, { variant: "success" }); 
            } else {
                enqueueSnackbar(response.data.message, { variant: "error" }); 
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
        }
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center mt-10">
            <h1 className="text-4xl text-white mb-4 font-bold">Add Course</h1>
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
                <Appinput
                    type="text"
                    title="Enter Course Instructor"
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    value={formData.instructor}
                />
            </div>
            <div className="w-[90%] flex justify-start ">
                <div className="sm:w-[50%] flex justify-start  mt-4 mx-auto text-white">
                    <Appbtn title="Add Course" onClick={handleSubmit} />
                </div>
            </div>
            <Shadow/>
        </div>
    );
};

export default AddCourse;
