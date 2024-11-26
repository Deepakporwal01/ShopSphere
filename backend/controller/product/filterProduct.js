import {productModel} from "../../models/productModel.js";
export const filterProductController = async(req,res)=>{
    try{
const categoryList = req?.body?.category || [];
const products = await productModel.find({
 category:{
$in :categoryList
 }
})
res.json({
    data :products,
    message:"Category List fetched",
    success:true,
    error:false,
})
    }catch{
       res.json({
        message:"Data not Available",
        success:false,
        error:true

       }) 
    }
}