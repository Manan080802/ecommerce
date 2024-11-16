import pool from "../src/config/db.js";
import constants from "../src/config/constants.js";
import password from "../src/util/password.js";

// Function to create the necessary tables in the database
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
          id SERIAL PRIMARY KEY,
          firstName VARCHAR(100) NOT NULL,
          lastName VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          phoneNumber VARCHAR(20), 
          gender VARCHAR(10) CHECK (gender IN ('${constants.MALE}', '${constants.FEMALE}', '${constants.OTHER}')), 
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT '${constants.USER}', 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS Products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL NOT NULL,
        stock_quantity INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS Orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        total_amount DECIMAL NOT NULL,
        status VARCHAR(50) DEFAULT 'done',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS Order_Items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES Orders(id),
        product_id INTEGER REFERENCES Products(id),
        quantity INTEGER NOT NULL,
        item_value DECIMAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS Cart (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        product_id INTEGER REFERENCES Products(id),
        quantity INTEGER NOT NULL
      );
    `);
    console.log('Database tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Function to insert values into the Users table
const createTableValue = async () => {
  try {
    // Ensure you have environment variables properly loaded (use dotenv or another configuration approach)
    const firstName = process.env.FIRSTNAME;
    const lastName = process.env.LASTNAME;
    const email = process.env.EMAIL;
    const role = process.env.ROLE || constants.USER; // Use default role if none is set
    const gender = process.env.GENDER || "male"; // Use a default gender if none is set
    const encryptionPassword = await password.passwordEncryption(process.env.PASSWORD);

    // Inserting the user into the Users table
    const result = await pool.query(
      'INSERT INTO Users (firstName, lastName, email, password, role, gender, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [firstName, lastName, email, encryptionPassword, role, gender]
    );
    console.log(`User inserted:`, result.rows[0]);

  } catch (error) {
    console.error('Error inserting user:', error.message);
  }
};

// Immediately Invoked Function Expression (IIFE) to execute both functions
(async function () { 
  await createTables();
  await createTableValue();
})();
