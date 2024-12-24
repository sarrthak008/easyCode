import { Schema,model } from "mongoose";

const requestSchema =  new Schema({
    user:{
        type:Schema.Type.ObjectId,
        ref:'user',
        required:true
    },

    requestedCourse:{
         type:Schema.Type.ObjectId,
         ref:'course',
         required:true
    },
    status:{
        type:String,
        enum:['pending','accepted'],
        default:"pending"
    }

},{timestamps:true})

const request = model('request',requestSchema);
export default request