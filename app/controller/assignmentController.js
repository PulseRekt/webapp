import assignmentRouter from '../routes/assingmentRoute.js';
import handleBasicAuthentication from '../security/authentication.js';
import * as as from '../service/assignmentService.js'
export const createAssignment = async(req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const credentials = await handleBasicAuthentication(token);
        if(credentials.authenticated){
            const body = req.body;
            body.userId=credentials.userId;
            const assingment = await as.createAssignment(body);
            if(assingment){
                // console.log("inside assignment");
                return res.status(201).json(assingment);
            }
            
        }
        else{
            res.status(401).send();
        }
    }
    else{
        res.status(401);
    }
    
}

export const getAssignments = async(req,res,next)=>{
    const token = req.headers.authorization;

    if(token){
        const credentials = await handleBasicAuthentication(token);
        if(credentials.authenticated){
                const assignments = await as.getAllAssignments(); 

                res.status(200).json(assignments);           
        }
        else{
            res.status(401);
        }
    }
    else{
        res.status(401);
    }
}

export const putAssignment = async(req,res,next)=>{
    const token = req.headers.authorization;
    const id = req.params.id

    if(token){
        const credentials = await handleBasicAuthentication(token);
        if(credentials.authenticated){
            const body = req.body;
            body.userId=credentials.userId;
            const assignment = await as.getAssignmentById(id);
            if (assignment.userId === credentials.userId){
                await as.updateAssingmentById(body,id);

            }
            else{
                res.status(403).send();
            }
            res.status(200).send();
        }
        else{
            res.status(401).send();
        }
    }
    else{
        res.status(401).send();
    }
}

export const deleteAssignmentById = async(req,res,next)=>{
    const token = req.headers.authorization;
    const id = req.params.id;
    console.log(id);

    if(token){
        const credentials = await handleBasicAuthentication(token);
        console.log(credentials);
        if(credentials.authenticated){
            const assignment = await as.getAssignmentById(id);
            if (assignment.userId === credentials.userId){
            await as.deleteAssignmentById(id);
            }
            else{
                res.status(403).send();
            }
            return res.status(200).send();
        }
        else{
            res.status(401).send();
        }
    }
    else{
        res.status(401).send();
    }
}

export const getAssingmentById = async(req,res,next) =>{
    const token = req.headers.authorization;
    const id = req.params.id;

    if(token){
        const credentials = await handleBasicAuthentication(token);
        if(credentials.authenticated){
            const assignment = await as.getAssignmentById(id);
            res.status(200).json(assignment);
        }
        else{
            res.status(401).send();
        }
    }
    else{
        res.status(401).send();
    }
}
