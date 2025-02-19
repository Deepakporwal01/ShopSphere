import mongoose from "mongoose";

const productSchema =  mongoose.Schema({
    productName: "string",
    brandName: "string",
    category: "string",
    productImage: [],
    description: "string",
    price: "number",
    sellingPrice: "number",

},{timestamps:true})

 export const productModel = mongoose.model("product",productSchema);