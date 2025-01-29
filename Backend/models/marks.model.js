import mongoose ,{Schema ,model }from "mongoose";

const marksSchema = new Schema({    
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Marks = model("Marks", marksSchema);
export default Marks;

