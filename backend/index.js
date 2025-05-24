import express from "express";
import cors from "cors";
import {connectdb} from "./config/db.js";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.js";
const app = express();
// const allowedOrigins = [
//     'http://localhost:3000',
//     
//   ];
  
  app.use(cors({
 origin:'https://shopspheree.onrender.com'  ,
    credentials: true
  }));
  
app.use(express.json());
app.use(cookieParser());
app.use("/api",router);  
const PORT = 8080 || process.env.PORT;
connectdb().then(
    ()=>{  
        app.listen(PORT,()=>{
           
            console.log(`server is running at port ${PORT}`);
        })
    }

)


