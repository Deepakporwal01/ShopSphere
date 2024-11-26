import { productModel } from "../../models/productModel.js"

 export const getProductController = async (req,res)=>{
    try{

const allProduct = await productModel.find().sort({createdAt:-1})
res.json({
    message:"All Products Data :",
    success:true,
    error:false,
    data:allProduct
})



    }catch(err){
        res.status(400).json({
            error:true,
            success:false,
            message:err.message || err
        })
    }
}