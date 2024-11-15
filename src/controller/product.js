import { productMessage } from "../messages/product.js";
import { userMessage } from "../messages/user.js";
import { addProducts, checkProduct } from "../model/product.js";
import ApiError from "../util/ApiError.js";
import { catchAsync } from "../util/catchAsync.js";
import httpStatus from "http-status"
import Utils from"../util/response.js"


export const addProduct= catchAsync(async(req,res)=>{
    if(req.user.role!=="admin")
    {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE,userMessage.U10,"U10")
    }
      const {name} = req.body
    const productExist = await checkProduct(name)
    if(productExist.rows[0])
    {
     throw new ApiError(httpStatus.NOT_ACCEPTABLE,productMessage.P01,"P01")   
    }
    const result = await addProducts(req)
    if(result.rows[0])
    {
        return res.status(httpStatus.OK).send(Utils.success(result.rows[0],productMessage.P02,"P02"))
    }
  
})