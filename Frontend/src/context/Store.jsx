import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import { useSnackbar } from "notistack";


const store = createContext()

const Storeprovider = ({ children }) => {


     //
     const {enqueueSnackbar} =useSnackbar()


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

    const [isLoggedIn,setIsLoggedin] = useState(false)

    return (
        <store.Provider value={{currentUser,setIsLoggedin,isLoggedIn,logOut}}>
            {children}
        </store.Provider>
    )
}

const useStore = () => {
    return useContext(store)
}

export { useStore, Storeprovider }