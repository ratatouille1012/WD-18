import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import cartSchema from "../models/cart.js"
import { createCart, getCart, getCartById, removeCartById, updateCartById } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", getCart);
cartRouter.get("/:id", getCartById);

cartRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
cartRouter.delete("/delete/:id", removeCartById );

cartRouter.use(validBodyRequest(cartSchema)); // middleware
cartRouter.post("/", createCart);
cartRouter.put("/update/:id", updateCartById);

export default cartRouter;
