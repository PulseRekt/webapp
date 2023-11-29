import { DATE, STRING, UUID, UUIDV4 } from "sequelize";
import sequelize from "../../config/dbConnection.js";

const Submission = sequelize.define('Submission',{
    "id":{
        type:UUID,
        primaryKey:true,
        defaultValue:UUIDV4
    },
    "assignment_id":{
        type:UUID
    },
    "user_id":{
        type:UUID
    },
    "submission_url":{
        type:STRING
    },
    "submission_date":{
        type:DATE
    },
    "assignment_updated":{
        type:DATE
    }
},{
    timestamps:false
});

Submission.beforeCreate((submission)=>{
    submission.submission_date = new Date();
    submission.assignment_updated = new Date();
})

Submission.beforeUpdate((submission)=>{
    submission.assignment_updated = new Date();
});

export default Submission;