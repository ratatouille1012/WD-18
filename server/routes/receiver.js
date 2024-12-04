import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import receiverSchema from "../models/receiver.js"
import { createReceiver, getReceiver, getReceiverById, removeReceiverById, updateReceiverById } from "../controllers/receiver.js";

const receiverRouter = Router();

receiverRouter.get("/", getReceiver);
receiverRouter.get("/:id", getReceiverById);

receiverRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
receiverRouter.delete("/delete/:id", removeReceiverById );

receiverRouter.use(validBodyRequest(receiverSchema)); // middleware
receiverRouter.post("/", createReceiver);
receiverRouter.put("/update/:id", updateReceiverById);

export default receiverRouter;
