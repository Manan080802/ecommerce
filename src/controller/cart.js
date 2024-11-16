import { productMessage } from "../messages/product.js";
import { checkProductId } from "../model/product.js";
import ApiError from "../util/ApiError.js";
import { catchAsync } from "../util/catchAsync.js";

import httpStatus from "http-status"
import { checkQuantity } from "../util/quantity.js";
import { addToCartData, cartDetail, checkCartData } from "../model/cart.js";
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
    const isQuantity = await checkQuantity(product.stock_quantity,quantity)
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


export const checkOut = catchAsync(async(req,res)=>{
    const userData = req.user
    const cartItems = await cartDetail(userData.id)

    if(cartItems.rows.length == 0)
    {
        throw new ApiError(httpStatus.NOT_FOUND,cartMessage.C03,"C03")
    }

    let totalAmount = 0
    for(const item of cartItems.rows)
    {
        const result = await checkQuantity(item.stock_quantity,item.quantity)
        if(!result)
        {
            throw new ApiError(httpStatus.NOT_ACCEPTABLE,productMessage.P04,"P04")
        }
        totalAmount += item.quantity * item.price;
    }
    const result = {
        totalAmount,
        items: cartItems.rows
    }
    res.status(httpStatus.OK).send(Utils.success(result,cartMessage.C04,'C04'))
})