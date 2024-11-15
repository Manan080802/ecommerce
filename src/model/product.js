import pool from "../config/db.js";

export const checkProduct = (name)=>{
    return pool.query('SELECT * FROM Products WHERE name = $1', [name])

}
export const addProducts = (req)=>{
    const {name,price,stock_quantity} =req.body
    return  pool.query(
        'INSERT INTO Products (name, price, stock_quantity,created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [name,price,stock_quantity]
      );
}

export const checkProductId = (id)=>{
    return pool.query('SELECT * FROM Products WHERE id = $1',[id])
}