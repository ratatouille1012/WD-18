import { Router } from "express";
import {
  AddVariant,
  createProduct,
  DeleteVariant,
  getProductById,
  getProducts,
  removeProductById,
  updateProductById,
} from "../controllers/product.js";
import productSchema from "../validations/product.js";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import upload from "../middlewares/multerConfig.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

productRouter.use(checkAuth, checkIsAdmin);
productRouter.delete("/delete/:id", removeProductById);

productRouter.use(validBodyRequest(productSchema)); // middleware
productRouter.post("/",upload.array('images', 4), createProduct);
productRouter.put("/update/:id",upload.array('images', 4), updateProductById);
productRouter.delete("/delete/:id/variant", DeleteVariant);
productRouter.post("/create/:id/variant", AddVariant);
  
export default productRouter;
