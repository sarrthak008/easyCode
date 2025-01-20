import { Schema ,model } from "mongoose";

const quizSchema = new Schema({ 
     name:{
         type:String,
         required:true
     },
     allquestions:[
         {
           question:{
               type:String,
               required:true
           },
           options:[
                 {
                    type:String,
                    required:true,
                    _id :false
                 }
           ],
            correctAns:{
                 type:String,
                 required:true
            }
         }
     ],
     isLock :{
        type:Boolean,
        default:false
     }
});

const Quiz = model("Quiz", quizSchema);

export default Quiz; 