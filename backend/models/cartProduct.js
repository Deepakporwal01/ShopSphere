import mongoose from "mongoose";
const  addToCartSchema =  mongoose.Schema({
    productId: {
    ref:'product',
    type : String,
    },
    quantity:"number",
    userId :"string"
},{timestamps:true})

 export const  addToCartModel = mongoose.model("addtocart",addToCartSchema);
 