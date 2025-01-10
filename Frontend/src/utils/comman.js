import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

const currentUser =  () =>{
 const token = Cookies.get('token');
     if(!token){
        return null
     }
 return jwtDecode(token)
}

export {currentUser}