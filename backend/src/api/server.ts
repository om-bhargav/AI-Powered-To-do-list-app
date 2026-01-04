import express from "express";
import dotenv  from "dotenv";
import cors from "cors";
import type { Request,Response } from "express";
import {router as ItemsRoutes} from "../routes/items-routes.js";
import {router as AuthRoutes} from "../routes/auth-routes.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth",AuthRoutes);
app.use("/items",ItemsRoutes);
app.get("/",(req:Request,res:Response)=>{

    return res.status(200).json({"message":"Hello World"})}
);

app.listen(8080,()=>{
    console.log(`Server Running on http://${process.env.HOST}:${PORT}`);
});


