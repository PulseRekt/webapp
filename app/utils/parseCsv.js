import fs from 'fs';
import csv from 'csv-parser';
import User from '../model/User.js';
import bcrypt from 'bcrypt';
import Assignment from '../model/Assignment.js';
import Submission from '../model/Submission.js';

const parseCSV = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        insertDataIntoDatabase(results)
          .then(() => {
            resolve(); // Resolve the outer promise when insertDataIntoDatabase is done
          })
          .catch((error) => {
            console.error('Error inserting data into database:', error);
            reject(error);
          });
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error);
        reject(error);
      });
  });
};



const insertDataIntoDatabase = async (data) => {
  try {

    User.sync({force:true, alter:true})
    Assignment.sync({force:false,alter:true})
    Submission.sync({force:false, alter:true})
    await Promise.all(data.map(async (record) => {
      if (record.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(record.password, saltRounds);
        record.password = hashedPassword;
      }
      await User.create(record);
    }));
    console.log('Data inserted into MySQL using Sequelize successfully');
  } catch (error) {
    console.error('Error inserting data into MySQL using Sequelize:', error);
  }
};

export default parseCSV;
