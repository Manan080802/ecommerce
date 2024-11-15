import { addUser, checkEmail } from "../model/user.js";
import { catchAsync } from "../util/catchAsync.js";
import httpStatus from "http-status"
import Utils from"../util/response.js"
import {userMessage} from "../messages/user.js"
import ApiError from "../util/ApiError.js";
import passwordFunction from "../util/password.js";
import { createToken } from "../util/token.js";

export const signUp = catchAsync(async(req,res)=>{
    const {password,email} = req.body

    const isEmail = await checkEmail(email)
    if(isEmail.rows[0])
    {
       throw new ApiError(httpStatus.CONFLICT,userMessage.U02,"U02")
    }
    
    const hashPassword =await passwordFunction.passwordEncryption(password)
    req.body.password = hashPassword
    const result = await addUser(req)
    if(result.rows[0])
    {
        const token = await createToken(result.rows[0].id)
        delete result.rows[0].password
        return res.status(httpStatus.OK).cookie("token",token).send(Utils.success(result.rows[0],userMessage.U01,"U01"))
    }
    
    throw new ApiError(httpStatus.NOT_FOUND,userMessage.U03,"U03")
})
export const login = catchAsync(async(req,res)=>{
    const {password,email} = req.body
    const isEmail = await checkEmail(email)
    if(!isEmail.rows[0])
    {
        throw new ApiError(httpStatus.NOT_FOUND,userMessage.U06,"U06")
    }
    const passwordCheck = await passwordFunction.passwordDecryption(password,isEmail.rows[0].password)
    if(!passwordCheck)
    {
        throw new ApiError(httpStatus.NOT_FOUND,userMessage.U07,"U07")
    }

    const token = await createToken(isEmail.rows[0].id)
    delete isEmail.rows[0].password
    return res.status(httpStatus.OK).cookie("token",token).send(Utils.success(isEmail.rows[0],userMessage.U08,"U08"))

})

export const logout = catchAsync(async(req,res)=>{
    const {token}= req.cookies
    if(token)
    {
        return res.status(httpStatus.OK).cookie("token", null, { expires: new Date(Date.now()) }).send(Utils.success("",userMessage.U04,"U04"))
    }
    throw new ApiError(httpStatus.NOT_FOUND,userMessage.U05,"U05")

})