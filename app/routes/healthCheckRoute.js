import { getHealth,notAllowed,notFound } from "../controller/healthCheckController.js";
import express from "express";

const router = express.Router();

router.route('/')
    .get(getHealth)
    .head(notAllowed)
    .options(notAllowed)
    .all(notAllowed)

    router.all('*',notFound);

export default router;
