import { productModel } from "../../models/productModel.js";

 export const getProductDetailsController  = async (req,res)=>{

    try{
const {productId} = req.body;
const product = await productModel.findById(productId);
res.status(200).json({
message :"Product fetched successfully ",
success:true,
error:false,
data:product

})
    }
    catch(err){
        res.status(400).json({
            error:true,
            success:false,
            message:err.message || err
    }
        )
    }
}