import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import sizeSchema from "../models/size.js"
import { createSize, getSize, getSizeById, removeSizeById, updateSizeById } from "../controllers/size.js";

const sizeRouter = Router();

sizeRouter.get("/", getSize);
sizeRouter.get("/:id", getSizeById);

sizeRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
sizeRouter.delete("/delete/:id", removeSizeById );

sizeRouter.use(validBodyRequest(sizeSchema)); // middleware
sizeRouter.post("/", createSize);
sizeRouter.put("/update/:id", updateSizeById);

export default sizeRouter;
