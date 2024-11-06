import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";
import colorRouter from "./color.js";
import sizeRouter from "./size.js";
import variantRouter from "./variant.js";
import brandRouter from "./brand.js";
import voucherRouter from "./voucher.js";
import orderRouter from "./order.js";
import orderItemRouter from "./orderItem.js";
import imageRouter from "./image.js";
import Cartrouter from "./cart.js";
import receiverRouter from "./receiver.js";
import ContactRouter from "./contact.js";
import paymentrouter from "./payment.js";
import { getShippingCost } from "../controllers/ship.js";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);
router.use("/color", colorRouter);
router.use("/size", sizeRouter);
router.use("/variant", variantRouter);
router.use("/brand", brandRouter);
router.use("/voucher", voucherRouter);
router.use("/order", orderRouter);
router.use("/orderItem", orderItemRouter);
router.post('/shipping', getShippingCost )
router.use("/image", imageRouter);
router.use("/cart", Cartrouter)
router.use("/receiver", receiverRouter);
router.use("/contact", ContactRouter);
router.use("/payment", paymentrouter);
router.get("/data", (req, res) => {
    res.json({ message: "Hello from the API!" 
      });
  });
export default router;
