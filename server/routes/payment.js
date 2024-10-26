// routes/paymentRoutes.js
import { Router } from 'express';
<<<<<<< HEAD
import { createPayment, handleVnpayReturn } from '../controllers/payment.js';
const paymentrouter = Router();

paymentrouter.post('/create_payment_url', createPayment);
paymentrouter.get('/vnpay_return',handleVnpayReturn );
=======
import { createMomoPayment} from '../controllers/momo.js';
import ZaloPayrouter from './zalo.js';
const paymentrouter = Router();

paymentrouter.post('/momo', createMomoPayment);
paymentrouter.use('/zalo', ZaloPayrouter);
>>>>>>> origin/Tanh

export default paymentrouter;
