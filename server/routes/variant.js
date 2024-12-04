import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { createVariant, getVariant, getVariantById, removeVariant, updateVariant } from "../controllers/variant.js";
import variantSchema from "../models/variant.js"


const variantRouter = Router();

variantRouter.get("/", getVariant);
variantRouter.get("/:id", getVariantById);

variantRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
variantRouter.delete("/delete/:id", removeVariant );

variantRouter.use(validBodyRequest(variantSchema)); // middleware
variantRouter.post("/", createVariant);
variantRouter.put("/update/:id", updateVariant);

export default variantRouter;
