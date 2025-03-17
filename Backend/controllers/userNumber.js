import user from "../models/user.model.js";
import { responder } from "../utils/responder.js";

const  saveUserMobile = async (req, res) => {
       try {
           const {id,mobile} = req.body
            if(!id || !mobile){
               return  responder(res,false,"required mobile number and id",null,400);
            }
          
            const findedUser = await user.findById(id);
            if(!findedUser){
                 return responder(res,false,'user not find check a id ',null,404);
            }{
                findedUser.mobile = mobile;
                await findedUser.save()
                return responder(res,true,'link mobile succesfully',null,200 )
            }
       } catch (error) {
          return responder(res,false,error.message,null,500)
       }
};




export  {saveUserMobile};