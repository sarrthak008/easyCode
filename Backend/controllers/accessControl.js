import user from "../models/user.model.js"
import { responder } from "../utils/responder.js"

const getBanUnUser = async(req,res) =>{
    const {userId} = req.params
     try {
        if(!userId) return responder(res,false,"user id is requires..",null,401);
        const findedUser = await user.findById(userId);
        if(!findedUser){
            return responder(res,false,"user not founde",null,)
        } 
        findedUser.isBan = findedUser.isBan ? false : true; 
        let banSucees =  await findedUser.save() ; 
        if(banSucees){
           return responder(res,true,`user ${findedUser.isBan ? "banned" : "unbanned"} sucessfully`,null,200);
        }else{
           return responder(res,false,"something went wrong",null,500);
        }
     } catch (error) {
        return responder(res,false,error.message,null,500);
     }
} 


export {getBanUnUser}