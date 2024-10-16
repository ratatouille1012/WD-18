import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import brandSchema from "../models/brand.js"
import { createBrand, getBrand, getBrandById, removeBrandById, updateBrandById } from "../controllers/brand.js";

const brandRouter = Router();

brandRouter.get("/", getBrand);
brandRouter.get("/:id", getBrandById);

brandRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
brandRouter.delete("/delete/:id", removeBrandById );

brandRouter.use(validBodyRequest(brandSchema)); // middleware
brandRouter.post("/", createBrand);
brandRouter.put("/update/:id", updateBrandById);

export default brandRouter;
