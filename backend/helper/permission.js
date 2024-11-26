import { userModel } from "../models/userModel.js"

 export const uploadProductPermission = async (userId) =>{

const user = await userModel.findById(userId);
if(user.role !== "ADMIN"){
    return false;
}
return true;
}