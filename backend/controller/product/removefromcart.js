import { addToCartModel } from "../../models/cartProduct.js";

export async function removeCartController(req,res){

    try{
const userId = req?._id;
const productId = req?.body?._id;

 const deleteCartItem = await addToCartModel.deleteOne({
    _id : productId
     
 }
 )
res.json({
    message:"Item removed from cart Successfully",
    success:true,
    error:false
})
    }catch(err){
        res.json({
            message:"Error occured",err,
            success:false,
            error:true,
        })
    }
}