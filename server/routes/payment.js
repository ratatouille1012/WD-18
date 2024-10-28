// routes/paymentRoutes.js
import { Router } from 'express';
import { createMomoPayment} from '../controllers/momo.js';
import ZaloPayrouter from './zalo.js';
import Vnpayrouter from './vnpay.js';
const paymentrouter = Router();

paymentrouter.post('/momo', createMomoPayment);
paymentrouter.use('/zalo', ZaloPayrouter);
paymentrouter.use('/vnpay', Vnpayrouter)

export default paymentrouter;
