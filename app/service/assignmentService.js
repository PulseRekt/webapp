import Assignment from "../model/Assignment.js";

export const createAssignment = async (assignment) => {
    try {
        // console.log(assignment);
        const createdAssignment = await Assignment.create(assignment);
        return createdAssignment;
    } catch (error) {
        return error;
        }
  };
  
export const getAllAssignments = async()=>{
    
    const assignments = await Assignment.findAll();
    return assignments;
}

export const getAssignmentById = async(id)=>{
    const assignment = await Assignment.findOne({
        where:{
            id:id
        }
    });

    return assignment;
}

export const deleteAssignmentById = async (id)=>{
    await Assignment.destroy({
        where:{
            id:id
        }
    })
    return;
}

export const updateAssingmentById = async(updatedData,id)=>{
    await Assignment.update(updatedData,{
        where:{
            id:id
        }
    });
}

export const countAssignmentById = async (id) => {
    try {
        const count = await Assignment.count({
            where: { id: id },
        });
        return count;
    } catch (error) {
        console.error('Error counting assignments by ID:', error);
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
};