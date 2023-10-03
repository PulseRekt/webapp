import { Sequelize } from "sequelize";

// Replace these values with your database information
const sequelize = new Sequelize({
  dialect: 'mysql', // Specify your database dialect (e.g., mysql, postgres, sqlite, etc.)
  host: 'localhost',
  port: 3306,
  username: 'root',     // Replace with your database username
  password: 'Thenothing1!',     // Replace with your database password
});

export default sequelize;
