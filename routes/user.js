import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import UserSchema from "../models/User.js"
import {  getUser, getUserById, removeUserById, updateUserById } from "../controllers/user.js";

const UserRouter = Router();



UserRouter.use(checkAuth, checkIsAdmin);
// UserRouter.use(validBodyRequest(UserSchema));
// colorRouter.put("/hide/:id", softRemoveCategoryById);
UserRouter.delete("/delete/:id", removeUserById );
UserRouter.get("/", getUser);
UserRouter.get("/:id", getUserById);
UserRouter.put("/update/:id", updateUserById);

 // middleware

export default UserRouter;
