import { Schema, model } from "mongoose";

const couserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
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
            description:String,
        }
    ]

},{timestamps:true})

const course = model('course',couserSchema);
export default course;