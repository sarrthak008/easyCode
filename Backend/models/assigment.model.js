import { Schema, model } from "mongoose"

const assignmtnSchme = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "course",
        required: true
    },
    question: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    assignmetName: {
        type: String,
        required: true
    }
}) 

const assignment =  model("assignments",assignmtnSchme);
export default assignment;
