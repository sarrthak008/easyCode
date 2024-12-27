import React, { useEffect, useState } from 'react'
import Steper from './Steper'
import { closeSnackbar, useSnackbar } from 'notistack'
import Shadow from './Shadow'
import Appinput from './Appinput'
import Appbtn from './Appbtn'
const API_URL = import.meta.env.VITE_SERVER_URI
import axios from 'axios'

const Signup = () => {

  const { enqueueSnackbar } = useSnackbar()
  const [processnumber, setProccessNumber] = useState(0)
  const [passtype, setPassType] = useState('password')
  const handleClick = () => { enqueueSnackbar('I love snacks.', { variant: 'success' }) }
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    comfPass: "",
    otp: ""
  })


  const handelbsicInfoValidation = () => {
    if (userInfo.name.length == 0 || userInfo.email.length == 0 || userInfo.mobile.length == 0) {
      enqueueSnackbar('please fill all filds', { variant: 'error' })
      return false
    }
    if (userInfo.mobile.length !== 10) {
      enqueueSnackbar('please enter valid mobile number', { variant: 'error' })
      return false
    }
    if (userInfo.email.indexOf('@gmail.com') == -1) {
      enqueueSnackbar('please enter valid email', { variant: 'error' })
      return false
    }
    setProccessNumber(1)
  }

  const hadelpassValidation = async () => {
    if (userInfo.password.length < 8) {
      enqueueSnackbar('password must be contains 8 characters', { variant: 'error' })
      return false
    }
    if (userInfo.password !== userInfo.comfPass) {
      enqueueSnackbar('password and confirm password must be same', { variant: 'error' })
      return false
    }
    try {
      let id = enqueueSnackbar("requesting OTP", { variant: "info" })
      const responce = await axios.post(`${API_URL}/api/auth/signup`, {
        name: userInfo.name,
        mobile: userInfo.mobile,
        email: userInfo.email,
        password: userInfo.password
      })

      if (responce.data.success) {

        enqueueSnackbar(responce.data.message, { variant: 'success' })
        closeSnackbar(id)
        setProccessNumber(2)
      } else {
        enqueueSnackbar(responce.data.message, { variant: 'error' })
        closeSnackbar(id)
        setProccessNumber(0)
      }

    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const handelOtpVerification = async () => {
    try {
      let id = enqueueSnackbar("verifying OTP", { variant: "info" })
      const responce = await axios.post(`${API_URL}/api/auth/verify`, {
        email: userInfo.email,
        myotp: userInfo.otp
      })

      if (responce.data.success) {

        enqueueSnackbar(responce.data.message, { variant: 'success' })
        closeSnackbar(id)
        setProccessNumber(3)
      } else {
        enqueueSnackbar(responce.data.message, { variant: 'error' })
        closeSnackbar(id)
        setProccessNumber(1)
      }

    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }


  return (
    <div className='mt-12 w-[80%] '>
      <h1 className='font-bold text-3xl text-white opacity-75'>Sign In</h1>
      <div className='flex flex-col mt-4 h-full w-full items-center justify-center text-white'>
        <Steper pnum={processnumber} />
        <div className='h-96 w-full bg-gray-900 rounded-lg mt-4'>

          {processnumber == 0 ?
            <div className='sm:w-[60%]  w-full px-1 m-auto h-full flex flex-col justify-center gap-10'>
              <Appinput
                type="text"
                title="Enter your name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
              <Appinput
                type={"email"}
                title='enter your email'
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })}
              />
              <Appinput type={"number"} title='enter your mobile number'
                value={userInfo.mobile}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, mobile: e.target.value })}
              />
              <Appbtn title='next' onClick={handelbsicInfoValidation} />
            </div>
            : null}

          {processnumber == 1 ?
            <div className='sm:w-[60%]  w-full px-1 m-auto h-full flex flex-col justify-center gap-10'>
              <Appinput type={passtype}
                title='set your password'
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })}
              />
              <Appinput type={passtype}
                title='confirm your password'
                value={userInfo.comfPass}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, comfPass: e.target.value })}
              />

              <div className='flex  items-center gap-2'>

                <input
                  type='checkbox'
                  className='text-green-40 float-left w-4 checked:text-green-400'
                  onChange={(e) => {
                    e.target.checked ? setPassType("text") : setPassType("password")
                  }}
                />

                <span className='block text-white opacity-75' >show password</span>
              </div>

              <Appbtn title='request otp' onClick={hadelpassValidation} />
            </div> : null
          }

          {
            processnumber == 2 ?
              <div className='sm:w-[60%]  w-full px-1 m-auto h-full flex flex-col justify-center gap-10'>
                <Appinput type={"number"} title='enter your otp'
                  value={userInfo.otp}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, otp: e.target.value })} />
                <Appbtn title='verify otp' onClick={handelOtpVerification} />
              </div> : null

          }

        </div>

      </div>
      <Shadow />
    </div>
  )
}

export default Signup