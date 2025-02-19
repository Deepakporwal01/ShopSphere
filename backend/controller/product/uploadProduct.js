import { uploadProductPermission } from "../../helper/permission.js";
import {productModel} from "../../models/productModel.js" 
 export async function UploadProductController(req,res){

try{
    const sessionUserId = req.userId;
    
if(!uploadProductPermission(sessionUserId)){
    throw new Error("permission denied ")
}

    const uploadProduct  =  new productModel(req.body);
const saveProduct = await uploadProduct.save();

res.status(201).json({
   message:"Product uploaded Successfully",
   error:false,
   success:true,
   data:saveProduct,
    
})

}catch(err){
    res.status(400).json({
        error:true,
        success:false,
        message:err.message || err
    })
}

}