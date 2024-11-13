

import { Router } from 'express';
import {  checkOrderStatus, createPaymentUrl,  paymentReturn } from '../controllers/vnpay.js';

const vnpayrouter = Router();
// Route tạo thanh toán
vnpayrouter.post('/create_payment_url', createPaymentUrl);

// Route nhận kết quả trả về từ VNPay
vnpayrouter.get('/return', paymentReturn );

vnpayrouter.get('/order_status/:orderId', checkOrderStatus)

export default vnpayrouter;
