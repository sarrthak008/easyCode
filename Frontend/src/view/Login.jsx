import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import LOGIN from '../assets/login.svg';
import Shadow from "../components/Shadow";
import Appinput from '../components/Appinput';
import Appbtn from '../components/Appbtn';
import axios from 'axios';
import { closeSnackbar, useSnackbar } from 'notistack'
const API_URL = import.meta.env.VITE_SERVER_URI
import Cookies from 'js-cookie';
import { useStore } from '../context/Store';
import { useNavigate } from 'react-router-dom';
import GOOGLE_ICO from "../assets/google.svg"




const Login = () => {

  const {autoNavigate} = useStore()
  const navigate = useNavigate()
  const [passtype, setPassType] = useState('password')
  const { enqueueSnackbar } = useSnackbar()
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  })

  
  useEffect(()=>{
     autoNavigate() 
  },[])

  const handelLogin = async () => {
    if (userInfo.email.length === 0 || userInfo.password.length === 0) {
      enqueueSnackbar('Please fill all fields', { variant: 'error' });
      return false;
    }

    try {
      
      let snackid = enqueueSnackbar('login...', { variant: "info" });
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: userInfo.email,
        password: userInfo.password
      }, { withCredentials: true });

      if (response.data.success) {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        //console.log(response.data); 
        Cookies.set('token', response.data.data, { expires: 7 });
        closeSnackbar(snackid)
        autoNavigate()
      } else {
        enqueueSnackbar(`${response.data.message}`, { variant: "error" });
        closeSnackbar(snackid)
      }
    } catch (err) {
      // Handle the error and display an appropriate message
      const errorMessage = err.response && err.response.data ? err.response.data.message : 'An error occurred';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      console.log(err);
    }
  };

  const handelGoogleLogin = async()=>{
      window.location.href = `${API_URL}/api/gauth/auth/google`;
  }

  return (
    <div>
      <Navbar />
      <Shadow />

      <div className="h-screen w-full flex items-center justify-center">

        <div className="w-0 sm:w-1/2 h-full">
          <img
            src={LOGIN}
            alt="login"
            className="h-full w-full object-cover"
          />
        </div>


        <div className="w-full h-full flex justify-center items-center ">
          <div className="w-[90%] min-h-[70%] sm:w-[50%] rounded-lg p-8 bg-gray-900">
            <h1 className="text-4xl font-bold text-center text-white">Login</h1>
            <p className="text-center text-gray-400 text-sm mt-2">
              Start your journey with EasyCode...
            </p>

            <div className="mt-8 flex flex-col gap-7 text-white">
              <Appinput type="email"
                title="Enter your Email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })
                } />
              <Appinput type={passtype}
                title="Enter your Password"
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="text-green-40 float-left w-4 checked:text-green-400"
                  onChange={(e) => {
                    e.target.checked ? setPassType("text") : setPassType("password")
                  }}

                />
                <span className="block text-white opacity-75">Show password</span>
              </div>

              <span className="text-white">
                <Appbtn title="Log In"
                  onClick={handelLogin}
                />
              </span>
            </div>
             
             <div className='w-full'>
                <span className='w-full h-[0.3px] bg-white block mt-7  flex items-center justify-center'> 
                     <span className='py-[1px] px-5 bg-green-400 rounded-md text-sm '>or</span>
                </span>
                <button className='h-12 w-full bg-green-800 mt-7 flex items-center justify-center gap-1 sm:gap-4 rounded-lg text-white ' onClick={handelGoogleLogin}>
                   <img src={GOOGLE_ICO} className='h-[80%] object-fill' /> 
                   Continue with google
                </button>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
