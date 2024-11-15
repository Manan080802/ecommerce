export const checkQuantity = (product,quantity)=>{
    if(product.stock_quantity<quantity)
    {
        return false
    }
    return true
    
    
}