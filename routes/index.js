import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";
import colorRouter from "./color.js";
import sizeRouter from "./size.js";
import brandRouter from "./brand.js";
import voucherRouter from "./voucher.js";
import orderRouter from "./order.js";
import shipRouter from "./ship.js";
import orderItemRouter from "./orderItem.js";
import cartRouter from "./cart.js";
import UserRouter from "./user.js";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);
router.use("/color", colorRouter);
router.use("/size", sizeRouter);
router.use("/brand", brandRouter);
router.use("/voucher", voucherRouter);
router.use("/order", orderRouter);
router.use("/ship", shipRouter);
router.use("/orderItem", orderItemRouter);
router.use('/cart', cartRouter);
router.use('/user', UserRouter);

export default router;
