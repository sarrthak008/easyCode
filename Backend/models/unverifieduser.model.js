import { Schema, model } from "mongoose";

const unverifiedUserSchma = new Schema({
  
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
        trim: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        trim: true,
        required: true
    }
    
},{timestamps:true});

const unverifiedUser  = model('unverifiedUser',unverifiedUserSchma);
export default unverifiedUser
