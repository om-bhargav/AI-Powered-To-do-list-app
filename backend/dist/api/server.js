import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as ItemsRoutes } from "../routes/items-routes.js";
import { router as AuthRoutes } from "../routes/auth-routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoutes);
app.use("/items", ItemsRoutes);
app.get("/", (req, res) => {
    return res.status(200).json({ "message": "Hello World" });
});
app.listen(8080, () => {

});
