import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import voucherSchema from "../models/voucher.js"
import { createVoucher, getVoucher, getVoucherById, removeVoucherById, updateVoucherById } from "../controllers/voucher.js";

const voucherRouter = Router();

voucherRouter.get("/", getVoucher);
voucherRouter.get("/:id", getVoucherById);

voucherRouter.use(checkAuth, checkIsAdmin);
// colorRouter.put("/hide/:id", softRemoveCategoryById);
voucherRouter.delete("/delete/:id", removeVoucherById );

voucherRouter.use(validBodyRequest(voucherSchema)); // middleware
voucherRouter.post("/", createVoucher);
voucherRouter.put("/update/:id", updateVoucherById);

export default voucherRouter;
