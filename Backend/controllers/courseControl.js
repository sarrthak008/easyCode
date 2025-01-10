//
import { responder } from "../utils/responder.js"
import course from "../models/course.model.js"
import user from "../models/user.model.js"




const getcourses = async (req, res) => {
    try {
        const allcource = await course.find()
        if (!allcource) {
            return responder(res, false, "No course found", 404)
        }
        responder(res, true, "All courses", allcource, 200)
    }
    catch (error) {
        responder(res, false, `${error.message}`, 500)
    }

}

const postcourse = async (req, res) => {
    const { name, startingDate, instructor, prise,image,originalprise,discount } = req.body
    
    try {
        if (!name || !startingDate || !instructor || !prise || !image || !originalprise || !discount) {
            return responder(res, false, "All fields are required", 400);
        }
        const newcouse = new course({
            name,
            startingDate,
            instructor,
            prise,
            image,
            originalprise,
            discount
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

const getmycourse = async (req, res) => {
    const userId = req.user._id
    
    try {
        if (!userId) {
            return responder(res, false, "User not found", 404)
        }
        const mycoures =  await user.findById(userId).populate('courses -prise -originalprise -discount -instructor -students')   
        return responder(res, true, "My courses", mycoures, 200)
    }
    catch (error) {
        return responder(res, false, `${error.message}`, 500)

    }
}


const getcoursesStudent = async (req, res) => {
    const courseId = req.body.courseId
    try {
        if (!courseId) {
            return responder(res, false, "Course not found",null, 404)
        }
        const courseStudent = await course.find({ _id: courseId }).populate('students', '-password -courses -validateUser -createdAt -updatedAt -__v').select('students')

        //console.log (courseStudent)

        if (!courseStudent) {
            return responder(res, false, "No student found",null, 404)
        }
        return responder(res, true, "Course students", courseStudent, 200)


    }
    catch (error) {
        return responder(res, false, `${error.message}`,null, 500)
    }

}

const putcourse = async (req, res) => {
   try{
    const courseId = req.body.courseId
    if (!courseId) {
        return responder(res, false, "Course not found",null, 404)
    }
    const courseUpdate = await course.findByIdAndUpdate(courseId, req.body, { new: true })
    return responder(res, true, "Course updated", courseUpdate, 200)
   }
    catch (error) {
        return responder(res, false, `${error.message}`, 500)
    }
}

const postSyallbus = async (req, res) => {
 try{
    const {courseId} = req.body
    const findedcourse = await course.findById(courseId)
     if(!findedcourse){
          return responder(res,false,"Course not found",null,404)
     }   
     const {title,description} = req.body
     const newSyllabus = {
         title,
         description
     }
     findedcourse.Syllabus.push(newSyllabus)
     await findedcourse.save()
     return responder(res,true,"Syllabus added",findedcourse,200)
  

 }
    catch (error) {
        return responder(res, false, `${error.message}`, 500)
    }
    
    

   
}
export { getcourses, postcourse, getmycourse, getcoursesStudent, putcourse, postSyallbus }