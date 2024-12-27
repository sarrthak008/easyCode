import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import LOGIN from '../assets/login.svg';
import Shadow from "../components/Shadow";
import Appinput from '../components/Appinput';
import Appbtn from '../components/Appbtn';
import axios from 'axios';
import { closeSnackbar, useSnackbar } from 'notistack'
const API_URL = import.meta.env.VITE_SERVER_URI


const Login = () => {


  const { enqueueSnackbar } = useSnackbar()
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  })

  const handelLogin = async () => {
    if (userInfo.email.length == 0 || userInfo.password.length == 0) {
      enqueueSnackbar('please fill all filds', { variant: 'error' })
      return false
    }
    try {
      const responce = await axios.post(`${API_URL}/api/auth/login`, {
        email: userInfo.email,
        password: userInfo.password
      })
      if (responce.data.success) {
        enqueueSnackbar(`${responce.data.message}`, { variant: "success" })

      }
      else {
        enqueueSnackbar(`${responce.data.message}`, { variant: "error" })
      }



      console.log(responce)
    }
    catch (err) {
      enqueueSnackbar(responce.data.message, { variant: 'error' })

    }
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


        <div className="w-1/2 h-full flex justify-center items-center">
          <div className="w-96 h-[70%] rounded-lg p-8 bg-gray-900">
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
              <Appinput type="password"
                title="Enter your Password"
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}



              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="text-green-40 float-left w-4 checked:text-green-400"

                />
                <span className="block text-white opacity-75">Show password</span>
              </div>

              <span className="text-white">
                <Appbtn title="Log In"
                  onClick={handelLogin}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
  