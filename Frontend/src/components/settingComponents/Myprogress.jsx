import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack'
import ARROWSVG from "../../assets/arrrow.svg"
import Appinput from '../Appinput'


const API_URL = import.meta.env.VITE_SERVER_URI;

function Myprogress({ user,setOpenProgress }) {
  const courseId = useParams();


  const [ansno, setansno] = useState([]);
  const [extraMsg, setExtraMsg] = useState("i am happy with your work, keep it up! 🎉");
  const [allassignment, setallassignment] = useState([]);

  

  const handelSubmission = async (info, status) => {
    let assgnmentId=   info?.assignmentID?._id

    try {
      const responce = await axios.post(`${API_URL}/api/answer/postapprovalassignment/${assgnmentId}`, {
        userid:user?._id,
        status: status,
        message: extraMsg
      }, { withCredentials: true });

      console.log(responce.data)

    } catch (error) {
      console.log(error)

    }
  }


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

  
   const Allassignment = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/assignment/getallcourseassignments/${courseId?.id}`, {
        withCredentials: true,
      });
      const data = response.data;
      setallassignment(data.data);
      
    } catch (error) {
      console.error("Error fetching all assignments:", error);  
    }
  };




  useEffect(() => {
    Loaduserassignment();
    Allassignment();
  }, []);

  return (
    <div className='absolute top-0 left-0 h-full w-screen z-[100] backdrop-blur-md'>

      

      <div className=' bg-gradient-to-r to-green-900 from-gray-800 z-20 p-6 mt-2 rounded-2xl flex justify-evenly items-center relative'>
        <span className=' absolute top-1 right-20 text-4xl text-white bg-red-500 cursor-pointer rounded-md' onClick={()=>setOpenProgress(false)}><i class="ri-close-line"></i></span>
        <div className="text-3xl text-white font-bold mt-4">
          {user.name ? user.name : <div className="w-[60%] h-10 bg-gray-400 animate-pulse rounded"></div>}
        </div>

         <div className='text-4xl text-white font-bold '>
                  <h1>{ansno.length}/ {allassignment.length}</h1>
         </div>
          
      </div>
      <div className='w-full h-1 mt-10 mb-10 bg-gray-400 rounded-xl relative flex items-center justify-center'>
        <span className='text-white bg-green-400 py-1 px-4 rounded-2xl '>submissions</span>
      </div>
      {/* show all subimited assignment here */}
      <div className='flex flex-col items-center justify-center min-h-screen'>
        {
          ansno.length == 0 ?
            <div className='h-[80%] w-[80%]  opacity-85 flex items-center justify-center flex-col'>
              <img src={ARROWSVG } className='h-[100px]' />
              <div className='text-2xl text-gray-300 mb-4'>Student Noting Submited Any Assignment...</div>
              <span className='text-gray-400 text-sm text-center'>"code, create, conquer. Every bug is a lesson, every line is progress. Keep going!" 🚀💻</span>
            </div>
            : <>
              {
                ansno.map((submission_info, index) => (
                  // console.log(submission_info),
                  <div className='min-h-[300px] overflow-hidden w-[90%] bg-gray-700 p-3 rounded-xl my-5' key={index}>
                    <div className='flex text-gray-300 gap-4 items-center'>

                    </div>
                    <div className='mt-4 flex gap-3 flex-wrap '>
                      <div className='h-[200px] w-[350px] bg-red-50 overflow-hidden rounded-md'>
                        <img src={submission_info?.answer_pic} className='h-full w-full object-fill'></img>
                      </div>
                      <div className='text-gray-300 flex flex-col gap-2'>
                        <h5 className='text-white text-xl '>related information: </h5>
                        <div className='flex items-center text-xl'><i className="ri-github-fill mt-1"></i>github url: <a target='_blank' href={submission_info?.github_URL} className='text-green-400 ml-3 line-clamp-1'>{submission_info?.github_URL}</a></div>
                        <div className='flex items-center text-xl'><i className="ri-link mt-1"></i>host url: <a target='_blank' href={submission_info?.host_URL} className='text-green-400 ml-3 line-clamp-1'>{submission_info?.host_URL}</a></div>
                        <div className='flex items-center text-xl'><i className="ri-pushpin-fill"></i>open url : <a target='_blank' href={submission_info?.answer_pic} className='text-green-400 ml-3 line-clamp-1'>open image</a></div>
                      </div>

                    </div>


                    {
                      submission_info.status !== "approved" && (
                        <>
                          <div className='text-white mt-4 w-[90%] sm:w-[75%]'>
                            <Appinput
                              title='Add message for user'
                              value={extraMsg}
                              onChange={(e) => setExtraMsg(e.target.value)}
                            />
                            <div className='w-screen flex flex-wrap gap-3 mt-3'>
                              <span className='py-2 px-4 bg-green-600 cursor-pointer rounded-md' onClick={() => setExtraMsg("Well done! Your assignment is excellent!🧨")}>
                                Well done! Your assignment is excellent!🧨
                              </span>
                              <span className='py-2 px-4 bg-green-600 cursor-pointer rounded-md' onClick={() => setExtraMsg("Impressive! Your assignment is well executed ✨")}>
                                Impressive! Your assignment is well executed ✨
                              </span>
                              <span className='py-2 px-4 bg-green-600 cursor-pointer rounded-md' onClick={() => setExtraMsg("Superb job! Keep up the dedication! 🎀")}>
                                Superb job! Keep up the dedication! 🎀
                              </span>
                              <span className='py-2 px-4 bg-green-600 cursor-pointer rounded-md' onClick={() => setExtraMsg("Brilliant work! You're on the right track! 📌")}>
                                Brilliant work! You're on the right track! 📌
                              </span>
                            </div>
                          </div>

                          <hr className='mt-5' />

                          <div className='mt-5 flex items-center gap-4 flex-wrap'>
                            <button className='py-2 px-5 text-white font-medium bg-green-600' onClick={() => handelSubmission(submission_info, "approved")}>
                              Approve
                            </button>
                            <button className='py-2 px-5 text-white font-medium bg-red-600' onClick={() => handelSubmission(submission_info, "rejected")}>
                              Reject
                            </button>
                          </div>
                        </>
                      )
                    }


                  </div>


                ))
              }

            </>
        }
      </div>




    </div>
  );
}

export default Myprogress;









