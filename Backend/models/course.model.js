import { Schema, model } from "mongoose";

const couserSchema = new Schema({
    image:{
       type:String,
       required:true
    },
    name: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    prise:{
        type:Number,
        required:true
    },
    originalprise:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    instructor: [
      {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required:true
        }
    ],
    students:[
        {
            type:Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    Syllabus:[
        {
            title: String,
            description:String
        }
    ]

},{timestamps:true})

const course = model('course',couserSchema);
export default course;