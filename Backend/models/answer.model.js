import {Schema,model} from "mongoose";

const answerSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    assignmentID:{
        type:Schema.Types.ObjectId,
        ref:'assignment'
    },
    github_URL:{
        type:String,
    },
    answer_pc:{
       type:String,
       reuired:true
    },
    host_URL:{
        type:String
    }
})

