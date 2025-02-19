import { addToCartModel } from "../../models/cartProduct.js";

 export const countaddtoCartController = async(req,res)=>{
    try{
        const userId = req?.userId;
const count = await addToCartModel.countDocuments({
    userId:userId,
})  
res.json({
    data:{
        count :count
    },
    success:true,
    error:false,
    message:"count fetched"
})
    }
    catch(err){
        res.status(400).json({
            error:true, 
            success:false,
            message:err.message || err,
          
        })
    }


}