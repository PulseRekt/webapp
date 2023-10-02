import app from "./app/app.js";
import fs from "fs";
import csvParser from "csv-parser";


const port = 8080;



app.listen(port, () => console.log(`Server at ${port}`));
