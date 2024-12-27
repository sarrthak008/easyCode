import { Schema, model } from "mongoose";

const userSchma = new Schema({
  
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile:{
        type: Number,
        required: true,
        trim: true,
        maxlenght:10
    },
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
        enum:['user','assitant','owner'],
        default:'user'
    },
    validateUser:{
        type:Boolean,
        default:false
    },
    courses:[
        {
            type:Schema.Types.ObjectId,
            ref:'course'
        }
    ]
    
},{timestamps:true});

const user  = model('user',userSchma);
export default user
