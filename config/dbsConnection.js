import { Sequelize } from "sequelize";

// Replace these values with your database information
const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost',
  port: 3306,
  username: 'root',     
  password: 'Thenothing1!',     
});

export default sequelize;
