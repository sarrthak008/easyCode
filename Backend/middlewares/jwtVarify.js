import jwt from "jsonwebtoken"
import { responder } from "../utils/responder.js"
import user from "../models/user.model.js"

const verifyJwt = (req, res, next) => {
    try {
        let token = req?.cookies?.token
        if (!token) {
            return responder(res, false, 'unauthrized user', null, 400)
        }
        
        const user = jwt.verify(token, process.env.JWT_SERECT)
        if (!user) {
            return responder(res, false, 'cant found details', null, 400)
        }
        next()
        req.user = user
    } catch (error) {
        return responder(res, `${error.message}`, null, 400)
    }
}

export { verifyJwt }