import { responder } from "../utils/responder.js"
import feedback from "../models/feedbac.model.js"

const postFeedback = async (req,res) => {
     const {description} = req.body

     const {_id} = req.user
     if( !req.user){
         return  responder(res,false,'unauthrized user',null,400)
     } 

     if(!description){
        return responder(res,false,'please provide feedback',)
     }

    // delete feedback if previously feedback is given...
    
    const getPreviousFeedback = await feedback.findOne({userId:_id});
         if(getPreviousFeedback){
            await feedback.deleteOne({userId:_id});
         }
      
      try {
         const  newfeedback = new feedback({
            userId:_id,
            description:description
         })
         let returnfeedback = await newfeedback.save()
        responder(res,true,'thank you for your valueable feedback',returnfeedback,200)

      } catch (error) {
         return responder(res,false,`${error.message}`,null,400)
      }     
}

const getMyfeedBack =  async (req,res) => {
    
    const {_id} = req.user
    if( !req.user){
        return  responder(res,false,'unauthrized user',null,400)
    } 

    try {
         
        let myFeedback = await feedback.findOne({userId:_id})
        if(myFeedback){
            return responder(res,true,'fetch feedback sucessfully',myFeedback,200);
        }else{
            return responder(res,true,'load empty feedback','',200);
        }

    } catch (error) {
        return responder(res,false,`${error.message}`,null,400)
    }
}

const loadFeedbacks = async (req,res)=>{
    const {max} = req.query
      try {
        
         const feedBacks = await feedback.find().populate('userId','-password -_id -courses -createdAt -updatedAt -__v').select('-_id -createdAt -updatedAt');
            if(feedback.length < parseInt(max)){
                responder(res,true,'fetch feedbacks',feedBacks,200)
            }else{
                const lenFeedback =[];
                  for (let i = 0; i < parseInt(max); i++) {
                     lenFeedback.push(feedBacks[i]);
                  }
              responder(res,true,'fetch feedbacks',lenFeedback,200)
            }
      } catch (error) {
        res.json({error})
      }
}


export {postFeedback, getMyfeedBack,loadFeedbacks}