import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const API_URL = import.meta.env.VITE_SERVER_URI;
import ARROWSVG from '../assets/assignmetnarr.svg';
import Appinput from '../components/Appinput';

const ShowSubmittedUsers = () => {
    const { assignmentId } = useParams();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [allsubmissions, setallsubmissions] = useState([]);
    const [assignmentInfo, setassignmentInfo] = useState({});
    const [extraMsg, setExtraMsg] = useState("");

    const LoadAssignmentByID = async () => {
        try {
            let response = await axios.get(`${API_URL}/api/assignment/getassignmentById/${assignmentId}`);
            if (response.data?.success) {
                enqueueSnackbar("Assignment loaded successfully", { variant: "success" });
                setassignmentInfo(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadAssignmentAnswers = async () => {
        try {
            let snackid = enqueueSnackbar("Loading all submissions...", { variant: "info" });
            let response = await axios.get(`${API_URL}/api/answer/getallanswers/${assignmentId}`);
            if (response.data.success) {
                closeSnackbar(snackid);
                localStorage.setItem("allsubmissions", JSON.stringify(response.data.data));
                setallsubmissions(response.data.data);
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
            console.log(error);
        }
    };

    const handelSubmission = async (info, status) => {
        try {
            await axios.post(`${API_URL}/api/answer/postapprovalassignment/${info?.assignmentID}`, {
                userid: info?.userID._id,
                status: status
            }, { withCredentials: true });

            // Remove the submission from localStorage
            let updatedSubmissions = allsubmissions.filter(sub => sub.userID._id !== info.userID._id);
            localStorage.setItem("allsubmissions", JSON.stringify(updatedSubmissions));
            setallsubmissions(updatedSubmissions);

            enqueueSnackbar(`Assignment ${status}`, { variant: status === "approved" ? "success" : "error" });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        LoadAssignmentByID();
        let savedSubmissions = JSON.parse(localStorage.getItem("allsubmissions"));
        if (savedSubmissions) {
            setallsubmissions(savedSubmissions);
        } else {
            loadAssignmentAnswers();
        }
    }, []);

    return (
        <div className='w-screen px-3'>
            <div className='bg-gradient-to-r to-green-900 from-gray-800 z-20 p-6 mt-2 rounded-2xl'>
                <div className='text-xl text-green-400 font-semibold'>
                    <i className="ri-git-merge-fill"></i> Assignment Submissions!
                </div>
                <div className="text-3xl text-white font-bold mt-4">
                    {assignmentInfo.question || <div className="w-[60%] h-10 bg-gray-400 animate-pulse rounded"></div>}
                </div>
                <div className="text-xl text-gray-400 mt-2">
                    {assignmentInfo.description || <div className="w-[80%] h-6 bg-gray-500 animate-pulse rounded"></div>}
                </div>
            </div>

            <div className='w-full h-1 mt-10 mb-10 bg-gray-400 rounded-xl relative flex items-center justify-center'>
                <span className='text-white bg-green-400 py-1 px-4 rounded-2xl'>Submissions</span>
            </div>

            <div className='flex flex-col items-center justify-center min-h-screen'>
                {allsubmissions.length === 0 ? (
                    <div className='h-[80%] w-[80%] opacity-85 flex items-center justify-center flex-col'>
                        <img src={ARROWSVG} className='h-[100px]' />
                        <div className='text-2xl text-gray-300 mb-4'>No assignments submitted yet...</div>
                        <span className='text-gray-400 text-sm text-center'>
                            "Code, create, conquer. Every bug is a lesson, every line is progress. Keep going!" 🚀💻
                        </span>
                    </div>
                ) : (
                    allsubmissions.map((submission_info, index) => (
                        <div className='min-h-[300px] overflow-hidden w-[90%] bg-gray-700 p-3 rounded-xl my-5' key={index}>
                            <div className='flex text-gray-300 gap-4 items-center'>
                                <div className='h-[50px] w-[50px] bg-gray-900 mt-3 rounded-full overflow-hidden'>
                                    <img src={submission_info?.userID?.profilePic} />
                                </div>
                                <div>
                                    <span className='text-[16px] line-clamp-1'>{submission_info?.userID?.name}</span>
                                    <span className='text-[16px] line-clamp-1'>{submission_info?.userID?.email}</span>
                                    <span className='text-[16px] line-clamp-1'>{submission_info?.userID?.mobile}</span>
                                </div>
                            </div>

                            <div className='mt-4 flex gap-3 flex-wrap'>
                                <div className='h-[200px] w-[350px] bg-red-50 overflow-hidden rounded-md'>
                                    <img src={submission_info?.answer_pic} className='h-full w-full object-fill' />
                                </div>
                                <div className='text-gray-300 flex flex-col gap-2'>
                                    <h5 className='text-white text-xl'>Related Information:</h5>
                                    <div className='flex items-center text-xl'>
                                        <i className="ri-github-fill mt-1"></i> GitHub URL:
                                        <a target='_blank' href={submission_info?.github_URL} className='text-green-400 ml-3 line-clamp-1'>{submission_info?.github_URL}</a>
                                    </div>
                                    <div className='flex items-center text-xl'>
                                        <i className="ri-link mt-1"></i> Host URL:
                                        <a target='_blank' href={submission_info?.host_URL} className='text-green-400 ml-3 line-clamp-1'>{submission_info?.host_URL}</a>
                                    </div>
                                </div>
                            </div>

                            <div className='text-white mt-4 w-[90%] sm:w-[75%]'>
                                <Appinput title='Add message for user' value={extraMsg} onChange={(e) => setExtraMsg(e.target.value)} />
                            </div>

                            <hr className='mt-5'></hr>

                            <div className='mt-5 flex items-center gap-4 flex-wrap'>
                                <button className='py-2 px-5 text-white font-medium bg-green-600' onClick={() => handelSubmission(submission_info, "approved")}>Approve</button>
                                <button className='py-2 px-5 text-white font-medium bg-red-600' onClick={() => handelSubmission(submission_info, "rejected")}>Reject</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowSubmittedUsers;
