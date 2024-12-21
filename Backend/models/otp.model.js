import { Schema , model } from "mongoose";

const otpSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expireAt:{
        type:Date,
        default: () => Date.now() + 3600000 
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const  otp  = model('otp',otpSchema);
export default otp