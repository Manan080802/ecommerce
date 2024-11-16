import { cartMessage } from "../messages/cart.js";
import { productMessage } from "../messages/product.js";
import { cartDetail, deleteCart } from "../model/cart.js";
import { createOrder, orderDetail, updateStoke } from "../model/order.js";
import ApiError from "../util/ApiError.js";
import { catchAsync } from "../util/catchAsync.js";
import { checkQuantity } from "../util/quantity.js";
import httpStatus from "http-status"
import Utils from"../util/response.js"
import { orderMessage } from "../messages/order.js";


export const placeOrder = catchAsync(async (req,res)=>{
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
    const orderResult = await createOrder(userData.id,totalAmount)
    const orderId = orderResult.rows[0].id
    for(const item of cartItems.rows)
    {
        await orderDetail(item,orderId)
        await updateStoke(item.quantity,item.product_id)
    }
    await deleteCart(userData.id)
 
   return res.status(httpStatus.OK).send(Utils.success({},orderMessage.O01,"O01"))

})