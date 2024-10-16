import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import imageSchema from "../models/image.js"
import { createImage, getImage, getImageById, removeImageById, updateImageById } from "../controllers/image.js";

const imageRouter = Router();

imageRouter.get("/", getImage);
imageRouter.get("/:id", getImageById);

imageRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
imageRouter.delete("/delete/:id", removeImageById );

imageRouter.use(validBodyRequest(imageSchema)); // middleware
imageRouter.post("/", createImage);
imageRouter.put("/update/:id", updateImageById);

export default imageRouter;
