 import { addToCartModel } from "../../models/cartProduct.js";
 export const addToCartController = async(req,res)=>{   
    try{
const productId = req?.body?.productId;
 
const currentuserId = req.userId;
 
const isProductAvailable = await addToCartModel.findOne({
    productId:productId,
userId:currentuserId
});

if(isProductAvailable  ){
    return res.json({
        message:"Product Already Exists in Cart ",
        success: false,
        error:true,
    })
}
const payload = {
    productId :productId,
    quantity:1,
    userId:currentuserId
}
const newProduct = await addToCartModel.create(payload);
const saveProduct = newProduct.save();
res.json({
    message:"Product Added to cart Successfully ",
    success:true,
    error:false,
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