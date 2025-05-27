import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URI;

function Myprogress({ user }) {
  const  courseId  = useParams(); 

  const [ansno,setansno]= useState([]);

  console.log(ansno)
  

  const Loaduserassignment = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/answer/getuseranswer/${user._id}/${courseId.id}`, {
        withCredentials: true,
      });
      const data = response.data;
      setansno(data.data);

    } catch (error) {
      console.error("Error fetching user assignment:", error);
    }
  };

  useEffect(() => {
    Loaduserassignment();
  }, []);

  return (
    <div className='absolute top-0 left-0 h-screen w-screen z-[100] backdrop-blur-md'>
         <div>
          {
            ansno.length > 0 ? (
              ansno.map((item, index) => (
                console.log (item),
                <div key={index} className='bg-gray-900 p-4 m-2 rounded-lg'>
                  <h3 className='text-white text-lg'>Assignment {index + 1}</h3>
                  <p className='text-gray-400'>Question: {item.assignmentID.question}</p>
                
                </div>
              ))
            ) : (
              <p className='text-white'>No assignments found for this user.</p>
            )
          }
         </div>
    </div>
  );
}

export default Myprogress;
