import { userModel } from "../../models/userModel.js"

 export async function allUsersController(req,res){
try{
const allUsers = await userModel.find();
 res.json({
    message:"All users data",
    success:true,
    data:allUsers,
    error:false
 })


}
catch(err){
res.status(400).json({
    message:err.message || err,
    error:true,
    success:false,
})

}
}