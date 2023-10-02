import { Sequelize,DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../../config/dbConnection.js";

const User = sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
    },
    first_name:{
        type:DataTypes.STRING
    },
    last_name:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    }
})

export default User;