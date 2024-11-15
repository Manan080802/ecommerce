import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { checkId } from "../model/user.js";
dotenv.config({})

export const createToken = (id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET, { expiresIn: '12h' })

}

export const jwtVerify = async(token)=>{
    try
    {
        const userId = await jwt.verify(token, process.env.JWT_SECRET)  
        if (userId.id) {
         return checkId(userId.id)
        }
    }
    catch(error)
    {
        throw new Error("please login")
    }

}