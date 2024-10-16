import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { createColor, getColor, getColorById, removeColorById, updateColorById } from "../controllers/color.js";
import colorSchema from "../models/color.js"

const colorRouter = Router();

colorRouter.get("/", getColor);
colorRouter.get("/:id", getColorById);

colorRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
colorRouter.delete("/delete/:id", removeColorById );

colorRouter.use(validBodyRequest(colorSchema)); // middleware
colorRouter.post("/", createColor);
colorRouter.put("/update/:id", updateColorById);

export default colorRouter;
