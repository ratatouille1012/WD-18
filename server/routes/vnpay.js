

import { Router } from 'express';
import {  createPayment,  handleReturn } from '../controllers/vnpay.js';

const vnpayrouter = Router();
// Route tạo thanh toán
vnpayrouter.post('/create_payment_url', createPayment);

// Route nhận kết quả trả về từ VNPay
vnpayrouter.get('/return', handleReturn );


export default vnpayrouter;
