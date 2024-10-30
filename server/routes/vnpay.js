

import { Router } from 'express';
import { createPayment, handleReturnUrl } from '../controllers/vnpay.js';

const vnpayrouter = Router();
// Route tạo thanh toán
vnpayrouter.post('/create', createPayment);

// Route nhận kết quả trả về từ VNPay
vnpayrouter.get('/return', handleReturnUrl);

export default vnpayrouter;
