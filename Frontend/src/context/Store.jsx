import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


const store = createContext()

const Storeprovider = ({ children }) => {


     //
     const {enqueueSnackbar} =useSnackbar()
     const navigate = useNavigate()


    //get current user..

    const currentUser = ()=>{
     const token = Cookies.get('token');
         if(!token){
            return null
         }
     return jwtDecode(token)
    }

    //logout
    const logOut =()=>{
        Cookies.remove('token')
        window.location.href="/"
    }

    //autonavigate on basis role

    const autoNavigate =()=>{
        if(currentUser()?.role=='admin'){
          navigate('/homesetting')
         }
         if(currentUser()?.role=="user"){
           navigate('/dashboard')
         }
      }

    const [isLoggedIn,setIsLoggedin] = useState(false)

    const [openquiz,setOpenquiz] = useState()

    return (
        <store.Provider value={{currentUser,setIsLoggedin,isLoggedIn,logOut,autoNavigate,openquiz,setOpenquiz}}>
            {children}
        </store.Provider>
    )
}

const useStore = () => {
    return useContext(store)
}

export { useStore, Storeprovider }