import { Sequelize,DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../../config/dbConnection.js";

const Assignment = sequelize.define('Assignments',{
    "id":{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:UUIDV4
    },
    "name":{
        type:DataTypes.STRING,
    },
    "points":{
        type:DataTypes.INTEGER,
        validate:{
            min:1,
            max:10
        }
    },
    "num_of_attempts":{
        type:DataTypes.INTEGER,
        validate:{
            min:1,
            max:100
        }
    },
    "deadline":{
        type:DataTypes.DATE
    },
    "userId":{
        type:DataTypes.UUID
    }
},
{
    timestamps:true
});

export default Assignment;