import express from "express";
import cors from "cors";
const app = express();
import route from "./routes/index.js";
import parseCSV from "./utils/parseCsv.js";

const userFile = "./opt/users.csv"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.text());

parseCSV(userFile);

route(app);


export default app;