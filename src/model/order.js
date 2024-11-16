import pool from "../config/db.js";


export const createOrder =(user_id,total_amount)=>{
    return pool.query('INSERT INTO Orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
      [user_id, total_amount])
}

export const orderDetail = (item,order_id)=>{
    return pool.query('INSERT INTO Order_Items (order_id, product_id, quantity, item_value) VALUES ($1, $2, $3, $4)',
        [order_id, item.product_id, item.quantity, item.price])
}

export const updateStoke =(item_quantity,product_id)=>{
    return pool.query('UPDATE Products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item_quantity, product_id])
}