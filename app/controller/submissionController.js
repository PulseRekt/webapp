import logger from "../../logger/logger.js";
import Submission from "../model/Submission.js";
import { countAssignmentById, getAssignmentById } from "../service/assignmentService.js";
import handleBasicAuthentication from '../security/authentication.js'
import * as ss from '../service/submissonService.js'
import { snsPublish } from "../utils/snsPublish.js";

const arn = process.env.SNS_ARN;


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
            console.log(req.body.submission_url);

            if (!req.body.submission_url || req.body.submission_url.trim() === '') {
                return res.status(400).send('Bad Request: submission_url is missing or empty');
              }
              if (Object.keys(req.body).length !== 1 || !req.body.hasOwnProperty('submission_url')) {
                return res.status(400).send('Bad Request: Only "submission_url" field is allowed');
              }


            const assignment = await getAssignmentById(id);
            if (!assignment) {
                logger.error('Not Found: Assignment not found');
                return res.status(404).send('Not Found: Assignment not found');
              }


                if (!req.body || Object.keys(req.body).length === 0) {
                    logger.error('Bad Request: Empty request body');
                    return res.status(400).send(); 
                  }

                const Sub = Submission.build(
                    {
                        assignment_id:id,
                        submission_url:body.submission_url,
                        user_id:credentials.userId
                    }
                );

                const count = await ss.countAssignmentById(id,credentials.userId);
                if (assignment.num_of_attempts > count){

                    if (assignment.deadline && new Date() <= new Date(assignment.deadline)) {

                        const message = {
                            submissionUrl: body.submission_url,
                            email: credentials.email,
                            assignmentId: id
                        }

                        snsPublish(message);

                        await ss.createSubmission(Sub);
                        return res.status(201).send("Submission Accepted");
                    } else {
                        logger.error("Assignment past due date or no deadline specified");
                        return res.status(403).send("Assignment past due date or no deadline specified");
                    }
                    

                }
                else{
                    logger.error("Assignments Attempts Reached");
                    return res.status(403).send("Assignment Attempts Reached");
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