import { badRequest, notFound } from "../controller/healthCheckController.js";
import assignmentRouter from "./assingmentRoute.js";
import router from "./healthCheckRoute.js";

const route = (app)=>{

    app.use((req, res, next) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        next();
    });
    

    app.use('/healthz',router);

    app.use('/v1/assignments',assignmentRouter)

    app.all('*',badRequest);
}

export default route;