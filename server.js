import app from "./app/app.js";
import fs from "fs";
import csvParser from "csv-parser";

import parseCSV from "./app/utils/parseCsv.js"
import createCloudDatabase from "./app/utils/dbCreator.js";
const userFile = "./opt/users.csv"
import dotenv from 'dotenv';
dotenv.config();


const port = 8080;

async function initialize() {
    try {
      await createCloudDatabase();
      await parseCSV(process.env.FILE_PATH);
      console.log('CSV parsing and data insertion completed successfully.');
    } catch (error) {
      console.error('Error during CSV parsing and data insertion:', error);
      process.exit(1);
    }
  }


initialize()
  .then(() => {

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Initialization error:', error);
  });

