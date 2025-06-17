import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_SERVER_URI
import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'
import Shadow from '../components/Shadow'
import { useSnackbar } from 'notistack'
import INFO from '../utils/comman'


const AssignmentForm = ({ courseId, assignmentId, userId, setShowForm }) => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [githubUrl, setGithubUrl] = useState("");
   const [hostingUrl, setHostingUrl] = useState("");
   const { enqueueSnackbar, closeSnackbar } = useSnackbar()

   const handleFileChange = (e) => {
      if (e.target.files.length > 0) {
         setSelectedFile(e.target.files[0]);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!selectedFile) {
         enqueueSnackbar("please select image", { variant: "error" });
         return 0;
      }

      const formData = new FormData();
      formData.append("image", selectedFile, selectedFile.name);
      formData.append("github_URL", githubUrl);
      formData.append("host_URL", hostingUrl);
      formData.append("courseID", courseId);
      formData.append("assignmentID", assignmentId);
      formData.append("userID", userId);

      try {
         const snkid = enqueueSnackbar("submitting assignment...", { variant: 'info' });

         const response = await axios.post(`${API_URL}/api/answer/addassignment`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
         });
         if (response.data.success) {
            closeSnackbar(snkid)
            enqueueSnackbar(response.data.message, { variant: 'success' })
            setShowForm(false)
         } else {
            closeSnackbar(snkid)
            enqueueSnackbar(response.data.message, { variant: 'error' })
         }
      } catch (error) {
         console.error("Upload Error:", error);
         alert("Failed to submit assignment.");
      }
   };

   return (
      <div className="h-screen cursor-pointer w-screen fixed z-40 backdrop-blur-md top-0 left-0 bg-gray-900 opacity-95 flex items-center justify-center" onClick={() => setShowForm(false)}>
         <form
            encType="multipart/form-data"
            method="post"
            className="min-h-[70%] w-[90%] sm:w-[55%] flex flex-col gap-6 bg-gray-800 px-10 py-6 rounded-lg"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
         >

            <div className="flex flex-col">
               <input
                  type="file"
                  id="fileInput"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handleFileChange}
               />
               <label
                  htmlFor="fileInput"
                  className="cursor-pointer py-2 mt-6 text-center border-2 block border-green-500 shadow-md shadow-gray-900 hover:bg-green-800 bg-green-400"
               >
                  Output Screenshot <i className="ri-upload-2-line"></i>
               </label>
               {selectedFile && <p className="text-green-400 mt-2">Selected: {selectedFile.name}</p>}
            </div>

            <div className="flex flex-col">
               <label className="text-gray-100"><i className="ri-github-fill"></i> Enter GitHub URL</label>
               <input
                  type="text"
                  className="text-md py-2 outline-none border-l-0 border-t-0 border-r-0 px-2 border-2 border-b-green-400 bg-gray-600 text-white"
                  placeholder="Paste your GitHub repo URL"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
               />
            </div>

            <div className="flex flex-col">
               <label className="text-gray-100"><i className="ri-earth-fill"></i> Enter Hosting URL</label>
               <input
                  type="text"
                  className="text-md py-2 outline-none border-l-0 border-t-0 border-r-0 px-2 border-2 border-b-green-400 bg-gray-600 text-white"
                  placeholder="Paste your hosting URL"
                  value={hostingUrl}
                  onChange={(e) => setHostingUrl(e.target.value)}
               />
            </div>

            <button type="submit" className="button-8 mt-5">
               Submit
            </button>
         </form>
      </div>
   );
};




const ViewAssignmet = () => {

   let { assignmentId, courseId } = useParams()
   const [loadedData, setLoadedData] = useState({})
   const [assignmentStatus, setassignmentStatus] = useState("Loading Status")
   const { currentUser } = useStore()
   const [userAnswer, setuserAnswer] = useState([])
   const [showForm, setShowForm] = useState(false)

   const LoadAssignmentByID = async () => {
      try {
         let responce = await axios.get(`${API_URL}/api/assignment/getassignmentById/${assignmentId}`)
         if (responce.data?.success) {
            setLoadedData(responce.data.data)
         }
      } catch (error) {
         console.log(error)
      }
   }

   const loadUserAssignment = async () => {
      try {
         const responce = await axios.get(`${API_URL}/api/answer/getuseroneassignment/${currentUser()?._id}/${assignmentId}`);
         setuserAnswer(responce.data.data)
         if (responce.data?.data.length == 0) {
            setassignmentStatus('please submit your assignment')
         } else {
            setassignmentStatus(responce.data.data[0]?.status)
         }
      } catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      LoadAssignmentByID()
      loadUserAssignment()
   }, [])


   return (
      <>
         <Navbar />
         <div className='h-screen w-screen overflow-x-hidden-hidden'>
            <div className='w-[95%] sm:w-[80%] p-5 min-h-[40%] bg-gradient-to-tr from-green-900 to-gray-600 mt-16 mx-auto rounded-lg border-[1px] border-gray-500 flex flex-col  gap-3'>
               <div className='text-xl text-green-400 font-semibold'> <i className="ri-git-merge-fill"></i> Assignment !</div>
               <div className="text-3xl text-white font-bold">
                  {loadedData.question ? loadedData.question : <div className="w-[60%] h-10 bg-gray-400 animate-pulse rounded"></div>}
               </div>

               <div className="text-xl text-gray-400">
                  {loadedData.description ? loadedData.description : <div className="w-[80%] h-6 bg-gray-500 animate-pulse rounded"></div>}
               </div>

               <div className='h-10 w-[90%] flex justify-start items-center gap-3'>
                  <div className='h-[15px] w-[15px] bg-green-700 relative rounded-full '>
                     <div className='h-[15px] w-[15px] bg-green-400 rounded-full animate-ping '>
                     </div>
                  </div>
                  <h3 className='text-sm text-gray-200 capitalize text-xl'>{assignmentStatus}..</h3>
               </div>

               <div>
                  {
                     userAnswer?.length == 0 ?
                        <div className='h-20 w-[90%] mt-10'>
                           <button className=" button-8 " onClick={
                              () => setShowForm(true)
                           }>
                              Submit
                              <i className="ri-upload-cloud-line ml-2 transition-transform duration-300 group-hover:translate-y-1 group-hover:rotate-12"></i>
                           </button>

                        </div>
                        : <div className='min-h-20 w-[90%] '>
                           <h3 className='text-white text-2xl font-bold'> <i className="ri-arrow-right-up-line font-thin"></i> your submission...</h3>
                           <hr className='mt-4'></hr>

                           {
                              assignmentStatus == "approved" ?
                                 <div className='flex text-gray-300 gap-1 items-center my-4'>
                                    <div className='h-[45px] w-[45px] bg-gray-900 mt-3 rounded-full overflow-hidden'>
                                       <img src={INFO?.PROFILE_URL} />
                                    </div>
                                    <div className='flex flex-col '>
                                       <span className='text-[16px] text-white'>{INFO?.BRAND_NAME}</span>
                                       <span>{ userAnswer[0].message ? userAnswer[0].message : INFO.DEFAULT_MESSAGE  }</span>
                                    </div>
                                 </div> : null
                           }

                           <div className='min-h-52 w-[95%] rounded-md  flex gap-3 flex-wrap mt-4'>
                              <div className='h-[250px] w-[450px] bg-red-500 overflow-hidden rounded-md'>
                                 <img src={userAnswer[0].answer_pic} className='h-full w-full object-cover'></img>
                              </div>
                              <div className='text-gray-300'>
                                 <h5 className='text-white text-xl '>related information: </h5>
                                 <div className='flex items-center text-xl'><i className="ri-github-fill mt-1"></i>github url: <a href={userAnswer[0].github_URL} className='text-green-400 ml-3 line-clamp-1'>{userAnswer[0].github_URL}</a></div>
                                 <div className='flex items-center text-xl'><i className="ri-link mt-1"></i>host url: <a href={userAnswer[0].host_URL} className='text-green-400 ml-3 line-clamp-1'>{userAnswer[0].host_URL}</a></div>
                                 <div className='flex items-center text-md'><i className="ri-pushpin-fill"></i>Assignment Id: {userAnswer[0].assignmentID?._id}</div>
                                 <span className='mt-7 block'><i className="ri-alarm-warning-fill"></i> we <b>approved</b> your assignment please wait . </span>
                              </div>

                           </div>
                        </div>
                  }
               </div>

            </div>
         </div>
         <Shadow />
         {showForm ? <AssignmentForm setShowForm={setShowForm} courseId={courseId} assignmentId={assignmentId} userId={currentUser()._id} /> : null}
      </>
   )
}

export default ViewAssignmet