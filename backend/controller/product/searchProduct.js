import {productModel} from  "../../models/productModel.js"
export const searchProduct = async(req,res)=>{
    try{
const query = req.query.q;
 
const regex = new RegExp(query,"i","g");

const product = await productModel.find({
    $or:[
        {
            productName :regex
        },
        {
            category:regex
        }
    ]
})
res.json({
    data : product,
    message:"product Searched",
    error:false,
    success:true,
})
    }catch(err){
res.json({

    message:err
})

    }
}