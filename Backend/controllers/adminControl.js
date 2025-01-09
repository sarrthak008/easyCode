import user from '../models/user.model.js'
import { responder } from '../utils/responder.js'

const getFindAdmin = async (req,res) =>{
try{
    const Alladmin = await user.find({role:'admin'}).select("-validateUser -courses -createdAt -updatedAt -password")
    if(!Alladmin){
    return responder(res, false, "no admin", 404)
    }
   return  responder(res,true,'All Admin featch ',Alladmin,200)

}
catch (error){
    responder(res, false, `${error.message}`, 500)

}

}

export {getFindAdmin}