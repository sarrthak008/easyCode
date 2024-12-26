import React, { useEffect, useState } from 'react'
import Steper from './Steper'
import { useSnackbar } from 'notistack'
import Shadow from './Shadow'
import Appinput from './Appinput'
import Appbtn from './Appbtn'
import { Password } from '@mui/icons-material'

const Signup = () => {

  const { enqueueSnackbar } = useSnackbar()
  const [processnumber, setProccessNumber] = useState(0)
  const handleClick = () => { enqueueSnackbar('I love snacks.', { variant: 'warning' }) }
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    comfPass: "",
    otp: ""
  })

  console.log(userInfo)

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
              <Appbtn title='next' onClick={handleClick} />
            </div>
            : null}

          {processnumber == 1 ?
            <div className='sm:w-[60%]  w-full px-1 m-auto h-full flex flex-col justify-center gap-10'>
              <Appinput type={"text"} />
              <Appinput type={"text"} />
              <Appbtn title='next' onClick={handleClick} />
            </div> : null
          }

        </div>

      </div>
      <Shadow />
    </div>
  )
}

export default Signup