import { userModel } from "../../models/userModel.js";

export async function updateUserController(req,res){
    try{
        const sessionUser = req._id; 
const {_id,name,email,role} = req.body;

const payload = {

    ...(email && {email:email}),
    ...(name && {name:name}),
    ...(role && {role:role}),

}
const user = await userModel.findById(sessionUser);
const updateUser = await  userModel.findByIdAndUpdate(_id,payload);
 
res.json({

    message: "User Updated Successfully",
    data:updateUser,
    success:true,
    error:false,
})


    }catch(err){
        res.status(400).json({
            error:true,
            success:false,
            message:err.message || err
        })
        }

     
}