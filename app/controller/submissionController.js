import logger from "../../logger/logger.js";
import Submission from "../model/Submission.js";
import { countAssignmentById, getAssignmentById } from "../service/assignmentService.js";
import handleBasicAuthentication from '../security/authentication.js'
import * as ss from '../service/submissonService.js'

export const createSubmission = async(req,res,next)=>{
    try{
        if (Object.keys(req.query).length === 0) {
            const token = req.headers.authorization;
            const id = req.params.id;
      
            if (!token) {
              logger.error('Unauthorized: Missing Authorization Token');
              return res.status(401).send('Unauthorized: Missing Authorization Token');
            }
      
            const credentials = await handleBasicAuthentication(token);

            if (!credentials.authenticated) {
              logger.error('Unauthorized: Invalid Credentials');
              return res.status(401).send('Unauthorized: Invalid Credentials');
            }
      
            const body = req.body;

            const assignment = await getAssignmentById(id);
            if (!assignment) {
                logger.error('Not Found: Assignment not found');
                return res.status(404).send('Not Found: Assignment not found');
              }


            if (assignment.userId === credentials.userId) {
                if (!req.body || Object.keys(req.body).length === 0) {
                    logger.error('Bad Request: Empty request body');
                    return res.status(400).send(); 
                  }

                const Sub = Submission.build(
                    {
                        assignment_id:id,
                        submission_url:body.submission_url
                    }
                );

                const count = await ss.countAssignmentById(id);
                console.log(count);
                if (assignment.num_of_attempts > count){


                    await ss.createSubmission(Sub);
                    return res.status(201).send("Submission Accepted");

                }
                else{
                    logger.error("Assignments Attempts Reached");
                    return res.status(403).send("Assignment Attempts Reached");
                }


            }
            else{
                logger.error('Forbidden: You do not have permission to update this assignment');
                return res.status(403).send('Forbidden: You do not have permission to submit this assignment');
            }


        }
        else{
            logger.error("request cannot have query");
            return res.status(400).send();
        }



    }
    catch(error){
        logger.error(error);
        return res.status(500).send(error);
    }

};