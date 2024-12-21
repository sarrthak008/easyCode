import { Schema, model } from "mongoose";

const userSchma = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    role:{
        type:String,
        enum:['user','assitant','teacher'],
        default:'user'
    },
    validateUser:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const user  = model('user',userSchma);
export default user
