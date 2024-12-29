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
            userId: user._id,
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


// going wokr to forndend update these route there is error

const acceptrequest = async (req, res) => {
    let { requestedCourse, userId } = req.body
    if (!rejectrequest || !userId) {
        return responder(res, false, 'something went wrong', null, 400);
    }

    try {

        let reqcourse = await course.findById(requestedCourse)
        if (!reqcourse) {
            return responder(res, false, "course not found", null, 400)
        }

        let requestedUser = await user.findById(userId)
        if (!requestedUser) {
            return responder(res, false, "user not found for these id", null, 400)
        }

        reqcourse.students.push(requestedUser._id);
        requestedUser.courses.push(reqcourse._id);
        await reqcourse.save();
        await requestedUser.save()
        return responder(res, true, "user add in course sucessfully", null, 200);

    } catch (error) {
        return responder(res, false, error.message, responece, 400);
    }
}


const rejectrequest = async (req, res) => {
    let { requestedCourse, userId } = req.body
    let elem = ["requestedCourse", "userId"]
    for (const element of elem) {
        if (!req.body[element]) {
            return responder(res, false, `${element} is required`, null, 400);
        }
    }

    try {
        let responece = await request.deleteOne({ $and: [{ userId: userId }, { requestedCourse: requestedCourse }] })
        if (responece.acknowledged) {
            return responder(res, true, "request delete sucessfully", responece, 200)
        } else {
            return responder(res, false, "something went wrong", responece, 200);
        }
    } catch (error) {
        return responder(res, false, error.message, responece, 400);
    }

}


export { postrequest, acceptrequest, rejectrequest }