import express from "express"
import authMiddlewear from "../Middlewear/auth.js"
import { placeOrder } from "../Controllers/orderController.js"
import authMiddleware from "../Middlewear/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;