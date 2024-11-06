

import { Router } from 'express';
import momorouter from './momo.js';
import ZaloPayrouter from './zalo.js';

const paymentrouter = Router();
paymentrouter.use('/zalo', ZaloPayrouter);
paymentrouter.use('/momo', momorouter);

export default paymentrouter;
