

import { Router } from 'express';
import { createPayment, handleReturnUrl } from '../controllers/momo.js';

const momorouter = Router();
// Route tạo thanh toán
momorouter.post('/create', createPayment);

// Route nhận kết quả trả về từ momo
momorouter.get('/payment-result', handleReturnUrl);

export default momorouter;
