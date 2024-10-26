// routes/paymentRoutes.js
import { Router } from 'express';
import { createPayment, handleVnpayReturn } from '../controllers/payment.js';
const paymentrouter = Router();

paymentrouter.post('/create_payment_url', createPayment);
paymentrouter.get('/vnpay_return',handleVnpayReturn );

export default paymentrouter;
