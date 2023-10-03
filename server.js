import app from "./app/app.js";
import fs from "fs";
import csvParser from "csv-parser";

import parseCSV from "./app/utils/parseCsv.js"
const userFile = "./opt/users.csv"


const port = 8080;

async function initialize() {
    try {
      await parseCSV(userFile);
      console.log('CSV parsing and data insertion completed successfully.');
    } catch (error) {
      console.error('Error during CSV parsing and data insertion:', error);
    }
  }


initialize()
  .then(() => {
    // Start the Express server
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Initialization error:', error);
  });

// app.listen(port, () => console.log(`Server at ${port}`));