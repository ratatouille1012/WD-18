import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  softRemoveProductById,
  updateProductById,
  getProductVariant,
  searchProductsByName,
  updateVariantById,
  
} from "../controllers/product.js";
import productSchema from "../validations/product.js";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";
import multer from "multer";

const productRouter = Router();
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

const upload = multer({ storage });

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.get('/variant/:variantId', getProductVariant);
productRouter.get('/', searchProductsByName);


productRouter.use(checkAuth, checkIsAdmin);
productRouter.put("/hide/:id", softRemoveProductById);
productRouter.delete("/delete/:id", removeProductById);


productRouter.use(validBodyRequest(productSchema)); // middleware
productRouter.post("/", upload.array('images', 4) ,createProduct);
productRouter.put("/update/:id", updateProductById);
productRouter.put('/variant/:variantId', updateVariantById)

export default productRouter;
