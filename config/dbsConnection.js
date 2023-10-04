import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

// Replace these values with your database information
const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,     
  password: DB_PASSWORD,     
});

export default sequelize;
