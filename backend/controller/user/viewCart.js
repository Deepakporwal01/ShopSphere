import { addToCartModel } from "../../models/cartProduct.js";

 export const viewCartController = async(req,res)=>{
    try{
const userId = req?.userId;
const alluserProduct = await addToCartModel.find({
    userId
  
}).populate('productId')
 


 return res.json({
    data:alluserProduct,
    success:true,
    error:false,
    message:"cart data fetched "
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