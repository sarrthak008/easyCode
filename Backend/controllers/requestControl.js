import { responder } from "../utils/responder.js"
import course from "../models/course.model.js"

const postrequest = async (req, res) => {
    let user = req.user
    let { courseid } = req.params
    try {
        if (!user || !courseid) {
            return responder(res, false, 'something went wrong', null, 400);
        }
        let joiningcourse = await course.findById(courseid)
        res.json({joiningcourse})

    } catch (error) {
        return responder(res, false, `${error.message}`, null, 400);
    }




}


export { postrequest }