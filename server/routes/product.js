import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  softRemoveProductById,
  updateProductById,
  uploadImages,
  getProductVariant,
  searchProductsByName,
} from "../controllers/product.js";
import productSchema from "../validations/product.js";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.get('/variant/:variantId', getProductVariant);
productRouter.get('/products/search', searchProductsByName);


productRouter.use(checkAuth, checkIsAdmin);
productRouter.put("/hide/:id", softRemoveProductById);
productRouter.delete("/delete/:id", removeProductById);


productRouter.use(validBodyRequest(productSchema)); // middleware
productRouter.post("/", uploadImages ,createProduct);
productRouter.put("/update/:id", updateProductById);

export default productRouter;
