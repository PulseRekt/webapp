import User from "../model/User.js"

export const findUserByNameAndPass = async(email)=>{
    const user = await User.findOne({
        where:{
            email        }
    })
    // console.log(user);
    return user;
}