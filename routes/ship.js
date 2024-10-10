import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import shipSchema from "../models/ship.js"
import { createShip, getShip, getShipById, removeShipById, updateShipById } from "../controllers/ship.js";

const shipRouter = Router();

shipRouter.get("/", getShip);
shipRouter.get("/:id", getShipById);

shipRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
shipRouter.delete("/delete/:id", removeShipById );

shipRouter.use(validBodyRequest(shipSchema)); // middleware
shipRouter.post("/", createShip);
shipRouter.put("/update/:id", updateShipById);

export default shipRouter;
