import pool from "../config/db.js";

export const addToCartData = (req)=>{
    const {product_id,quantity,user_id} = req.body
    return  pool.query(
        'INSERT INTO Cart (product_Id, quantity, user_Id) VALUES ($1, $2, $3)',
        [product_id,
            quantity,
           user_id
        ]
      );
    
}

export const checkCartData = (req)=>{
    const {user_id,product_id} =req.body
    return pool.query('SELECT * FROM Cart WHERE user_id = $1 AND product_id= $2', [user_id,product_id])
}
