import { userModel } from "../../models/userModel.js";

export async function userDetailController(req,res){
try{

  const user =  await userModel.findById(req.userId);
  res.status(200).json({
        message:"User-Details",
    success:true,
    error:false,
    data:user,

  })
}catch(err){
res.status(400).json({
    error:true,
    success:false,
    message:err.message || err
})
}

}