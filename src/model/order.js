import pool from "../config/db.js";


export const createOrder =(user_id,total_amount)=>{
    return pool.query('INSERT INTO Orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
      [user_id, total_amount])
}

export const orderDetail = (item,order_id)=>{
    return pool.query('INSERT INTO Order_Items (order_id, product_id, quantity, item_value) VALUES ($1, $2, $3, $4)',
        [order_id, item.product_id, item.quantity, item.price*item.quantity])
}

export const updateStoke =(item_quantity,product_id)=>{
    return pool.query('UPDATE Products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item_quantity, product_id])
}

export const getAllData = (user_id)=>{
    return pool.query(`
    SELECT 
      o.id AS order_id,
      o.created_at AS order_time,
      o.total_amount AS total_Amount,
      array_agg(
        json_build_object(
          'product_name', p.name,
          'quantity', oi.quantity,
          'price', oi.item_value 
        )
      ) AS products
    FROM Orders o
    JOIN Order_Items oi ON o.id = oi.order_id
    JOIN Products p ON oi.product_id = p.id
    WHERE o.user_id = $1
    GROUP BY o.id
  `, [user_id])
}