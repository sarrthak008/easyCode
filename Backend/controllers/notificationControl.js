import notification from "../models/notification.model.js";
import {responder} from "../utils/responder.js";

const addNotification = async (req, res) => {
      const {name , message} = req.body;    
      if(!message){
         return responder(res,false,"Message is required",null,400);
      }
       try {
           const newNotification = new notification({name,message});
           await newNotification.save();
          return responder(res,true,"Notification added successfully",newNotification,201);
       } catch (error) {
        return responder(res,false,error.message,null,500);
    }  
}

const getNotification = async (req, res) => {
    try {
        const notifications = await notification.find();
        return responder(res,true,"All Notifications",notifications,200);
    } catch (error) {
        return responder(res,false,error.message,null,500);
    }
}

const deleteNotification = async (req, res) => { 
    try {
        const result = await notification.deleteMany({ deleteAt: { $lt: new Date() } });

        if (result.deletedCount === 0) {
            return responder(res, false, "No extra notifications", null, 404);
        }

        return responder(res, true, `${result.deletedCount} Notifications deleted successfully`, null, 200);

    } catch (error) {
        return responder(res, false, error.message, null, 500);
    }
};



export {addNotification,getNotification,deleteNotification}