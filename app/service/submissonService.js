import logger from "../../logger/logger.js";
import Submission from "../model/Submission.js";

export const createSubmission = async(submission)=>{

    try{
        // console.log(submission)
    const sub = await submission.save();
    return sub;
    }
    catch(e){
        console.log(e);
        logger.error(e);
    }
};

export const countAssignmentById = async (id) => {
    try {
        const count = await Submission.count({
            where: { assignment_id: id },
        });
        return count;
    } catch (error) {
        console.error('Error counting assignments by ID:', error);
        throw error; 
    }
};
