 
import { productModel } from "../../models/productModel.js"

export async function getCategoryProductController(req,res){

    try{
const productCategory = await productModel.distinct("category")
const productByCategory = []
for(const category of productCategory){
    const product = await productModel.findOne({category}) 
    productByCategory.push(product);
}
 

    res.status(200).json({
        success:true,
        message:"product fetched successfully",
        error:false,
        data:productByCategory
    }
)
}
    catch(err){
 
        res.status(400).json({
            error:true, 
            success:false,
            message:err.message || err,
          
        })
    }
}