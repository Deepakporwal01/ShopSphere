
import bcrypt from "bcrypt"
import { userModel } from "../../models/userModel.js";
import  jwt from "jsonwebtoken"

export async function userSigninController (req,res){
try{
const{email,password} = req.body;
if(!email){
    throw new error ("please enter email ");
}
if(!password){
    throw new error ("please enter  password ");
}
const user = await userModel.findOne({email});

if(!user){
    throw new error ("user not found ");
}
const checkpassword =  bcrypt.compareSync(password,user.password);
if(checkpassword){
const tokenData = {
_id : user._id,
email : user.email,
};

const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY,{expiresIn:60*60*8*8});

const TokenOption ={
    httpOnly : true,
   
};

res.cookie("token",token,TokenOption).json({
    success:true,
    message:"Login Successful",
    data: token,
    error:false
})
 

}
else{
    throw new Error("password does not match");
}
 
}

catch(err){
    res.json({
        message : "user does not exists" ,
        error : true, 
        success : false,
    })
}
}