import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import orderItemSchema from "../models/orderItem.js"
import { createOrderItem, getOrderItem, getOrderItemById, removeOrderItemById, updateOrderItemById } from "../controllers/orderItem.js";

const orderItemRouter = Router();

orderItemRouter.get("/", getOrderItem);
orderItemRouter.get("/:id", getOrderItemById);

orderItemRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
orderItemRouter.delete("/delete/:id", removeOrderItemById );

orderItemRouter.use(validBodyRequest(orderItemSchema)); // middleware
orderItemRouter.post("/", createOrderItem);
orderItemRouter.put("/update/:id", updateOrderItemById);

export default orderItemRouter;
