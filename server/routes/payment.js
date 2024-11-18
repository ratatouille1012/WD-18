

import { Router } from 'express';
import momorouter from './momo.js';
import ZaloPayrouter from './zalo.js';
import vnpayrouter from './vnpay.js';

const paymentrouter = Router();
paymentrouter.use('/zalo', ZaloPayrouter);
paymentrouter.use('/momo', momorouter);
paymentrouter.use('/vnpay', vnpayrouter)

export default paymentrouter;
