
 export async function userLogoutController(req,res){
try{
res.clearCookie("token");


res.json({
    message:"Logout Successfully",
    success:true,
    error:false,
    data:[],
})

}catch(err){
     throw new Error(err);
}
}