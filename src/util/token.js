import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({})

export const createToken = (id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET, { expiresIn: '12h' })

}