//
import { responder } from "../utils/responder.js"
import course from "../models/course.model.js"


const getcourses = async (req, res) => {
    res.json("hii")
}

const postcourse = async (req, res) => {
    const { name, startingDate, instructor } = req.body
    try {
        if (!name || !startingDate || !instructor) {
            return responder(res, false, "All fields are required", 400);
        }
        const newcouse = new course({
            name,
            startingDate,
            instructor
        })
        if (!newcouse) {
            return responder(res, false, "course not created", 400)
        }
        await newcouse.save()
        return responder(res, true, "course created", newcouse, 201)
    }
    catch (error) {
        return responder(res, false, `${error.messgae}`, 500)
    }
}


export { getcourses, postcourse }