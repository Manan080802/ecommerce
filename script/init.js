
import pg from 'pg';
import dotenv from "dotenv";
const {Client} = pg


dotenv.config();

const defaultConfig = {
  user: process.env.DB_CONN_USER,
  host:  process.env.DB_CONN_HOST,
  database: process.env.DB_CONN_NAME,
  password: process.env.DB_CONN_PASS,
  port: Number(process.env.DB_PORT),
};

const createDatabase = async (databaseName) => {
  const client = new Client(defaultConfig);
  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database ${databaseName} created successfully.`);
    } else {
      console.log(`Database ${databaseName} already exists.`);
    }
  } catch (error) {
    console.error('Error creating database:', error.message);
  } finally {
    await client.end();
  }
};

const createUserAndGrantPermissions = async (databaseName, username, password) => {
  const client = new Client(defaultConfig);
  try {
    await client.connect();

    // Create the user if it doesn't exist
    await client.query(`CREATE USER ${username} WITH PASSWORD '${password}';`);
    console.log(`User ${username} created successfully.`);

    // Grant all privileges on the database to the user
    await client.query(`GRANT ALL PRIVILEGES ON DATABASE ${databaseName} TO ${username};`);
    console.log(`Granted all privileges to ${username} on ${databaseName}`);
  } catch (error) {
    console.error('Error creating user or granting permissions:', error.message);
  } finally {
    await client.end();
  }

  // Connect to the new database to grant schema-level permissions
  const schemaClient = new Client({
    user: process.env.DB_CONN_USER,
    host:  process.env.DB_CONN_HOST,
    database: databaseName,
    password: process.env.DB_CONN_PASS,
    port: Number(process.env.DB_PORT),

  });
  
  try {
    await schemaClient.connect();
    // Grant usage and create privileges on the public schema to the user
    await schemaClient.query(`GRANT USAGE, CREATE ON SCHEMA public TO ${username};`);
    console.log(`Granted USAGE and CREATE privileges on the public schema to ${username}`);
  } catch (error) {
    console.error('Error granting schema permissions:', error.message);
  } finally {
    await schemaClient.end();
  }
};



const main = async () => {
  const databaseName = process.env.DB_NAME;
  const newUser = process.env.DB_USER;
  const newPassword = process.env.DB_PASS;
  await createDatabase(databaseName);
  await createUserAndGrantPermissions(databaseName, newUser, newPassword);

};

main();
