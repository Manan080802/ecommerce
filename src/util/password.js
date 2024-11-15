import  bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config({})


const passwordEncryption =async (password)=>{
    const round = Number(process.env.ROUND)
    const encryption = bcrypt.hash(password,round)
    return encryption

}

const passwordDecryption  = async(password,userPassword)=>{
    return bcrypt.compare(password,userPassword)
}
export default 
{
    passwordEncryption,
    passwordDecryption
}