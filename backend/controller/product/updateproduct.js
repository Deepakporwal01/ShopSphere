import { productModel } from "../../models/productModel.js";
import {uploadProductPermission} from "../../helper/permission.js"
export async function updateProductController(req,res){

    try{
 const sessionUserId = req.userId;
if(!uploadProductPermission(sessionUserId)){
    throw new Error("permission denied ")
}
console.log("req body ",req.body)
const {_id, ...resBody} = req.body
console.log("id is ",_id)
const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
 
res.json({ 
    message:"product updated Successfully ",
    data:updateProduct,
    success:true,
    error:false,
})

    }
    catch(err){
        res.status(400).json({
            error:true,
            success:false,
            message:err.message || err
        })
        }
    }

