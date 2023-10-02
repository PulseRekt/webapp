import { Sequelize } from "sequelize";
// Replace these values with your database information
const sequelize = new Sequelize('cloud', 'root', 'Thenothing1!', {
  host: 'localhost', 
  port:3306,
  dialect: 'mysql', 
});

export default sequelize;
