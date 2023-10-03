import express from "express";
import cors from "cors";
const app = express();
import route from "./routes/index.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.text());

route(app);

export default app;