import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URI;

function Myprogress({ user }) {
  const  courseId  = useParams(); 

  const [ansno,setansno]= useState(0);
  

  const Loaduserassignment = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/answer/getuseranswer/${user._id}/${courseId.id}`, {
        withCredentials: true,
      });
      const data = response.data;
      setansno(data.data.length());
    } catch (error) {
      console.error("Error fetching user assignment:", error);
    }
  };

  useEffect(() => {
    Loaduserassignment();
  }, []);

  return (
    <div className='absolute top-0 left-0 h-screen w-screen z-[100] backdrop-blur-md'>
      
    </div>
  );
}

export default Myprogress;
