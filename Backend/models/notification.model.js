import {Schema,model} from "mongoose";

const notificationSchema = new Schema({
    name :{
      type:String,
    },
     message:{
        type:String,
        required:true
     },
     deleteAt:{
            type:Date,
            default:Date.now() + 7*24*60*60*1000
     }
},{timestamps:true});

const notification = model('notification',notificationSchema);  
export default notification;