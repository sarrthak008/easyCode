import user from "../models/user.model.js"
import { responder } from "../utils/responder.js";

const getalluser = async (req,res) => {
     if(req.body.role){
        let role = await user.find({role:req.body.role})
        return responder(res, true, "all admin", role, 200)

     }
     else{
         let users = await user.find()
         return responder(res, true, "all user", users, 200)
     }
    
}

export { getalluser }   