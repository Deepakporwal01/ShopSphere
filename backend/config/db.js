import mongoose from "mongoose";
import dotenv from "dotenv/config"
export async function connectdb() {
    try{
 await mongoose.connect(process.env.MONGODB_URI);
console.log("connected to db successfully  ");

    }catch(err){ 
        console.log("error" ,err);
       
    }
}
 