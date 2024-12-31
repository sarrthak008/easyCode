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
                 }
           ],
            correctAns:{
                 type:String,
                 required:true
            }
         }
     ]
})