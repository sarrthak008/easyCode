import { responder } from "../utils/responder.js"
import course from "../models/course.model.js"
import request from "../models/requests.model.js"
import user from "../models/user.model.js"

const postrequest = async (req, res) => {
    let user = req.user
    let { courseid } = req.params
    try {
        if (!user || !courseid) {
            return responder(res, false, 'something went wrong', null, 400);
        }
        let joiningcourse = await course.findById(courseid)
        if (!joiningcourse) {
            return responder(res, false, "cant find course", null, 400)
        }

        let newrequest = new request({
            user: user._id,
            requestedCourse: joiningcourse._id
        })

        if (!newrequest) {
            return responder(res, false, "request fail", null, 400)
        }

        newrequest = await newrequest.save()
        return responder(res, true, 'request send sueccfully ,our team contact you', newrequest, 201)

    } catch (error) {
        return responder(res, false, `${error.message}`, null, 400);
    }




}

const acceptrequest = async (req,res)=>{
    let {requestedCourse ,userId} = req.body 
    let elem = ["requestedCourse","userId"]
    for (const element of elem) {
         if(!req.body[element]){
            return responder(res,false,`${element} is required`,null,400);
         }
    }
}


const rejectrequest = async (req,res)=>{
    let {requestedCourse ,userId} = req.body 
    let elem = ["requestedCourse","userId"]
    for (const element of elem) {
         if(!req.body[element]){
            return responder(res,false,`${element} is required`,null,400);
         }
    }
}


export { postrequest ,acceptrequest ,rejectrequest}