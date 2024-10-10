import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";
import colorRouter from "./color.js";
import sizeRouter from "./size.js";
import variantRouter from "./variant.js";
import brandRouter from "./brand.js";
import voucherRouter from "./voucher.js";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);
router.use("/color", colorRouter);
router.use("/size", sizeRouter);
router.use("/variant", variantRouter);
router.use("/brand", brandRouter)
router.use("/voucher", voucherRouter)

export default router;
