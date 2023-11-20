import logger from "../../logger/logger.js";
import Submission from "../model/Submission.js";

export const createSubmission = async(submission)=>{

    try{
    const sub = Submission.create(submission);
    }
    catch(e){
        console.log(e);
        logger.error(e);
    }
};