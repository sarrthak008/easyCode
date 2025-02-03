import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_SERVER_URI
import axios from "axios"


const store = createContext()

const Storeprovider = ({ children }) => {


    //
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()


    //get current user..

    const currentUser = () => {
        const token = Cookies.get('token');
        if (!token) {
            return null
        }
        return jwtDecode(token)
    }

    //logout
    const logOut = () => {
        Cookies.remove('token')
        window.location.href = "/"
    }

    //autonavigate on basis role

    const autoNavigate = () => {
        if (currentUser()?.role == 'admin') {
            navigate('/homesetting')
        }
        if (currentUser()?.role == "user") {
            navigate('/dashboard')
        }
    }

    const [isLoggedIn, setIsLoggedin] = useState(false)

    const [openquiz, setOpenquiz] = useState()


    //notifications variable and functions 
    const [numberOFNotification, setNumberOfNotification] = useState(0)
    const  loadNotificationNumber = async () => {
        try {
           const response =  await axios.get(`${API_URL}/api/notification/getnotificatons`,{withCredentials:true});
           setNumberOfNotification(response.data.data.length)
        } catch (error) {
           console.log(error)
        }
    }
   
    // setInterval(() => {
    //      loadNotification()
    // },600000);

    const notify = async (message) => {
         const name = currentUser()?.name || "user"
         try {
            const response = await axios.post(`${API_URL}/api/notification/createnotification`,{
                name,
                message:`${name} ${message}`
          },{withCredentials:true})

          loadNotificationNumber()
        
         } catch (error) {
            console.log(error)
         }
    }


    return (
        <store.Provider value={{
            currentUser,
            setIsLoggedin,
            isLoggedIn,
            logOut,
            autoNavigate,
            openquiz,
            setOpenquiz,
            numberOFNotification,
            setNumberOfNotification,
            loadNotificationNumber,
            notify
        }}>
            {children}
        </store.Provider>
    )
}

const useStore = () => {
    return useContext(store)
}

export { useStore, Storeprovider }