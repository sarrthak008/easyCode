import mongoose, {Schema , model} from "mongoose";

const feedbackSchema = new Schema({
     userId : {
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
     },
      description:{
        type:String,
        required:true
     }
     
},{timestamps:true})

const feedback = model('feedback',feedbackSchema);
export default feedback
