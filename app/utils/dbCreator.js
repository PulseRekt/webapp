import sequelize from "../../config/dbsConnection.js";
import { QueryTypes } from "sequelize";

const createCloudDatabase = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await sequelize.query("SHOW DATABASES LIKE 'cloud'", {
        type: QueryTypes.SELECT,
      });

      if (result.length === 0) {
        await sequelize.query("CREATE DATABASE cloud", {
          type: QueryTypes.RAW,
        });
        console.log('Created "cloud" database');
        resolve('Created "cloud" database');
      } else {
        console.log('"cloud" database already exists');
        resolve('"cloud" database already exists');
      }
    } catch (error) {
      console.error('Error creating "cloud" database:', error);
      reject(error);
    } finally {
      await sequelize.close();
    }
  });
};

export default createCloudDatabase;
