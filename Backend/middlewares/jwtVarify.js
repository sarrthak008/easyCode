import jwt from "jsonwebtoken"
import { responder } from "../utils/responder.js"
import user from "../models/user.model.js"

const verifyJwtUser = (req, res, next) => {
    try {
        //console.log(req.cookies)
        //console.log(req.headers.authorization)
        let token = req?.cookies?.token
        if (!token) {
            return responder(res, false, 'unauthrized user', null, 400)
        }
        const user = jwt.verify(token, process.env.JWT_SERECT)
        if (!user) {
            return responder(res, false, 'cant found details', null, 400)
        }
        req.user = user
        next();
    } catch (error) {
        return responder(res, `${error.message}`, null, 400)
    }
}

const verifyJWTAdmin = async (req, res, next) => {
    try {
        //console.log( req.headers)
        let token = req?.cookies?.token
        if (!token) {
            return responder(res, false, 'unauthrized user', null, 400);
        }
        const userInfo = jwt.verify(token, process.env.JWT_SERECT);
        //console.log(user)
        if (!userInfo) {
            return responder(res, false, 'unauthrized user', null, 400);
        }
        const checkRole = await user.findOne({ _id: userInfo._id });

        if (checkRole.role.toLowerCase() !== "admin") {
            return responder(res, false, 'you dont have permisson to add new course', null, 400);
        }
        req.user = userInfo
        next()

    } catch (error) {
        return responder(res, `${error.message}`, null, 400)
    }
}

// const verifyJWTAssitant = async (req,res,next) =>{
//     try {
//         let token = req?.cookies?.token
//         if (!token) {
//             return responder(res, false, 'unauthrized user', null, 400);
//         }
//         const userInfo = jwt.verify(token, process.env.JWT_SERECT);
//         //console.log(user)
//         if (!userInfo) {
//             return responder(res, false, 'unauthrized user', null, 400);
//         }
//         const checkRole = await user.findOne({ _id: userInfo._id });

//         if (checkRole.role.toLowerCase() !== "assitant") {
//             return responder(res, false, 'you are not able to perform these action', null, 400);
//         }
//         req.user = userInfo
//         next()

//     } catch (error) {
//         return responder(res, false,`${error.message}`, null, 400)
//     }
// }

export { verifyJwtUser, verifyJWTAdmin}