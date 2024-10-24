import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import orderSchema from "../models/order.js"
import { createOrder, getOrder, getOrderById, removeOrderById, updateOrderById } from "../controllers/oder.js";

const orderRouter = Router();

orderRouter.get("/", getOrder);
orderRouter.get("/:id", getOrderById);

orderRouter.use(checkAuth, checkIsAdmin);   
// colorRouter.put("/hide/:id", softRemoveCategoryById);
orderRouter.delete("/delete/:id", removeOrderById );

orderRouter.use(validBodyRequest(orderSchema)); // middleware
orderRouter.post("/", createOrder);  
orderRouter.put("/update/:id", updateOrderById);

export default orderRouter;
