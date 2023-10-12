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
        type:DataTypes.FLOAT,
        validate:{
            min:1,
            max:10
        }
    },
    "num_of_attempts":{
        type:DataTypes.FLOAT,
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
    },
    "account_created": {
        type: DataTypes.DATE
      },
      "account_updated": {
        type: DataTypes.DATE
      }
},

{
    timestamps:false
});
Assignment.beforeCreate((assignment) => {
    assignment.account_created = new Date();
    assignment.account_updated = new Date();
  });
  
  Assignment.beforeUpdate((assignment) => {
    assignment.account_updated = new Date();
  });

export default Assignment;