import express from "express";
import cors from "cors";
import dotenv from "dotenv/config"
import mongoose from "mongoose";
import {connectdb} from "./config/db.js";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.js";
const app = express();
const allowedOrigins = [
    'http://localhost:3000',
    'https://shopsphere-vert.vercel.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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


