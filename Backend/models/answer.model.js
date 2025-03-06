import {Schema,model} from "mongoose";


const answerSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    courseID:{
        type:Schema.Types.ObjectId,
        ref:"course"
    },
    assignmentID:{
        type:Schema.Types.ObjectId,
        ref:'assignment'
    },
    github_URL:{
        type:String,
    },
    answer_pic:{
       type:String,
       reuired:true
    },
    host_URL:{
        type:String
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","approved","rejected","submitted"]
    },
    message:{
        type:String
    }
})

const answer = model("answers",answerSchema);
export default answer;