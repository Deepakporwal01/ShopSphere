import {productModel} from "../../models/productModel.js"
export  async function getProductForEachCategoryController(req,res){
try{

const {category}  = req?.body || req?.query;
 
 const product = await productModel.find({category})
 
res.json({
    data:product,
    success:true,
    error:false,
    message:"category data fetched successfully"
})
}catch(err){
    res.status(400).json({
        error:true,
        success:false,
        message:err.message || err
}
    )
}
 }