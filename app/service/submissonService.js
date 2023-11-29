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

export const countAssignmentById = async (id,userId) => {
    try {
        const count = await Submission.count({
            where: { assignment_id: id,user_id:userId },
        });
        return count;
    } catch (error) {
        console.error('Error counting assignments by ID:', error);
        throw error; 
    }
};

export const assignmentExists = async (id) => {
    try {
        const assignment = await Submission.findOne({
            where: { assignment_id: id },
        });
        return !!assignment; 
    } catch (error) {
        console.error('Error checking if assignment exists:', error);
        throw error;
    }
};

