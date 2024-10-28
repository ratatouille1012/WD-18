// routes/paymentRoutes.js
import { Router } from 'express';
import { createPayment, paymentReturn } from '../controllers/vnpay.js';
const Vnpayrouter = Router();

Vnpayrouter.post('/create', createPayment);
Vnpayrouter.get('/return', paymentReturn);

export default Vnpayrouter;