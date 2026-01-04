import express from "express";
import type { Router,Request,Response } from "express";
import {signup,login} from "../controllers/auth-controllers.js";
const router:Router = express.Router();

router.post("/signup",signup);

router.post("/login",login);




export {router};