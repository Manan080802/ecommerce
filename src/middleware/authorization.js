import ApiError from "../util/ApiError.js"
import httpStatus from "http-status"

export const authorization = (req,res,next)=>{
    if(req.user.role=="admin")
    {
        next(new ApiError(httpStatus.UNAUTHORIZED,"not permission","A01"))
    }
    next()
}