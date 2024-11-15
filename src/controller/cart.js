import { productMessage } from "../messages/product.js";
import { checkProductId } from "../model/product.js";
import ApiError from "../util/ApiError.js";
import { catchAsync } from "../util/catchAsync.js";

import httpStatus from "http-status"
import { checkQuantity } from "../util/quantity.js";
import { addToCartData, checkCartData } from "../model/cart.js";
import { cartMessage } from "../messages/cart.js";
import Utils from"../util/response.js"


export const addToCart = catchAsync(async(req,res)=>{
    const {product_id,quantity} = req.body
    const checkProductIdData = await checkProductId(product_id)
    if(!checkProductIdData.rows[0])
    {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE,productMessage.P03,"P03")
    }
    const product = checkProductIdData.rows[0]
    const isQuantity = await checkQuantity(product,quantity)
    if(!isQuantity)
    {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE,productMessage.P04,"P04")
    }
    req.body.user_id = req.user.id
    const checkData = await checkCartData(req)
    if(checkData.rows[0])
    {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE,cartMessage.C01,"C01")
    }
    const result = await addToCartData(req)
   
    return res.status(httpStatus.OK).send(Utils.success({},cartMessage.C02,"C02"))

    
 
})