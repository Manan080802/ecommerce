import  bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config({})


const passwordEncryption =async (password)=>{
    const round = Number(process.env.ROUND)
    const encryption = bcrypt.hash(password,round)
    return encryption

}
export default 
{
    passwordEncryption
}