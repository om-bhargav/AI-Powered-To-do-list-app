import type { Request, Response, Router } from "express";
import express from "express";
import { addItem,removeItem,updateItem,fetchItems,tasksFromAI } from "../controllers/items-controllers.js";
const router: Router = express.Router();
router.post("/add",addItem);

router.post("/delete",removeItem);

router.post("/update",updateItem);

router.post("/all",fetchItems);

router.post("/summary-from-ai",tasksFromAI);

export {router};
