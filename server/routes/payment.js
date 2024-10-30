

import { Router } from 'express';
import vnpayrouter from './vnpay.js';
import momorouter from './momo.js';

const paymentrouter = Router();
paymentrouter.use('/vnpay', vnpayrouter);
paymentrouter.use('/momo', momorouter);

export default paymentrouter;
