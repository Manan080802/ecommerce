
import { userMessage } from "../messages/user.js"
import ApiError from "../util/ApiError.js"
import { jwtVerify } from "../util/token.js"
import httpStatus from "http-status"

export const authentication = async(req,res,next)=>{

 const {token}= req.cookies
 try
 {
    const userData = await jwtVerify(token)
    if(!userData.rows[0])
    {
        next(new ApiError(httpStatus.NOT_FOUND,userMessage.U09,"U09"))
    }
    delete userData.rows[0].password
    req.user = userData.rows[0]
    next()
   
   
    
    
 }
 catch(error)
 {
    next(new Error(error.message));
 }
    
}