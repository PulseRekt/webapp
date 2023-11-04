import basicAuth from "basic-auth-connect";
import { badRequest, notFound } from "../controller/healthCheckController.js";
import assignmentRouter from "./assingmentRoute.js";
import router from "./healthCheckRoute.js";
import handleBasicAuthentication from "../security/authentication.js";
import { getStatsdMiddleware } from "../statsD/statsdClient.js";
// import 'basic-auth-connect'

const route = (app)=>{

    app.use((req, res, next) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        next();
    });

    const statsdMiddleware = getStatsdMiddleware();

    
    app.use('/healthz',router);



    app.use('/v1/assignments', async (req, res, next) => {
        const headerString = req.headers.authorization;
    
        const authResult = await handleBasicAuthentication(headerString);
    
        if (authResult.authenticated) {
          next();
        } else {
          res.set('WWW-Authenticate', 'Basic realm="Secure Area"');
          res.status(401).send('Unauthorized: Authentication failed');
        }
      }, assignmentRouter);

    app.all('*',badRequest);
}

export default route;