import { userModel } from "../../models/userModel.js";
import bcrypt from "bcrypt";
 export async function userSignUpController(req,res){
    try{
const {email,password, firstname,lastname} = req.body ;
 const user = await userModel.findOne({email});
 if(user){
    throw new Error("User already exist");
 }
if(!email){
    throw new error ("please enter email ");
}
if(!password){
    throw new error ("please enter  password ");
}
if(!firstname){
    throw new error ("please enter first name ");
}
if(!lastname){
    throw new error ("please enter last name ");
}
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync( password, salt);
if(!hashPassword){
    throw new error("something went wrong password  not hashed");
}
 
const payload = {
    ...req.body,
    role:"Customer",
    password:hashPassword,
}
console.log(payload);
const userData = new userModel(payload);
 
const saveUser = userData.save();

res.status(201).json({
    success:true,
    error:false,
    message:"User created succesfully",
})
    }catch(err){
res.json({
    messase : "Something went wrong" ,
    error : true,
    success : false,
})
    }
}