import pool from "../config/db.js";

export const checkEmail = (email)=>{
    return pool.query('SELECT * FROM Users WHERE email = $1', [email])

} 

export const addUser = (req)=>{
    const { firstName, lastName, gender, email, password, phoneNumber } = req.body;
   return  pool.query(
        'INSERT INTO Users (firstName, lastName, gender,email,password,phoneNumber,created_at) VALUES ($1, $2, $3,$4,$5,$6, NOW()) RETURNING *',
        [firstName, lastName, gender, email, password, phoneNumber]
      );
}